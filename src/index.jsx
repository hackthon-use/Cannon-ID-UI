import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';
import Web3 from "web3";


import App from './components/App';
import W3Service from './services/bank/web3Services';
import Profile from './components/Profile';
import AddClaim from './components/AddClaim';
import DepsitView from './components/DepsitView';
import ICBCValid from './components/ICBCValid';
import CybexRequirement from './components/CybexRequirement';
import BankRequestList from './components/BankRequestList';

import './index.less';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: ""
    };
  }
  componentDidMount(){
  }
  render() {
    return (
      <div className="body">
        <h1>Stages list {this.state.validProps}</h1>
        <ul role="nav">
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Profile} />
      <Route path="profile" component={Profile} />
      <Route path="addClaim" component={AddClaim}/>
      <Route path="DepsitView" component={DepsitView}/>
      <Route path="ICBCValid" component={ICBCValid}/>
      <Route path="CybexRequirement" component={CybexRequirement}/>
      <Route path="bank" component={BankRequestList} />
    </Route>
  </Router>
, document.getElementById('example'));
