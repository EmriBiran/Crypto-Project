import mysql.connector
from mysql.connector import OperationalError, InterfaceError
import time
import json
import subprocess


class DBClient(object):

    def __init__(self):  # constructor
        """
        the constructor will establish a connection to the DB and will keep trying if it fails
        """
        self.conn = self.connect()
        self.cursor = self.conn.cursor()
        print "success connecting"

    def __del__(self):  # destructor
        """
        :return: None
        upon destroying the DBClient it will commit all the changes to the DB and close the connection
        """
        self.conn.commit()  # saves all the changes(just in case..)
        self.conn.close()

    def connect(self):
        while True:
            try:
                conn = mysql.connector.connect(user='root', password='Sql123456', host='127.0.0.1', port=3306, database='coinsschema')
                return conn

            except InterfaceError as error:
                if error.errno == 2003:
                    # persistent if cant connect will try again in 20 seconds till success
                    print "trying to restart Mysql service"
                    args = ['sc', 'start', 'MySQL80']
                    result = subprocess.Popen(args)
                    time.sleep(20)

            except Exception as error:
                print error

    def update_balance(self, coin, address, amount):
        """
        :param coin: string - the fork that we currently scanning(e.g: core, cash..)
        :param address: string - the address that we will update the balance of
        :param amount: string- amount to be updated
        :return:None
        the function sends sql query that updates the amount of coins that the current address has
        """
        sql = "INSERT INTO balances(address, " + coin + "_balance) VALUES (%s, %s) ON DUPLICATE KEY UPDATE " \
              + coin + "_balance = " + coin + "_balance + %s"
        values = (address, amount, amount)
        try:
            self.cursor.execute(sql, values)  # if the address is not in the DB

        except OperationalError as error:
            if error.errno == 2055:  # lost connection to the DB
                self.restart_connection()
                self.update_balance(coin, address, amount)

        except Exception as error:
            print error

    def pop_utxs(self):
        sql = "SELECT outputs FROM utxs LIMIT 1000"
        try:
            self.cursor.execute(sql)
            results = self.cursor.fetchall()
            sql = "DELETE FROM utxs LIMIT 1000"
            self.cursor.execute(sql)
            return results

        except OperationalError as error:
            if error.errno == 2055:  # lost connection to the DB
                self.restart_connection()
                self.pop_utxs()

        except Exception as error:
            print error

    def insert_transaction(self, tx_hash, outputs):
        sql = "INSERT INTO utxs (hash, outputs) VALUES (%s, %s)"
        values = (tx_hash, json.dumps(outputs))
        try:
            self.cursor.execute(sql, values)

        except OperationalError as error:
            if error.errno == 2055:  # lost connection to the DB
                self.restart_connection()
                self.insert_transaction(tx_hash, outputs)  # send again

        except Exception as error:
            print error

    def spend_tx(self, prev_hash, prev_out):
        if int(prev_hash, 16) == 0:  # check if this is not a new generated coin
            return
        sql = "SELECT outputs FROM utxs WHERE hash = %s"
        value = (prev_hash,)
        try:
            self.cursor.execute(sql, value)
            result = self.cursor.fetchall()[0][0]
            outputs = json.loads(result)
            del outputs[prev_out]
            if outputs == {}:
                sql = "DELETE FROM utxs WHERE hash = %s"
                values = (prev_hash,)
            else:
                sql = "UPDATE utxs SET outputs = %s WHERE hash = %s"
                values = (json.dumps(outputs), prev_hash)
            for result in self.cursor.execute(sql, values, multi=True):
                pass

        except OperationalError as error:
            if error.errno == 2055:  # lost connection to the DB
                self.restart_connection()
                self.spend_tx(prev_hash, prev_out)

        except Exception as error:
            print error

    def save_all_changes(self):
        self.conn.commit()

    def restart_connection(self):
        self.conn = self.connect()
        self.cursor = self.conn.cursor()



