import React from 'react';

import { Icon, Card,WingBlank,WhiteSpace,Button} from 'antd-mobile';
import {  Link } from 'react-router';
import icbclogo from '../images/icbc_416x416.jpg';

import "./BankRequestList.less";

let pageIndex = 0;

export default class BankRequestList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.changeTitle('ICBC Request List');
  }
  render() {
    let dateSource = [{property:"Despite", name:"Ricky", hash:"0x2ksd", value:"$5,823,323"},{property:"Despite", name:"Joey", hash:"0x2923", value:"$1,823,323"}];
    return (
      <div>
        <div className="logo">
        <img className="logoImg" src={icbclogo} />
        </div>
        {dateSource && dateSource.map((i,index) => {
          const { property, name,hash,value } = i;
          return (
            <div>
              <WhiteSpace size='md' />
              <WingBlank>
              <Card className="cardItem">
                <Card.Header
                  title={`${property} Verification`}
                  extra={<span>{name}({hash})</span>}
                />
                <Card.Body>
                  <div> Deposit: {value}</div>
                </Card.Body>
                <Card.Footer content={<Button size="small" type="warning">Refuse</Button>} extra={<Button size="small" type="primary"> Sign</Button>} />
              </Card>
              </WingBlank>
            </div>
          );
        })}
      </div>
    );
  }
}
