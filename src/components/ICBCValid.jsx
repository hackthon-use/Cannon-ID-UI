import React from 'react';

import { Flex, Button} from 'antd-mobile';
import {  Link } from 'react-router';
import './ICBCValid.less';

let pageIndex = 0;

export default class ICBCValid extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.changeTitle('ICBC Depsit Claim');
  }
  choseValidator(type){
    console.log(type);
  }
  render() {
    return (
      <div>
        <div className="validatorName">ICBC</div>
        <div className="description">
          Please make sure you have 200,000 USD in ICBC account.
        </div>
        <div className="applyWrap">
          <Button type="primary" inline>Apply</Button>
        </div>
      </div>
    );
  }
}
