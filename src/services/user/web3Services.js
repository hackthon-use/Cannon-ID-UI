import web3 from "web3";
import config from './config';

console.log("start web instance")
var web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/nRUCOskjng2tooOxkAlU"));

// QuerySubmittedList
function querySubmittedList(){
  console.log("querySubmittedList");
  let mockData = [{
    type: "Deposit",
    validator: "ICBC",
    value: "200,000",
    expire: "2019.12.31"
  },
  {
    type: "Nationality",
    validator: "Police Station",
    value: "CHN",
    expire: "2020.12.1"
  },
  {
    type: "Risk assessment",
    validator: "ICBC",
    value: "4",
    expire: "2019.4.1"
  },
  {
    type: "Year income",
    validator: "ICBC",
    value: "300,000",
    expire: "2019.4.22"
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
  querySubmittedList, queryRespondedList, submitOracleRequest, queryOracleRespond, getCybexRules
}
