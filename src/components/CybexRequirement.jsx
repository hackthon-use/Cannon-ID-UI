import React from 'react';

import { Flex ,Icon, Badge, Button} from 'antd-mobile';
import {  Link } from 'react-router';
import cybexlogo from '../images/cybexlogo.png';

import "./CybexRequirement.less";

let pageIndex = 0;

export default class CybexRequirement extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.changeTitle('Cybex KYC Compliance');
  }
  choseValidator(type){
    console.log(type);
  }
  render() {
    let dateSource = [{validator: "ICBC"},{validator: "BOC"},{validator: "CMB"},{validator: "HSBC"}];
    return (
      <div>
        <div className="logo">
          <img className="logoImg" src={cybexlogo} />
          <div className="header">
            <span className="leftSide">Rules</span>
            <span className="rightSide">Status</span>
          </div>
          <div className="content">
            <div className="item">
              <div className="leftSide">*<Badge style={{backgroundColor: "#54bbce"}} text={1}/><span className="label">Nationality: </span><span>CHINA, JAPAN</span></div>
              <Icon className="rightSide" type="check" />
              <div style={{clear:'both'}} />
            </div>
            <div className="item">
              <div className="leftSide">*<Badge style={{backgroundColor: "#54bbce"}} text={2}/><span className="label">Risk Assessment: </span><span>3+</span></div>
              <Icon className="rightSide" type="check" />
              <div style={{clear:'both'}} />
            </div>
            <div className="item">
              <div className="leftSide">*<Badge style={{backgroundColor: "#54bbce"}} text={3}/><span className="label">1&2 below select either: </span></div>
              <div style={{clear:'both'}} />
            </div>
              <div className="item"><div className="leftSide subItem">1. Annual income: >$100,000</div>  <Icon className="rightSide" type="check" /></div>
              <div className="item"><div className="leftSide subItem">2. Deposit: >$200,000 </div> <Icon className="rightSide" type="check" /></div>
          </div>
        </div>
        <div className="submitWrap"><Button type="primary">Submit</Button></div>
      </div>
    );
  }
}
