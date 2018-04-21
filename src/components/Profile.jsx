import React from 'react';
import Web3 from "web3";
import { Flex, Modal, Icon, WingBlank, Toast } from 'antd-mobile';
import {  Link } from 'react-router';

import W3Service from '../services/user/web3Services';
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
  var web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/nRUCOskjng2tooOxkAlU"));

      W3Service.request(web3.utils.fromAscii("123"), "0xea487d63037bd9257be46548eab3696651adb7cc", "deposite", web3.utils.fromAscii("random"), web3.utils.fromAscii("23223"));

    this.props.changeTitle('Cannon ID');
    let submittedList = W3Service.querySubmittedList();
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
