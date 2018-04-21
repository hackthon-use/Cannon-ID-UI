import React from 'react';

import { Flex, Modal, Icon, WingBlank, Toast } from 'antd-mobile';
import {  Link } from 'react-router';

import web3Service from '../services/user/web3Services';
import './Profile.less';
import headImg from '../images/icon02.png';
import addImg from '../images/icon03.png';

let pageIndex = 0;

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      isLoading: false,
    };
  }
  componentDidMount() {
    this.props.changeTitle('Cannon ID');
    let submittedList = web3Service.querySubmittedList();
    this.setState({
      data: submittedList
    })
    console.log(submittedList);
  }
  render() {
    console.log(this.state.data);
    let dateSource = this.state.data;
    let header = ["type", "validator", "value", "expire"];
    return (
      <Flex direction="column" className="profilesContent">
          <Flex className="topContainer" direction="row" >
            <Flex.Item><img className="imageSize" src={headImg} /></Flex.Item>
            <Flex.Item className="addIcon"><Link to="/addClaim"><img className="imageSize" src={addImg} /></Link></Flex.Item>
          </Flex>
          <Flex className="propsValue headerContent">
            <Flex.Item>Property</Flex.Item>
            <Flex.Item>Validator</Flex.Item>
            <Flex.Item>Value</Flex.Item>
            <Flex.Item>Expire</Flex.Item>
          </Flex>

        {dateSource && dateSource.map((i,index) => {
          const { type, validator, value, expire } = i;
          return (
            <Flex className="propsValue dataContent" key={`holding${index}`}>
              <Flex.Item>{type}</Flex.Item>
              <Flex.Item>{validator}</Flex.Item>
              <Flex.Item>{value}</Flex.Item>
              <Flex.Item>{expire}</Flex.Item>
            </Flex>
          );
        })}
    </Flex>
    );
  }
}
