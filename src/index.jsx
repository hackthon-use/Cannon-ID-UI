import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';
import Web3 from "web3";


import App from './components/App';
import Stage1 from './components/Stage1';
import Stage2 from './components/Stage2';
import Stage3 from './components/Stage3';
import W3Service from './services/bank/web3Services';

import './index.less';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: ""
    };
  }
  componentDidMount(){
  var web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/nRUCOskjng2tooOxkAlU"));

    W3Service.request(web3.utils.fromAscii("123"), "0xea487d63037bd9257be46548eab3696651adb7cc", "deposite", web3.utils.fromAscii("random"), web3.utils.fromAscii("23223")).then(function() {console.log("finish");});
  }
  render() {
    return (
      <div className="body">
        <h1>Stages list {this.state.validProps}</h1>
        <ul role="nav">
          <li><Link to="/s1">ListView + Carousel</Link></li>
          <li><Link to="/s2">Tabs + ...</Link></li>
          <li><Link to="/s3">Form + ...</Link></li>
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="s1" component={Stage1} />
      <Route path="s2" component={Stage2} />
      <Route path="s3" component={Stage3} />
    </Route>
  </Router>
, document.getElementById('example'));

// ReactDOM.render(
//   <div className="body">
//     <h1>Stages list</h1>
//     <ul role="nav">
//       <li><h3>ListView + Carousel</h3></li>
//       <li><h3>Tabs + ...</h3></li>
//       <li><h3>Form + ...</h3></li>
//     </ul>
//     <App><Stage3 /></App>
//   </div>
// , document.getElementById('example'));
