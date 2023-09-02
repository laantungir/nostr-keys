
import { strGenerateSeedWords, 
         boolIsValidWords, 
         objNostrKeys,
         objCoinKeys } from "@laantungir/nostr-keys"

console.log()
console.log(`New random private 12 word seed phrase in a string.`)
let strSP = strGenerateSeedWords()
console.log(strSP)
console.log()


// Use this if you are importing a seed phrase instead of 
// generating one.
console.log()
console.log(`Is this a valid seed phrase.`)
console.log(boolIsValidWords(strSP) )


// From this phrase, generate a javascript object that contains 
// nostr keys that conform to NIP-06 and NIP-19 
console.log()
console.log(`Nostr keys.`)
let oNK = objNostrKeys(strSP)
console.log(oNK)


console.log()
console.log(`Just give me the npub.`)
console.log(oNK.npub)


// The key phrase will generate a near endless number of Nostr keys
console.log()
console.log(`First 5 Nostr nsec's.`)
for (var i = 0; i < 5; i++) {
    console.log(objNostrKeys(strSP,i).strDerivationPath, objNostrKeys(strSP,i).nsec)
}


// Now Bitcoin :-)
console.log()
console.log(`Bitcoin address and private key.`)
let objBC = objCoinKeys(strSP)
console.log(objBC)


console.log()
console.log("The first 5 Bitcoin addresses.")
for (var i = 0; i < 5; i++) {
    let objBC = objCoinKeys(strSP, 0, 0, 0, i)
    console.log(objBC.strDerivationPath, objBC.strCoinAddress, objBC.strCoinPrivateKeyWIF)
}


console.log()
console.log("The first 5 Bitcoin change addresses.")
for (var i = 0; i < 5; i++) {
    let objBC = objCoinKeys(strSP, 0, 0, 1, i)
    console.log(objBC.strDerivationPath, objBC.strCoinAddress, objBC.strCoinPrivateKeyWIF)
}


console.log()
console.log("Litecoin address and key.")
console.log(objCoinKeys(strSP,2))

console.log()
console.log("Dogecoin address and key for Elon.")
console.log(objCoinKeys(strSP,3))
