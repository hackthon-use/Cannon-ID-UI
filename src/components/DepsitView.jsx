import React from 'react';

import { Flex } from 'antd-mobile';
import {  Link } from 'react-router';

let pageIndex = 0;

export default class DepsitView extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.changeTitle('Chose Depsit Validator');
  }
  choseValidator(type){
    console.log(type);
  }
  render() {
    let dateSource = [{validator: "ICBC"},{validator: "BOC"},{validator: "CMB"},{validator: "HSBC"}];
    return (
      <Flex direction="column" className="validContent">
        {dateSource && dateSource.map((i,index) => {
          const { validator } = i;
          return (
            <Flex className="claimTypeItem" onClick={()=>this.choseValidator(validator)} key={`holding${index}`}>
              <Link to={`${validator}Valid`}><Flex.Item className="typeName">{validator}</Flex.Item></Link>
            </Flex>
          );
        })}
    </Flex>
    );
  }
}
