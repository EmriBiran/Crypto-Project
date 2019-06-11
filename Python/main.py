from BlockChainParser import *
from DB import *


def main():
    parser = BlockChainParser()
    parser.parse()  # will create dictionary with all utxs
    db_client = DBClient()
    for utx in parser.utxs.keys():
        for output in parser.utxs[utx].outputs.keys():
            address = parser.public_key_to_address(parser.utxs[utx].outputs[output][0])
            amount = float(parser.utxs[utx].outputs[output][1]) / 100000000  # the amount comes in satoshi(10^-8)
            db_client.update_balance("core", address, amount)
            del parser.utxs[utx].outputs[output]
        del parser.utxs[utx]


if __name__ == "__main__":
    main()
