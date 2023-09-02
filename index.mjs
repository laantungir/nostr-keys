
import {schnorr} from '@noble/curves/secp256k1'
import {bytesToHex, concatBytes, hexToBytes} from '@noble/hashes/utils'
import {wordlist} from '@scure/bip39/wordlists/english'
import {generateMnemonic,mnemonicToSeedSync, validateMnemonic } from '@scure/bip39'
import {HDKey} from '@scure/bip32'
import {nip19} from 'nostr-tools'

import pkg from 'bitcore-lib';
  const {PrivateKey} = pkg;



function strGenerateSeedWords(){
  return generateMnemonic(wordlist)
}

function boolIsValidWords(words){
  return validateMnemonic(words, wordlist)
}

function strSecKeyFromSeedWords(mnemonic, der_path, passphrase = "" ){
  let root = HDKey.fromMasterSeed(mnemonicToSeedSync(mnemonic, passphrase))
  let privateKey = root.derive(der_path).privateKey
  if (!privateKey) throw new Error('could not derive private key')
  return bytesToHex(privateKey)
}

function getNostrPublicKey(privateKey) {
  return bytesToHex(schnorr.getPublicKey(privateKey))
}


function objNostrKeysByAccount(strSeedWord12, intAccount = 0) {

  if (boolIsValidWords(strSeedWord12) == false){
    return {error: "Invalid seed words."}
  }

  let objOut = {}
  let strDerivationPath = `m/44'/1237'/${intAccount}'/0/0`

  objOut.nsecHex = strSecKeyFromSeedWords(strSeedWord12, strDerivationPath)
  objOut.npubHex = getNostrPublicKey(objOut.nsecHex)
  objOut.nsec = nip19.nsecEncode(objOut.nsecHex)
  objOut.npub = nip19.npubEncode(objOut.npubHex)

  return objOut
}


function objBitcoinKeysByAccount(strSeedWord12, intAccount = 0) {

  if (boolIsValidWords(strSeedWord12) == false){
    return {error: "Invalid seed words."}
  }

  let objOut = {}
  let strDerivationPath = `m/44'/0'/0'/0/${intAccount}`

  objOut.nsecHex = strSecKeyFromSeedWords(strSeedWord12, strDerivationPath)

  let privateKeyBTC = new PrivateKey(objOut.nsecHex)
  objOut.btcAddress = privateKeyBTC.toAddress().toString()
  objOut.btcPrivateKeyWIF = privateKeyBTC.toWIF()

  return objOut
}



let strTest = 'frown wedding balcony modify miracle inform adapt foil onion air tenant voyage'


console.log(objNostrKeysByAccount(strTest, 0))
console.log(objBitcoinKeysByAccount(strTest, 0))




