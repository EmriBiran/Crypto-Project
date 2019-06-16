import BlockChainParser
from DB import *


def main():
    parser = BlockChainParser()
    parser.parse()  # will create dictionary with all utxs
    db_client = DBClient()
    db_client.insert_dictionary(parser.utxs, "core")


if __name__ == "__main__":
    main()
