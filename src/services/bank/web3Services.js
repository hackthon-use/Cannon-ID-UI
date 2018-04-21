import web3 from "web3";
import config from './config';

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/nRUCOskjng2tooOxkAlU"));
}

// GetPendingRequestId
function _getPendingRequestId() {
  return ["xxxxx","bbbbb","ccccc"];
}

// getAllRequests
function getAllRequests(requestId) {

}

// Bank Commit Response to Chain
function oracleCommit(responseId, requestId, hash, property, encrypedValue){

}


export default {
  getAllRequests, oracleCommit
}
