# nostr-keys

## One key to rule them all.

Private keys for Nostr and cryptocurrencies are simply very large random integers. They are all similar in that way. At that base level, they are interchangable.

For example, once you generate a Nostr private key, that same private key controls a Bitcoin address, and a Litecoin address, and an ever growing list of systems.

This package allows you to generate a 12 word seed phrase, from which you can obtain a near limitless number of Nostr keypairs, Bitcoin private keys and address, as well as many other cryptocurrencies.

## Examples 

```

import {    strGenerateSeedWords, 
            boolIsValidWords, 
            objNostrKeys,
            objCoinKeys }  
            from "@laantungir/nostr-keys"

console.log()

// Generate a new random private 12 word seed phrase in a string
let strSP = strGenerateSeedWords()
console.log(strSP)
console.log()


// For the rest of this test example we will use this seed phrase
strSP =`member roof lottery crater list exclude vote rude sail school face address`


// Is this a valid 12 word seed phrase?
console.log("Is this a valid phrase? ", boolIsValidWords(strSP) )


// From this phrase, generate a javascript object that contains 
// nostr keys that conform to NIP-06 and NIP-19 
let oNK = objNostrKeys(strSP)
console.log(oNK)
console.log()


// Just get the npub 
console.log(oNK.npub)
console.log()


// That key phrase will generate a near endless number of Nostr 
// keys, so lets print out the first 10 account nsec's.
for (var i = 0; i < 10; i++) {
    console.log(i, objNostrKeys(strSP,i).nsec)
}



```






