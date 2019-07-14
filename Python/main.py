from BlockChainParser import BlockChainParser


def main():
    parser = BlockChainParser()
    parser.parse_the_blockchain()
    parser.update_balances("core")


if __name__ == "__main__":
    main()
