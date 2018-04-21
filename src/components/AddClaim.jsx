import React from 'react';

import { Flex,Badge } from 'antd-mobile';
import {  Link } from 'react-router';

import './AddClaim.less';

let pageIndex = 0;

export default class AddClaim extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.changeTitle('Chose Claim Property');
  }
  choseClaimType(type){
    console.log(type);
  }
  render() {
    let dateSource = [{type:"Depsit", validator_count:"4"},{type:"Nationality", validator_count:"3"},{type:"RiskAssessment", validator_count:"6"},{type:"Income", validator_count:"3"}];
    return (
      <Flex direction="column" className="validContent">
        {dateSource && dateSource.map((i,index) => {
          const { type, validator_count } = i;
          return (
            <Flex className="claimTypeItem" onClick={()=>this.choseClaimType(type)} key={`holding${index}`}>
              <Link to={`${type}View`}><Flex.Item className="typeName">{type}</Flex.Item></Link>
              <Link to={`${type}View`}><Flex.Item><Badge className="badgeStyle" style={{backgroundColor: "#54bbce"}} text={validator_count} /></Flex.Item></Link>
            </Flex>
          );
        })}
    </Flex>
    );
  }
}
