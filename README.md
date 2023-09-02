# nostr-keys

## One key to rule them all.

Private keys for Nostr and cryptocurrencies are simply very large random integers. They are all similar in that way. At that base level, they are interchangable.

For example, once you generate a Nostr private key, that same private key controls a Bitcoin address, a Litecoin address, and an ever growing list of systems.

This package allows you to generate or import a 12 word seed phrase, from which you can obtain a near limitless number of Nostr keypairs, Bitcoin private keys and address, as well as those for many other cryptocurrencies.

## Example Code (/test/test.mjs)

```
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

```


## Example Code Output

```

New random private 12 word seed phrase in a string.
any ten vague remind average never coconut universe they board sad sad


Is this a valid seed phrase.
true

Nostr keys.
{
  nsecHex: 'a9318d82eab6b8fe8b0d4a8e1ae553c6779240e6e87934c8e8271ef3a42565fd',
  npubHex: 'ace5b7c3109b337704de6bcca86e2bec9110880a796a9a60248bb8cbe69318db',
  nsec: 'nsec14yccmqh2k6u0azcdf28p4e2ncemeys8xapunfj8gyu008fp9vh7sscpayw',
  npub: 'npub14njm0scsnvehwpx7d0x2sm3tajg3pzq2094f5cpy3wuvhe5nrrdsr94ysw',
  strDerivationPath: "m/44'/1237'/0'/0/0"
}

Just give me the npub.
npub14njm0scsnvehwpx7d0x2sm3tajg3pzq2094f5cpy3wuvhe5nrrdsr94ysw

First 5 Nostr nsec's.
m/44'/1237'/0'/0/0 nsec14yccmqh2k6u0azcdf28p4e2ncemeys8xapunfj8gyu008fp9vh7sscpayw
m/44'/1237'/1'/0/0 nsec1sy5z7wjja8pztdhmkk2pvjdkru9cwk2xevg4wlt062wyc0pd3vuqfxd053
m/44'/1237'/2'/0/0 nsec1fxx7zx3cm53qzp84a660234sd47h5gxdgwmulv223ssv2hde9clqh8fk3t
m/44'/1237'/3'/0/0 nsec15q0u85z30hqhrrctnweqg9tl8yjnu0dzzpkldcghplalwtpv3qms29h64s
m/44'/1237'/4'/0/0 nsec12yzm6hc3hd98h4clmt8tl8qwm9sfchewvss5xzhw5t5uawx4a8aqchyveq

Bitcoin address and private key.
{
  nsecHex: '29c2f0df778e2d02cc9811e24bd84b323cedb0601570e5ac640d0459f9b89144',
  strCoinPrivateKeyWIF: 'KxctZPrgKHtgKBuVpXNpbxWLWG6UBDpUUdSPmJeVXwmsahv7KJJV',
  strCoinAddress: '1CsTuJYXtETUP1gcU6C8K5mhBfhzEpSfki',
  strDerivationPath: "m/44'/0'/0'/0/0"
}

The first 5 Bitcoin addresses.
m/44'/0'/0'/0/0 1CsTuJYXtETUP1gcU6C8K5mhBfhzEpSfki KxctZPrgKHtgKBuVpXNpbxWLWG6UBDpUUdSPmJeVXwmsahv7KJJV
m/44'/0'/0'/0/1 1PRtgEY1o58aEfhsafqZT5ELtCXdnzmd8q L1P9u5ATMnS6VRqQ39KeRGNsf8K4dhYYrupGYv8KDtgMgVc9VeAp
m/44'/0'/0'/0/2 1QCVZ5m6UbK9U6arTK2zdFA457i4NhshmU L2dmUqMz9G4o8kFV8jp6h5PToje4cLYwwzYnDZVmE6W2pKU6jybN
m/44'/0'/0'/0/3 1FG471XN8z6Le5RYhXAhPxnPK7pfNuDnmA L3KU1ZtmnrbhdKGru712dWsSKpPVBy6imNCoXuywwko943DJQSAh
m/44'/0'/0'/0/4 16KhtSLT8ZhYEmJqekCwtiGUW9cLEHKxZs L4wspFPuzkhZLEfGCKZuH5D8b75YKsMxiZcfftFFM2Q1PfdVAWSo

The first 5 Bitcoin change addresses.
m/44'/0'/0'/1/0 12RAiqdToGnwiNPKJJF4Biff6GYabbEhBB L2cWS8AxxMejd49WC1CTkiMjNYhDics3wKjEFZbLSW8c9jRrDyu6
m/44'/0'/0'/1/1 1LnjucKhqf1fJZaNRexogpqQNSYktyURWG KwoNKZ89Cfcbt9bnPkZKZKHu9Jqz3S68TohALJibWtuj2no8QiDg
m/44'/0'/0'/1/2 1GDt86VUZYTEMW4KfMbviXBf9jCxnPyxBF KyZNqYCExC47dxuRmyirSyddJCNtsy1Uz5GeyVt3hMmiYaEwiygk
m/44'/0'/0'/1/3 1M3w1yj9khTAjc2wDNqAjzhEtpgzBJ6bdi L1ShfyxfaNvQupZTJoARSMZvZ4VPgk5HKUB4VvxxAyEdTVYp7Q7A
m/44'/0'/0'/1/4 19NHHbBQfL6wi86YT3JcaTHdHrTpHWnu35 L1XqVy2aYCH5bJ6FNmsuKS6D2dmdxFsCNZgxR5LCeh7age2mjJmf

Litecoin address and key.
{
  nsecHex: 'af484e1715f3dfb889d8308d007dc43402ffc674b39433f2d095ee96c5cd7990',
  strCoinPrivateKeyWIF: 'L36SJTwhAaEkCDkCsPvVrYeCUybQMo4CjmpUYH5HRxv16cmxHYhi',
  strCoinAddress: '16DW7HZ7qTFSC9qnEMGzVyfs8xJEBcEcFz',
  strDerivationPath: "m/44'/2'/0'/0/0"
}

Dogecoin address and key for Elon.
{
  nsecHex: '943fd935e47c28c284a2198ddb780a9754a1a70a8a056d850fe0b50e64f24df9',
  strCoinPrivateKeyWIF: 'L2BtUh1sUUKQnojXxEG29Ae14nBsvzBnEYnEGyLG354ugCMvUvbH',
  strCoinAddress: '1PaycfwfYv6gMhEGr1RVLnfX9tR8MF2rUD',
  strDerivationPath: "m/44'/3'/0'/0/0"
}
```



