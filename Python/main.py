import BlockChainParser
from DB import *
import threading


def multi_threaded_dictionary_insert(dictionary, coin):
    dict1 = dictionary.keys()[0:len(dictionary) / 3]
    dict2 = dictionary.keys()[len(dictionary) / 3: 2 * len(dictionary) / 3]
    dict3 = dictionary.keys()[2 * len(dictionary) / 3:]

    db_client1 = DBClient()
    db_client2 = DBClient()
    db_client3 = DBClient()

    t1 = threading.Thread(target=db_client1.insert_dictionary, args=(dictionary, dict1, coin))
    t2 = threading.Thread(target=db_client2.insert_dictionary, args=(dictionary, dict2, coin))
    t3 = threading.Thread(target=db_client3.insert_dictionary, args=(dictionary, dict3, coin))

    t1.start()
    t2.start()
    t3.start()

    t1.join()
    t2.join()
    t3.join()


def main():
    parser = BlockChainParser()
    parser.parse()  # will create dictionary with all utxs
    db_client = DBClient()
    db_client.insert_dictionary(parser.utxs, "core")
    #multi_threaded_dictionary_insert(parser.utxs, "core")


if __name__ == "__main__":
    main()
