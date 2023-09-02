
import {schnorr} from '@noble/curves/secp256k1'
import {bytesToHex} from '@noble/hashes/utils'
import {wordlist} from '@scure/bip39/wordlists/english'
import {generateMnemonic,mnemonicToSeedSync, validateMnemonic } from '@scure/bip39'
import {HDKey} from '@scure/bip32'
import {nip19} from 'nostr-tools'

import pkg from 'bitcore-lib';
  const {PrivateKey} = pkg;



export function strGenerateSeedWords(){
  return generateMnemonic(wordlist)
}

export function boolIsValidWords(words){
  return validateMnemonic(words, wordlist)
}

export function strSecKeyFromSeedWords(mnemonic, der_path, passphrase = "" ){
  let root = HDKey.fromMasterSeed(mnemonicToSeedSync(mnemonic, passphrase))
  let privateKey = root.derive(der_path).privateKey
  if (!privateKey) throw new Error('could not derive private key')
  return bytesToHex(privateKey)
}

function getNostrPublicKey(privateKey) {
  return bytesToHex(schnorr.getPublicKey(privateKey))
}


export function objNostrKeysByAccount(strSeedWord12, intAccount = 0, intChange = 0, intIndex = 0) {

  if (boolIsValidWords(strSeedWord12) == false){
    return {error: "Invalid seed words."}
  }

  if (intChange > 1 || intChange < 0 ){
    return {error: "intChain is either 0 or 1."}
  }

  let objOut = {}
  let strDerivationPath = `m/44'/1237'/${intAccount}'/${intChange}/${intIndex}`

  objOut.nsecHex = strSecKeyFromSeedWords(strSeedWord12, strDerivationPath)
  objOut.npubHex = getNostrPublicKey(objOut.nsecHex)
  objOut.nsec = nip19.nsecEncode(objOut.nsecHex)
  objOut.npub = nip19.npubEncode(objOut.npubHex)

  return objOut
}


export function objCoinKeysByAccount(strSeedWord12, intCoin = 0, intAccount = 0, intChange = 0, intIndex = 0) {

  if (boolIsValidWords(strSeedWord12) == false){
    return {error: "Invalid seed words."}
  }

  if (intChange > 1 || intChange < 0 ){
    return {error: "intChain is either 0 or 1."}
  }

  let objOut = {}
  let strDerivationPath = `m/44'/${intCoin}'/${intAccount}'/${intChange}/${intIndex}`

  objOut.nsecHex = strSecKeyFromSeedWords(strSeedWord12, strDerivationPath)

  let privateKeyCoin = new PrivateKey(objOut.nsecHex)
  objOut.CoinAddress = privateKeyCoin.toAddress().toString()
  objOut.CoinPrivateKeyWIF = privateKeyCoin.toWIF()

  return objOut
}






