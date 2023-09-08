const bip39 = require('bip39');
const { ethers } = require('ethers');
const { HDNode } = require('@ethersproject/hdnode');

const generateWallet = () => {
  
  console.log("generateWallet running");

  // Generate a mnemonic
  const mnemonic = bip39.generateMnemonic();

  // Derive the master seed from the mnemonic
  const masterSeed = bip39.mnemonicToSeedSync(mnemonic);

  // Derive Bitcoin private key
  const bitcoinMasterNode = HDNode.fromSeed(masterSeed);
  const bitcoinNode = bitcoinMasterNode.derivePath("m/44'/0'/0'/0");
  const bitcoinPrivateKey = bitcoinNode.privateKey.toString('hex');

  // Derive Ethereum private key
  const ethereumMasterNode = HDNode.fromSeed(masterSeed);
  const ethereumNode = ethereumMasterNode.derivePath("m/44'/60'/0'/0");
  const ethereumPrivateKey = ethereumNode.privateKey.toString('hex');

  // Example for USDT (or other ERC-20 tokens) using Ethereum derivation path
//   const usdtNode = ethereumMasterNode.derivePath("m/44'/60'/0'/0/0");
//   const usdtPrivateKey = usdtNode.privateKey.toString('hex');

  // Return the generated wallet data or perform any other necessary actions
  return {
    mnemonic,
    masterSeed: masterSeed.toString('hex'),
    bitcoinPrivateKey,
    ethereumPrivateKey,
    // usdtPrivateKey,
  };
};

// if (require.main === module) {
//   // This code will only run when the module is executed directly as a script
//   const wallet = generateWallet();
//   console.log('Mnemonic:', wallet.mnemonic);
//   console.log('Ethereum Private Key:', wallet.ethereumPrivateKey);
//   console.log('USDT Private Key:', wallet.usdtPrivateKey);
//   console.log('Bitcoin Private Key', wallet.bitcoinPrivateKey);
//   console.log('Master Seed:', wallet.masterSeed.toString('hex'));
// }

const wallet = generateWallet();
console.log('Mnemonic:', wallet.mnemonic);
console.log('Ethereum Private Key:', wallet.ethereumPrivateKey);
console.log('USDT Private Key:', wallet.usdtPrivateKey);
console.log('Bitcoin Private Key', wallet.bitcoinPrivateKey);
console.log('Master Seed:', wallet.masterSeed.toString('hex'));

module.exports = {
  generateWallet, wallet,
};

