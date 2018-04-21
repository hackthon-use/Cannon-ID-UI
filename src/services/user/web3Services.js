import Web3 from "web3";
import config from './config';

console.log("start web instance")
var web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/nRUCOskjng2tooOxkAlU"));

var BigNumber = require('bignumber.js');
var Tx = require('ethereumjs-tx');
var ethUtil = require('ethereumjs-util');

/// 0xc080aadaafd7d1f8563ca54af18751fed76456dd
var privateKey = new Buffer(config.privateKey, 'hex');
var pubKey = ethUtil.privateToPublic(privateKey).toString('hex');
console.log(pubKey);
var account = web3.eth.accounts.privateKeyToAccount(privateKey);
console.log(account);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = web3.eth.accounts[0];

var address='0x'+ethUtil.privateToAddress(privateKey).toString('hex');
console.log("address",address);
//console.log("balance:",web3.eth.getBalance(address).toString());
//var ethWeiValue=parseInt(web3.utils.toWei( 0.01,'ether'), 10)
//console.log(ethWeiValue);
var contractAddress = "0x225f6f971a80bb03e8d16500da7da2c471628d0b";

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


function getRuleList() {
    return new Promise(function(resolve, reject) {
        myContract.methods.getRuleIds().call(function(error, result) {
            var promises = [];
            for (var i=0; i<result.length; i++) {
                var id = result[i];
                promises.push(myContract.methods.getRule(id).call());
            }
            Promise.all(promises).then(function(arr){
                var rules = [];
                for (var i=0; i<result.length; i++) {
                    var obj = {};
                    obj.id = arr[i][0];
                    obj.property = arr[i][1];
                    obj.op = arr[i][2];
                    obj.value = arr[i][3];
                    rules.push(obj);
                }
                resolve(rules);
            });
        });
    });
}

// bytes32 requestId, address oracle, string property, bytes32 pubKey, bytes32 platformId
function request(requestId, oracle, property, pubKey, platformId) {
    return new Promise (function(resolve, reject) {
        myContract.methods.request(requestId, oracle, property, pubKey, platformId).send({'from':address}).on('receipt', function(receipt){
            resolve();
        }).on("error", console.error);
    });
}

/*function request(requestId, oracle, property, pubKey, platformId) {

        var transfer = myContract.methods.request(requestId, oracle, property, pubKey, platformId);

          var encodedABI = transfer.encodeABI();

          var tx = {
            from: address,
            to: contractAddress,
            gas: 2000000,
            data: encodedABI
          };
console.log("99999");
          web3.eth.accounts.signTransaction(tx, privateKey).then(signed => {
            var tran = web3.eth.sendSignedTransaction(signed.rawTransaction);

            tran.on('confirmation', (confirmationNumber, receipt) => {
              console.log('confirmation: ' + confirmationNumber);
            });

            tran.on('transactionHash', hash => {
              console.log('hash');
              console.log(hash);
            });

            tran.on('receipt', receipt => {
              console.log('reciept');
              console.log(receipt);
              resolve();
            });

            tran.on('error', console.error);
          });

    }*/


// bytes32 responseId, bytes32 requestId, bytes32 hash, string property, string encrypedValue, uint256 expired
function oracleCommit(responseId, requestId, hash, property, encrypedValue, expired){
    return new Promise (function(resolve, reject) {
            myContract.methods.oracleCommit(responseId, requestId, hash, property, encrypedValue, expired).send({'from':address}).on('receipt', function(receipt){
                resolve(receipt);
            });
        });
}


// r.requestId, r.requester, r.property, r.pubKey, r.platformId, r.expired
function getAllRequests() {
    return new Promise(function(resolve, reject) {
        myContract.methods.getRequestIds().call({'from':address},function(error, result) {
            var promises = [];
            for (var i=0; i<result.length; i++) {
                var id = result[i];
                promises.push(myContract.methods.getRequest(id).call({'from':address}));
            }
            Promise.all(promises).then(function(arr){
                var requests = [];
                for (var i=0; i<result.length; i++) {
                    var obj = {};
                    obj.requestId = arr[i][0];
                    obj.requester = arr[i][1];
                    obj.property = arr[i][2];
                    obj.pubKey = arr[i][3];
                    obj.platformId = arr[i][4];
                    obj.expired = arr[i][5];
                    requests.push(obj);
                }
                resolve(requests);
            });
        });
    });
}

