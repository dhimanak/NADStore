import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import _ from 'lodash';

var Ethereum_client = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var nadAddressStoreAbi = [{"constant":true,"inputs":[],"name":"getAddresses","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_state","type":"bytes32"},{"name":"_county","type":"bytes32"},{"name":"_stnPosType","type":"bytes32"},{"name":"_guid","type":"bytes32"}],"name":"addAddress","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"addresses","outputs":[{"name":"state","type":"bytes32"},{"name":"county","type":"bytes32"},{"name":"stN_PosTyp","type":"bytes32"},{"name":"guid","type":"bytes32"}],"payable":false,"type":"function"}];
var nadAddressStoreAddress = "0x2933f8e252c6108d029a8379da6b00857a4fb768";

var nadAddressStoreContract = Ethereum_client.eth.contract(nadAddressStoreAbi).at(nadAddressStoreAddress);


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      states: [],
      counties: [],
      pos:[],
      guids:[]
    }
  }

  componentWillMount(){
    var data = nadAddressStoreContract.getAddresses();

    this.setState({
      states: String(data[0]).split(','),
      counties: String(data[1]).split(','),
      pos: String(data[2]).split(','),
      guids: String(data[2]).split(','),
    })
  }

  render() {

    var tableRows = [];
   
    _.each(this.state.states, (value, index) => {
      tableRows.push(
          <tr>
              <td>{Ethereum_client.toAscii(this.state.states[index])}</td>
              <td>{Ethereum_client.toAscii(this.state.counties[index])}</td>
              <td>{Ethereum_client.toAscii(this.state.pos[index])}</td>
              <td>{Ethereum_client.toAscii(this.state.guids[index])}</td>
          </tr>
        )
    })

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to NADAddress DAPP</h2>
        </div>

        <div className="text-right"><h2>NAD Addresses Lookup </h2></div>
        <div className="App-Content">
          <table>
          <thead>
            <tr>
              <th>STATE</th>
              <th>COUNTY</th>
              <th>POS</th>
              <th>GUID</th>
            </tr>
          </thead>
          <tbody>
           {tableRows}
          </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
