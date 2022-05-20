import { Component } from '@angular/core';
import mewConnect from '@myetherwallet/mewconnect-web-client';

import Web3 from 'web3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mewconnect';
  connect: any
  ethereum: any
  web3: any
  constructor() {
    
    const NetworkEndPoints = {
      1: 'https://nodes.mewapi.io/rpc/eth',
      3: 'https://nodes.mewapi.io/rpc/rop',
      5: 'wss://nodes.mewapi.io/ws/goerli',
      42: 'https://nodes.mewapi.io/rpc/kovan',
      137: 'wss://nodes.mewapi.io/ws/matic',
      56: 'https://nodes.mewapi.io/rpc/bsc'
    };
    this.connect = new mewConnect.Provider({
      windowClosedError: true,
      chainId: 1,
      rpcUrl: NetworkEndPoints[1]
    });
    // Create the MEWconnect web3 provider
    this.ethereum = this.connect.makeWeb3Provider();
    // Create a web3 instance using the MEWconnect web3 provider
    this.web3 = new Web3(this.ethereum);
    // See the 'onClick' method below for starting the connection sequence
    // listener on the web3 provider emiting when the account changes (at the moment this is also the same as a connection being established.)
    this.ethereum.on('accountsChanged', (accounts: any) => {
      console.log(`accountsChanged User's address is ${accounts[0]}`);
    });
  }

  onClick() {
    this.connect.enable().then(accounts => {
      console.log(`User's address is ${accounts[0]}`);
      // this.userAddress = accounts[0];
    });
  }
}
