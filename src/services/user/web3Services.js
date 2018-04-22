import Web3 from "web3";
import config from './config';

console.log("start web instance")
var web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/nRUCOskjng2tooOxkAlU"));
console.log("===");
console.log(web3.eth.accounts)
var BigNumber = require('bignumber.js');
var Tx = require('ethereumjs-tx');
var ethUtil = require('ethereumjs-util');

/// 0xc080aadaafd7d1f8563ca54af18751fed76456dd
var privateKey = new Buffer(config.privateKey, 'hex');
var pubKey = ethUtil.privateToPublic(privateKey).toString('hex');
//console.log(pubKey);
var account = web3.eth.accounts.privateKeyToAccount(privateKey);
//console.log(account);
//web3.eth.accounts.wallet.add(account);
console.log("---");
console.log(web3.eth.accounts);
console.log(web3.eth.accounts[0]);
//web3.eth.defaultAccount = web3.eth.accounts[0];
console.log("--");
console.log(web3.eth.defaultAccount);
var address='0x'+ethUtil.privateToAddress(privateKey).toString('hex');
console.log("address",address);
//console.log("balance:",web3.eth.getBalance(address).toString());
//var ethWeiValue=parseInt(web3.utils.toWei( 0.01,'ether'), 10)
//console.log(ethWeiValue);
var contractAddress = "0xd1fea4d45cc78462f5a2efaa4b74dde73928fb9e";

function getOracleList() {
    return new Promise(function(resolve, reject) {
        myContract.methods.getOracleList().call(function(error, result){
            var promises = [];
            for (var i=0; i<result.length; i++) {
                var id = result[i];
                promises.push(myContract.methods.getOracleName(id).call());
            }
            Promise.all(promises).then(function(names){
                var oracles = [];
                for (var i=0; i<result.length; i++) {
                    var obj = {};
                    obj.id = result[i];
                    obj.name = names[i];
                    oracles.push(obj);
                }
                resolve(oracles);
            });

        });
    });
}


function fetchMessages() {
    return new Promise(function(resolve, reject) {
            myContract.methods.fetchSize(address).call(function(error, result){
                var promises = [];
                var size = result[0];
                for (var i=0; i<size; i++) {
                    var pos = i;
                    promises.push(myContract.methods.fetch(address, pos).call());
                }
                Promise.all(promises).then(function(values){
                    var arr = [];
                    for (var i=0; i< values.length; i++) {
                        arr.push(values[i][0]);
                    }
                    resolve(arr);
                });

            });
        });
    }







var myContract = new web3.eth.Contract([
                                       	{
                                       		"constant": false,
                                       		"inputs": [
                                       			{
                                       				"name": "to",
                                       				"type": "address"
                                       			},
                                       			{
                                       				"name": "msg",
                                       				"type": "string"
                                       			}
                                       		],
                                       		"name": "deliver",
                                       		"outputs": [],
                                       		"payable": false,
                                       		"stateMutability": "nonpayable",
                                       		"type": "function"
                                       	},
                                       	{
                                       		"constant": false,
                                       		"inputs": [
                                       			{
                                       				"name": "user",
                                       				"type": "address"
                                       			},
                                       			{
                                       				"name": "position",
                                       				"type": "uint16"
                                       			}
                                       		],
                                       		"name": "fetch",
                                       		"outputs": [
                                       			{
                                       				"name": "",
                                       				"type": "string"
                                       			}
                                       		],
                                       		"payable": false,
                                       		"stateMutability": "nonpayable",
                                       		"type": "function"
                                       	},
                                       	{
                                       		"constant": false,
                                       		"inputs": [
                                       			{
                                       				"name": "user",
                                       				"type": "address"
                                       			}
                                       		],
                                       		"name": "fetchSize",
                                       		"outputs": [
                                       			{
                                       				"name": "",
                                       				"type": "uint16"
                                       			}
                                       		],
                                       		"payable": false,
                                       		"stateMutability": "nonpayable",
                                       		"type": "function"
                                       	},
                                       	{
                                       		"constant": true,
                                       		"inputs": [
                                       			{
                                       				"name": "",
                                       				"type": "address"
                                       			},
                                       			{
                                       				"name": "",
                                       				"type": "uint16"
                                       			}
                                       		],
                                       		"name": "messages",
                                       		"outputs": [
                                       			{
                                       				"name": "",
                                       				"type": "string"
                                       			}
                                       		],
                                       		"payable": false,
                                       		"stateMutability": "view",
                                       		"type": "function"
                                       	},
                                       	{
                                       		"constant": true,
                                       		"inputs": [
                                       			{
                                       				"name": "",
                                       				"type": "address"
                                       			}
                                       		],
                                       		"name": "sizes",
                                       		"outputs": [
                                       			{
                                       				"name": "",
                                       				"type": "uint16"
                                       			}
                                       		],
                                       		"payable": false,
                                       		"stateMutability": "view",
                                       		"type": "function"
                                       	}
                                       ], "0x13ffaf162331fb3ebea1835f878d88db363ea040");
// QuerySubmittedList
function querySubmittedList(){
  console.log("querySubmittedList");
  let mockData = [{
    type: "Deposit",
    validator: "ICBC",
    value: "200,000",
    expire: "30 days"
  },
  {
    type: "Nationality",
    validator: "Police Station",
    value: "中国",
    expire: "10 years"
  },
  {
    type: "Risk assessment",
    validator: "ICBC",
    value: "B+",
    expire: "1year"
  },
  {
    type: "Year income",
    validator: "ICBC",
    value: "300,000"
  }
]
console.log(mockData);
  return mockData;
}

function queryRespondedList(){
  let mockData = [
  {
    propertyName: 'depsit',
    value: 170000
  },{
    propertyName: 'nationality',
    value: 'CHN'
  },0,{
    propertyName: 'yearIncome',
    value: 70000
  }]
  return
}


// User to submit Oracle request on Chain
function submitOracleRequest(oracleProvider, prop){

}

// User to query Oracle response on Chain
function queryOracleRespond(oracleProvider, prop){

}

// Query Provider's Rules on the Chain
function getCybexRules(){
  return [
    {
      propertyName: 'depsit',
      op: '>',
      value: 150000
    },{
      propertyName: 'nationality',
      op: 'in',
      value: ["CHN", "JPN", "USA"]
    },{
      propertyName: 'riskAssessment',
      op: '>',
      value: 3
    },{
      propertyName: 'yearIncome',
      op: '>',
      value: 60000
    }
  ]
}
export default {
  querySubmittedList, submitOracleRequest, queryOracleRespond, getCybexRules, fetchMessages
}
