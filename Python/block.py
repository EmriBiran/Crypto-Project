from blocktools import *
from codes import *
from datetime import datetime


class BlockHeader:
    def __init__(self, blockchain):
        self.version = uint4(blockchain)
        self.previousHash = hash32(blockchain)
        self.merkleHash = hash32(blockchain)
        self.time = uint4(blockchain)
        self.bits = uint4(blockchain)
        self.nonce = uint4(blockchain)

    def toString(self):
        print "Version:\t %d" % self.version
        print "Previous Hash\t %s" % hashStr(self.previousHash)
        print "Merkle Root\t %s" % hashStr(self.merkleHash)
        print "Time stamp\t "+ self.decodeTime(self.time)
        print "Difficulty\t %d" % self.bits
        print "Nonce\t\t %s" % self.nonce

    def decodeTime(self, time):
        utc_time = datetime.utcfromtimestamp(time)
        return utc_time.strftime("%Y-%m-%d %H:%M:%S.%f+00:00 (UTC)")


class Block:
    def __init__(self, blockchain):
        self.continueParsing = True
        self.magicNum = 0
        self.blocksize = 0
        self.blockheader = ''
        self.txCount = 0
        self.Txs = []

        if self.hasLength(blockchain, 8):
            self.magicNum = uint4(blockchain)
            self.blocksize = uint4(blockchain)
        else:
            self.continueParsing = False
            return

        if self.hasLength(blockchain, self.blocksize):
            self.setHeader(blockchain)
            self.txCount = varint(blockchain)[0]
            self.Txs = []

            for i in range(0, self.txCount):
                tx = Tx(blockchain)
                tx.seq = i
                self.Txs.append(tx)
        else:
            self.continueParsing = False

    def continueParsing(self):
        return self.continueParsing

    def getBlocksize(self):
        return self.blocksize

    def hasLength(self, blockchain, size):
        curPos = blockchain.tell()
        blockchain.seek(0, 2)

        fileSize = blockchain.tell()
        blockchain.seek(curPos)

        tempBlockSize = fileSize - curPos
        if tempBlockSize < size:
            return False
        return True

    def setHeader(self, blockchain):
        self.blockHeader = BlockHeader(blockchain)

    def toString(self):
        print ""
        print "Magic No: \t%8x" % self.magicNum
        print "Blocksize: \t", self.blocksize
        print ""
        print "#"*10 + " Block Header " + "#"*10
        self.blockHeader.toString()
        print
        print "##### Tx Count: %d" % self.txCount
        for t in self.Txs:
            t.toString()
        print "#### end of all %d transactins" % self.txCount


class Tx:
    def __init__(self, blockchain):
        self.version = uint4(blockchain)
        self.inCount, self.in_count_header = varint(blockchain)
        self.inputs = []
        self.seq = 1
        for i in range(0, self.inCount):
            input = txInput(blockchain)
            self.inputs.append(input)
        self.outCount, self.out_count_header = varint(blockchain)
        self.outputs = []
        if self.outCount > 0:
            for i in range(0, self.outCount):
                output = txOutput(blockchain)
                self.outputs.append(output)
        self.lockTime = uint4(blockchain)

    def toString(self):
        print ""
        print "="*20 + " No. %s " %self.seq + "Transaction " + "="*20
        print "Tx Version:\t %d" % self.version
        print "Inputs:\t\t %d" % self.inCount
        for i in self.inputs:
            i.toString()

        print "Outputs:\t %d" % self.outCount
        for o in self.outputs:
            o.toString()
        print "Lock Time:\t %d" % self.lockTime


class txInput:
    def __init__(self, blockchain):
        self.prevhash = hash32(blockchain)
        self.txOutId = uint4(blockchain)
        self.scriptLen, self.script_len_header = varint(blockchain)
        self.scriptSig = blockchain.read(self.scriptLen)
        self.seqNo = uint4(blockchain)

    def toString(self):
        print "\tTx Out Index:\t %s" % self.decodeOutIdx(self.txOutId)
        print "\tScript Length:\t %d" % self.scriptLen
        self.decodeScriptSig(self.scriptSig)
        print "\tSequence:\t %8x" % self.seqNo

    def decodeScriptSig(self,data):
        hexstr = hashStr(data)
        if 0xffffffff == self.txOutId:  # Coinbase
            return hexstr
        scriptLen = int(hexstr[0:2],16)
        scriptLen *= 2
        script = hexstr[2:2+scriptLen]
        print "\tScript:\t\t " + script
        if SIGHASH_ALL != int(hexstr[scriptLen:scriptLen+2],16): # should be 0x01
            print "\t Script op_code is not SIGHASH_ALL"
            return hexstr
        else:
            pubkey = hexstr[2+scriptLen+2:2+scriptLen+2+66]
            print " \tInPubkey:\t "  + pubkey

    def decodeOutIdx(self,idx):
        s = ""
        if(idx == 0xffffffff):
            s = " Coinbase with special index"
            print "\tCoinbase Text:\t %s" % hashStr(self.prevhash).decode("utf-8")
        else:
            print "\tPrev. Tx Hash:\t %s" % hashStr(self.prevhash)
        return "%8x"%idx + s


class txOutput:
    def __init__(self, blockchain):
        self.value = uint8(blockchain)
        self.scriptLen, self.script_len_header = varint(blockchain)
        self.pubkey = blockchain.read(self.scriptLen)

    def toString(self):
        print "\tValue:\t\t %d" % self.value + " Satoshi"
        print "\tScript Len:\t %d" % self.scriptLen
        print "\tScriptPubkey:\t %s" % self.decodeScriptPubkey(self.pubkey)

    def decodeScriptPubkey(self, data):
        hexstr = hashStr(data)
        op_idx = int(hexstr[0:2], 16)
        try:
            op_code1 = OPCODE_NAMES[op_idx]
        except KeyError:  # Obselete pay to pubkey directly
            keylen = op_idx
            return hexstr[2:2+keylen*2]
        if op_code1 == "OP_DUP":  # P2PKHA pay to pubkey hash mode
            keylen = int(hexstr[4:6],16)
            return hexstr[6:6+keylen*2]
        elif op_code1 == "OP_HASH160":  # P2SHA pay to script hash
            keylen = int(hexstr[2:4],16)
            return hexstr[4:4+keylen*2]
        else:  # TODO extend for multi-signature parsing
            return hexstr

