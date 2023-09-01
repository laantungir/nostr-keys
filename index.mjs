
import {schnorr} from '@noble/curves/secp256k1'
import {bytesToHex, concatBytes, hexToBytes} from '@noble/hashes/utils'
import {wordlist} from '@scure/bip39/wordlists/english'
import {
  generateMnemonic,
  mnemonicToSeedSync,
  validateMnemonic
} from '@scure/bip39'
import {HDKey} from '@scure/bip32'
import {bech32} from '@scure/base'
import {nip19} from 'nostr-tools'

function privateKeyFromSeedWords(mnemonic, der_path, passphrase = "" ){
  let root = HDKey.fromMasterSeed(mnemonicToSeedSync(mnemonic, passphrase))
  let privateKey = root.derive(der_path).privateKey
  if (!privateKey) throw new Error('could not derive private key')
  return bytesToHex(privateKey)
}

function generateSeedWords(){
  return generateMnemonic(wordlist)
}

function validateWords(words){
  return validateMnemonic(words, wordlist)
}

export function getPublicKey(privateKey) {
  return bytesToHex(schnorr.getPublicKey(privateKey))
}

let DerPath = `m/44'/1237'/0'/0/0`
console.log()

let arrCoinCodes = [["Nostr" , "1237"],
                    ["Bitcoin", "0"]]


let SW = generateSeedWords()

if (validateWords(SW)){

  console.log()
  console.log( SW )
  console.log()
  console.log( `Words are a valid key phrase.`)
  console.log()

  for (let Coin of arrCoinCodes){
    for (let i = 0; i < 2; i++){
      DerPath = `m/44'/${Coin[1]}'/${i}'/0/0`

      let nsecHex = privateKeyFromSeedWords(SW, DerPath)
      let nspubHex = getPublicKey(nsecHex)
      let nsec = nip19.nsecEncode(nsecHex)
      let npub = nip19.npubEncode(nspubHex)
    
      console.log(`             ${Coin[0]} Account ${i}`)
      console.log("Secret Key: ",nsecHex)
      console.log("            ",nsec)
    
      console.log("Public Key: ",nspubHex)
      console.log("            ",npub)
    
      console.log()


    }
  }


}




