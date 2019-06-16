from blocktools import*
from block import Block
from block import TxInput
import os
import hashlib
import base58


class UTX(object):
    """
    A class for more convenient way to represent a UTX
    """
    def __init__(self):
        self.outputs = {}


class BlockChainParser(object):
    def __init__(self):
        """
        input: None
        :return:  None
        will save the path to the block files, and allocate memory for the UTX dictionary
        """
        self.block_chain_files_path = "C:\\Users\\rainesl\\AppData\\Roaming\\Bitcoin\\blocks" + "\\blk"
        self.utxs = {}  # dictionary in stack

    def parse(self):
        """
        input: None
        :return: None
        this function will iterate ove the blockchain, and save the UTX's in a dictionary
        """
        continue_parsing = True
        block_file_number_str = '00000'
        block_number_index = 0
        while int(block_file_number_str) < 1:  # until segwit fork
            with open(self.block_chain_files_path + block_file_number_str + ".dat", 'rb') as blockchain:
                while continue_parsing:
                    try:
                        block = Block(blockchain)  # transform the data from .dat
                        print "scanning block num ", block_number_index, "block file ", block_file_number_str
                        block_number_index += 1
                    except Exception as error:  # run on the blockchain
                        if blockchain.tell() == os.fstat(
                                blockchain.fileno()).st_size:  # will tell if the pointer is at the end of the file
                            block_file_number_str = self.increment_block(block_file_number_str)
                            break
                        print error

                    for tx in block.Txs:
                        self.build_utx_dict(tx)
                    continue_parsing = block.continueParsing
                else:
                    block_file_number_str = self.increment_block(block_file_number_str)
                    continue_parsing = True

    @staticmethod
    def reverse_bytes(value):  # reverse to little endian
        """
        :param value: string in hex that need to be reversed to little endian
        :return: the little endian string
        """
        swapped = ''
        for i in range(0, len(value), 2):
            swapped = swapped + value[len(value)-1-i-1]
            swapped = swapped + value[len(value)-1-i]
        return swapped

    def spend_tx(self, prev_hash, prevout_n):
        """
        :param prev_hash: string - hex of the input transaction
        :param prevout_n: string - the serial number of the output public key in the transaction that is now a input
        :return: None
        will go to the relevant transaction and delete the prevout_n output, if we left with empty transaction we will
        delete this transaction leaving us only with the unspent transaction
        """
        if int(prev_hash, 16) != 0:  # check if this is not a new generated coin
            del self.utxs[prev_hash].outputs[str(prevout_n)]  # delete the transaction if it was used
            if self.utxs[prev_hash].outputs == {}:  # if dictionary is empty delete the entire transaction
                del self.utxs[prev_hash]

    @staticmethod
    def increment_block(block_string):
        """
        :param block_string: string - the current block number as 5 digit string
        :return: string - the incremented string of the current block number as 5 digit string
        """
        block_string = '%05d' % (int(block_string) + 1)  # convert to int and back to string
        return block_string

    def fix_count(self, count, size):
        """
        :param count: string
        :param size: hex - driven from the blockchain
        :return: the constituted string of count and the size reversed to little endian
        the reason for this is this is how thw transaction hash is calculated
        """
        if size == 0xfd:  # if fd<size<ffff need to be 3 bytes if size<fd need to be 2 bytes
            icount = '{:04x}'.format(count, 'x') + "fd"  # change count from int to 2B HEX
        elif size == 0xfe:
            icount = '{:08x}'.format(count, 'x') + "fe"  # change to 5 bytes
        elif size == 0xff:
            icount = '{:016x}'.format(count, 'x') + "ff"  # change to 9 bytes

        else:
            icount = format(count, 'x')         # change count from int to 2B HEX
        if len(icount) % 2 != 0:
            icount = "0" + icount
        icount = self.reverse_bytes(icount)
        return icount

    def build_utx_dict(self, tx):
        """
        :param tx: txInput object
        :return: None
        will calculate the transaction hash in insert it to the UTX's dictionary.
        also will call the spent transaction function that will erase all the input in current transaction
        from the dictionary
        """
        utx = UTX()
        tx_str = ''
        nversion = tx.version
        in_count = self.fix_count(tx.inCount , tx.in_count_header)
        out_count = self.fix_count(tx.outCount , tx.out_count_header)
        n_lock_time = tx.lockTime
        tx_str = tx_str + nversion + in_count

        for tx_input in tx.inputs:
            prev_hash = hash_str(tx_input.prevhash)
            prevout_n = tx_input.txOutId   # index of transaction
            self.spend_tx(prev_hash, prevout_n)
            prev_hash = self.reverse_bytes(prev_hash)
            prevout_n = tx_input.tx_out_index
            script_len = self.fix_count(tx_input.scriptLen, tx_input.script_len_header)
            script_sig = hash_str(tx_input.scriptSig)
            sequence = tx_input.seqNo
            tx_str = tx_str + prev_hash + prevout_n + script_len + script_sig + sequence
        tx_str = tx_str + out_count

        i = 0
        for output in tx.outputs:
            value = output.value
            script_len = self.fix_count(output.scriptLen, output.script_len_header)
            script_pub_key = hash_str(output.pubkey)
            tx_str = tx_str + value + script_len + script_pub_key
            output_public_key = ""
            try:
                output_public_key = output.decodeScriptPubkey(output.pubkey)  # sometimes its a empty value
            except Exception as error:
                pass
            utx.outputs[str(i)] = (output_public_key, output.int_value)
            i += 1

        tx_str = tx_str + n_lock_time
        hash1 = hashlib.sha256(tx_str.decode("hex")).hexdigest()
        hash2 = hashlib.sha256(hash1.decode("hex")).hexdigest()
        tx_hash = self.reverse_bytes(hash2)
        self.utxs[tx_hash] = utx

    @staticmethod
    def public_key_to_address(public_key):
        """
        :param public_key: string - hex of a public key
        :return: string - the corresponding address of the public key
        """
        if len(public_key) == 0:  # empty output public key
            return
        address = str(public_key)  # will create a copy
        if len(address) == 130 or len(public_key) == 66:  # public ECDSA key uncompressed or compressed
            address = hashlib.sha256(address.decode("hex")).hexdigest()
            ripemd160 = hashlib.new('ripemd160')
            ripemd160.update(address.decode("hex"))
            address = ripemd160.hexdigest()
        if len(address) == 40:  # RIPEMD 160
            address = '00' + address  # adding network bytes
            temp_adress = address
            address = hashlib.sha256(address.decode("hex")).hexdigest()
            address = hashlib.sha256(address.decode("hex")).hexdigest()
            address = temp_adress + address[0:8]  # adding 4 first bytes to stage of temp address
            address = base58.b58encode(address.decode("hex"))
        else:
            address = ""
        return address

