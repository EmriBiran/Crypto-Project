import mysql.connector
import time
from BlockChainParser import BlockChainParser
from mysql.connector import InternalError
import time

class DBClient(object):

    def __init__(self):  # constructor
        """
        the constructor will establish a connection to the DB and will keep trying if it fails
        """
        while 1:
            try:  # persistent if cant connect will try again in 20 seconds till success
                self.conn = mysql.connector.connect(user='root', password='Sql123456', host='127.0.0.1', port=3306, database='coinsschema')
                break
            except Exception as error:
                print "error while connecting to mysql  staling attempts"
                time.sleep(20)
        self.cursor = self.conn.cursor()
        print "success connecting"

    def __del__(self):  # destructor
        """
        :return: None
        upon destroying the DBclient it will commit all the changes to the DB and close the connection
        """
        self.conn.commit()  # saves all the changes
        self.conn.close()

    def update_balance(self, coin, address, amount):
        """
        :param coin: string - the fork that we currently scanning(e.g: core, cash..)
        :param address: string - the address that we will update the balance of
        :param amount: string- amount to be updated
        :return:None
        the function sends sql query that updates the amount of coins that the current address has
        the function is build as multi threaded safe from deadlocks
        """
        while True:
            sql = "INSERT INTO balances(address, " + coin + "_balance) VALUES (%s, %s) ON DUPLICATE KEY UPDATE " \
                + coin + "_balance = " + coin + "_balance + %s"
            values = (address, amount, amount)
            try:
                self.cursor.execute(sql, values)  # if the address is not in the DB
                break
            except InternalError as error:
                if error.errno == "1213":  # we have deadlock
                    time.sleep(1)
            except Exception as error:
                print error
                break

    def insert_dictionary(self, dictionary, coin):
        """
        :param dictionary:  dictionary - the UTXs dictionary that was build by the parser
        :param coin: string - the name of the fork we currently scanning
        :return: None
        iterate the dictionary and insert all the UTX values to the DB and delete those we updated
        """
        for utx in dictionary.keys():
            for output in dictionary[utx].outputs.keys():
                address = BlockChainParser.public_key_to_address(dictionary[utx].outputs[output][0])
                if address != "":
                    amount = float(dictionary[utx].outputs[output][1]) / 100000000  # the amount comes in satoshi(10^-8)
                    self.update_balance(coin, address, amount)
                del dictionary[utx].outputs[output]
            del dictionary[utx]
            if len(dictionary) % 100 == 0:
                print "size of UTXs: ", len(dictionary)
                self.conn.commit()  # will commit the changes