//r.responseId, r.requestId, r.hash, r.property, r.encrypedValue, r.expired
function getAllResponses() {
    return new Promise(function(resolve, reject) {
            myContract.methods.getResponseIds().call({'from':address},function(error, result) {
                var promises = [];
                for (var i=0; i<result.length; i++) {
                    var id = result[i];
                    promises.push(myContract.methods.getResponse(id).call({'from':address}));
                }
                Promise.all(promises).then(function(arr){
                    var responses = [];
                    for (var i=0; i<result.length; i++) {
                        var obj = {};
                        obj.responseId = arr[i][0];
                        obj.requestId = arr[i][1];
                        obj.hash = arr[i][2];
                        obj.property = arr[i][3];
                        obj.encrypedValue = arr[i][4];
                        obj.expired = arr[i][5];
                        responses.push(obj);
                    }
                    resolve(responses);
                });
            });
        });
}







var myContract = new web3.eth.Contract([
                                   	{
                                   		"constant": false,
                                   		"inputs": [
                                   			{
                                   				"name": "responseId",
                                   				"type": "bytes32"
                                   			},
                                   			{
                                   				"name": "requestId",
                                   				"type": "bytes32"
                                   			},
                                   			{
                                   				"name": "hash",
                                   				"type": "bytes32"
                                   			},
                                   			{
                                   				"name": "property",
                                   				"type": "string"
                                   			},
                                   			{
                                   				"name": "encrypedValue",
                                   				"type": "string"
                                   			},
                                   			{
                                   				"name": "expired",
                                   				"type": "uint256"
                                   			}
                                   		],
                                   		"name": "oracleCommit",
                                   		"outputs": [],
                                   		"payable": false,
                                   		"stateMutability": "nonpayable",
                                   		"type": "function"
                                   	},
                                   	{
                                   		"constant": false,
                                   		"inputs": [
                                   			{
                                   				"name": "_address",
                                   				"type": "address"
                                   			},
                                   			{
                                   				"name": "_name",
                                   				"type": "string"
                                   			}
                                   		],
                                   		"name": "registerOracle",
                                   		"outputs": [
                                   			{
                                   				"name": "",
                                   				"type": "bool"
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
                                   				"name": "_ruleId",
                                   				"type": "bytes32"
                                   			},
                                   			{
                                   				"name": "_property",
                                   				"type": "string"
                                   			},
                                   			{
                                   				"name": "_op",
                                   				"type": "string"
                                   			},
                                   			{
                                   				"name": "_value",
                                   				"type": "string"
                                   			}
                                   		],
                                   		"name": "registerRule",
                                   		"outputs": [
                                   			{
                                   				"name": "",
                                   				"type": "bool"
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
                                   				"name": "requestId",
                                   				"type": "bytes32"
                                   			},
                                   			{
                                   				"name": "oracle",
                                   				"type": "address"
                                   			},
                                   			{
                                   				"name": "property",
                                   				"type": "string"
                                   			},
                                   			{
                                   				"name": "pubKey",
                                   				"type": "bytes32"
                                   			},
                                   			{
                                   				"name": "platformId",
                                   				"type": "bytes32"
                                   			}
                                   		],
                                   		"name": "request",
                                   		"outputs": [],
                                   		"payable": false,
                                   		"stateMutability": "nonpayable",
                                   		"type": "function"
                                   	},
                                   	{
                                   		"constant": false,
                                   		"inputs": [
                                   			{
                                   				"name": "id",
                                   				"type": "bytes32"
                                   			},
                                   			{
                                   				"name": "client",
                                   				"type": "address"
                                   			},
                                   			{
                                   				"name": "clientName",
                                   				"type": "string"
                                   			},
                                   			{
                                   				"name": "ruleIds",
                                   				"type": "bytes32[]"
                                   			}
                                   		],
                                   		"name": "submitRequirements",
                                   		"outputs": [],
                                   		"payable": false,
                                   		"stateMutability": "nonpayable",
                                   		"type": "function"
                                   	},
                                   	{
                                   		"constant": false,
                                   		"inputs": [
                                   			{
                                   				"name": "id",
                                   				"type": "bytes32"
                                   			},
                                   			{
                                   				"name": "user",
                                   				"type": "address"
                                   			},
                                   			{
                                   				"name": "validator",
                                   				"type": "address"
                                   			},
                                   			{
                                   				"name": "logic",
                                   				"type": "string"
                                   			},
                                   			{
                                   				"name": "requestId",
                                   				"type": "bytes32[]"
                                   			},
                                   			{
                                   				"name": "expired",
                                   				"type": "uint256[]"
                                   			},
                                   			{
                                   				"name": "hash",
                                   				"type": "bytes32[]"
                                   			},
                                   			{
                                   				"name": "properties",
                                   				"type": "string"
                                   			},
                                   			{
                                   				"name": "ops",
                                   				"type": "string"
                                   			},
                                   			{
                                   				"name": "values",
                                   				"type": "string"
                                   			}
                                   		],
                                   		"name": "submitValidation",
                                   		"outputs": [],
                                   		"payable": false,
                                   		"stateMutability": "nonpayable",
                                   		"type": "function"
                                   	},
                                   	{
                                   		"inputs": [],
                                   		"payable": false,
                                   		"stateMutability": "nonpayable",
                                   		"type": "constructor"
                                   	},
                                   	{
                                   		"constant": true,
                                   		"inputs": [],
                                   		"name": "getOracleList",
                                   		"outputs": [
                                   			{
                                   				"name": "",
                                   				"type": "address[]"
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
                                   				"name": "_id",
                                   				"type": "address"
                                   			}
                                   		],
                                   		"name": "getOracleName",
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
                                   				"name": "_id",
                                   				"type": "bytes32"
                                   			}
                                   		],
                                   		"name": "getRequest",
                                   		"outputs": [
                                   			{
                                   				"name": "requestId",
                                   				"type": "bytes32"
                                   			},
                                   			{
                                   				"name": "requester",
                                   				"type": "address"
                                   			},
                                   			{
                                   				"name": "property",
                                   				"type": "string"
                                   			},
                                   			{
                                   				"name": "pubKey",
                                   				"type": "bytes32"
                                   			},
                                   			{
                                   				"name": "platformId",
                                   				"type": "bytes32"
                                   			},
                                   			{
                                   				"name": "expired",
                                   				"type": "bool"
                                   			}
                                   		],
                                   		"payable": false,
                                   		"stateMutability": "view",
                                   		"type": "function"
                                   	},
                                   	{
                                   		"constant": true,
                                   		"inputs": [],
                                   		"name": "getRequestIds",
                                   		"outputs": [
                                   			{
                                   				"name": "",
                                   				"type": "bytes32[]"
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
                                   				"name": "id",
                                   				"type": "bytes32"
                                   			}
                                   		],
                                   		"name": "getRequirement",
                                   		"outputs": [
                                   			{
                                   				"name": "client",
                                   				"type": "address"
                                   			},
                                   			{
                                   				"name": "clientName",
                                   				"type": "string"
                                   			},
                                   			{
                                   				"name": "ruleIds",
                                   				"type": "bytes32[]"
                                   			}
                                   		],
                                   		"payable": false,
                                   		"stateMutability": "view",
                                   		"type": "function"
                                   	},
                                   	{
                                   		"constant": true,
                                   		"inputs": [],
                                   		"name": "getRequirementIds",
                                   		"outputs": [
                                   			{
                                   				"name": "",
                                   				"type": "bytes32[]"
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
                                   				"name": "_id",
                                   				"type": "bytes32"
                                   			}
                                   		],
                                   		"name": "getResponse",
                                   		"outputs": [
                                   			{
                                   				"name": "responseId",
                                   				"type": "bytes32"
                                   			},
                                   			{
                                   				"name": "requestId",
                                   				"type": "bytes32"
                                   			},
                                   			{
                                   				"name": "hash",
                                   				"type": "bytes32"
                                   			},
                                   			{
                                   				"name": "property",
                                   				"type": "string"
                                   			},
                                   			{
                                   				"name": "encrypedValue",
                                   				"type": "string"
                                   			},
                                   			{
                                   				"name": "expired",
                                   				"type": "uint256"
                                   			}
                                   		],
                                   		"payable": false,
                                   		"stateMutability": "view",
                                   		"type": "function"
                                   	},
                                   	{
                                   		"constant": true,
                                   		"inputs": [],
                                   		"name": "getResponseIds",
                                   		"outputs": [
                                   			{
                                   				"name": "",
                                   				"type": "bytes32[]"
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
                                   				"name": "_id",
                                   				"type": "bytes32"
                                   			}
                                   		],
                                   		"name": "getRule",
                                   		"outputs": [
                                   			{
                                   				"name": "id",
                                   				"type": "bytes32"
                                   			},
                                   			{
                                   				"name": "property",
                                   				"type": "string"
                                   			},
                                   			{
                                   				"name": "op",
                                   				"type": "string"
                                   			},
                                   			{
                                   				"name": "value",
                                   				"type": "string"
                                   			}
                                   		],
                                   		"payable": false,
                                   		"stateMutability": "view",
                                   		"type": "function"
                                   	},
                                   	{
                                   		"constant": true,
                                   		"inputs": [],
                                   		"name": "getRuleIds",
                                   		"outputs": [
                                   			{
                                   				"name": "",
                                   				"type": "bytes32[]"
                                   			}
                                   		],
                                   		"payable": false,
                                   		"stateMutability": "view",
                                   		"type": "function"
                                   	},
                                   	{
                                   		"constant": true,
                                   		"inputs": [],
                                   		"name": "getValidationIds",
                                   		"outputs": [
                                   			{
                                   				"name": "",
                                   				"type": "bytes32[]"
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
                                   				"name": "_id",
                                   				"type": "bytes32"
                                   			}
                                   		],
                                   		"name": "getValidationPart1",
                                   		"outputs": [
                                   			{
                                   				"name": "",
                                   				"type": "bytes32"
                                   			},
                                   			{
                                   				"name": "",
                                   				"type": "address"
                                   			},
                                   			{
                                   				"name": "",
                                   				"type": "address"
                                   			},
                                   			{
                                   				"name": "",
                                   				"type": "string"
                                   			},
                                   			{
                                   				"name": "",
                                   				"type": "bytes32[]"
                                   			},
                                   			{
                                   				"name": "",
                                   				"type": "uint256[]"
                                   			},
                                   			{
                                   				"name": "",
                                   				"type": "bytes32[]"
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
                                   				"name": "_id",
                                   				"type": "bytes32"
                                   			}
                                   		],
                                   		"name": "getValidationPart2",
                                   		"outputs": [
                                   			{
                                   				"name": "",
                                   				"type": "string"
                                   			},
                                   			{
                                   				"name": "",
                                   				"type": "string"
                                   			},
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
                                   		"name": "oracles",
                                   		"outputs": [
                                   			{
                                   				"name": "id",
                                   				"type": "address"
                                   			},
                                   			{
                                   				"name": "name",
                                   				"type": "string"
                                   			}
                                   		],
                                   		"payable": false,
                                   		"stateMutability": "view",
                                   		"type": "function"
                                   	},
                                   	{
                                   		"constant": true,
                                   		"inputs": [],
                                   		"name": "owner",
                                   		"outputs": [
                                   			{
                                   				"name": "",
                                   				"type": "address"
                                   			}
                                   		],
                                   		"payable": false,
                                   		"stateMutability": "view",
                                   		"type": "function"
                                   	}
                                   ], "0x225f6f971a80bb03e8d16500da7da2c471628d0b");
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
  querySubmittedList, queryRespondedList, submitOracleRequest, queryOracleRespond, getCybexRules,getAllRequests, oracleCommit, getOracleList, getRuleList, request, getAllResponses
}
