const {
    deployRelayHub,
    runRelayer,
    fundRecipient,
  } = require('@openzeppelin/gsn-helpers');
  Web3 = require('web3')

  async function relayerMain() {
    const web3 = new Web3('http://localhost:8545');
      await deployRelayHub(web3, {
            from: web3.eth.accounts[0],
        });
      await runRelayer(web3, {
        relayUrl: 'http://localhost:8090',
        workdir: process.cwd(), // defaults to a tmp dir
        devMode: true,
        ethereumNodeURL: 'http://localhost:8545',
        gasPricePercent: 0,
        port: 8090,
        quiet: true,
      });
      await registerRelay({
        relayUrl: 'http://localhost:8090',
        stake: ether('1'),
        unstakeDelay: 604800, // 1 week
        funds: ether('5'),
        from: web3.eth.accounts[0],
      });
      await fundRecipient(web3, {
        recipient: RECIPIENT_ADDRESS, // required
        amount: ether('1'),
        from: web3.eth.accounts[0],
      });
      const balance=await balance(web3, {
        recipient: RECIPIENT_ADDRESS, // required
      });
      console.log("balance ",balance);
  }
  
  relayerMain();