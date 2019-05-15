from blocktools import Block, BlockHeader, Tx, types
from pybitcoin import BitcoinPublicKey

def main():
    continueParsing = True
    counter = 0
    with open("C:\Users\\rainesl\AppData\Roaming\BitcoinGold\\blocks\\blk00000.dat", 'rb') as blockchain:
        while continueParsing:
            block1 = Block(blockchain)
            raw_pk = block1.Txs[0].outputs[0].pubkey
            pk = block1.Txs[0].outputs[0].get_pubkey()
            if pk[0] != '4' or pk[1] != '1' or pk[len(pk)-1] != 'c' or pk[len(pk)-2] != 'a':
                print "fuck"

            continueParsing = block1.continueParsing
            if continueParsing:
                print str(block1)
            counter += 1



if __name__ == "__main__":
    main()