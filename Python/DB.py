import mysql.connector
from mysql.connector import IntegrityError


class DBClient(object):

    def __init__(self):
        self.conn = mysql.connector.connect(user='root', password='Sql123456', host='127.0.0.1', port=3306, database='coinsschema')
        self.cursor = self.conn.cursor()

    def __del__(self):  # destructor
        self.conn.commit()  # saves all the changes
        self.conn.close()

    def update_balance(self, coin, address, amount):
        sql = "INSERT INTO balances(address, " + coin + "_balance) VALUES (%s, %s)"
        values = (address, amount)
        try:
            self.cursor.execute(sql, values)  # if the address is not in the DB

        except IntegrityError as error:
            if error.errno == 1062:  # if the address is already in the DB
                sql = "UPDATE balances SET " + coin + "_balance = " + coin + "_balance + %s WHERE address = %s"
                values = (amount, address)
                try:
                    self.cursor.execute(sql, values)

                except Exception as error:
                    print error
            else:
                print error

        except Exception as error:
            print error


def main():
    pass


if __name__ == "__main__":
    main()
