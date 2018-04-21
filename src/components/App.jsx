import React from 'react';
import { hashHistory } from 'react-router';
import { NavBar, Drawer } from 'antd-mobile';

import './App.less';

// not use `babel-plugin-import`
// import 'antd-mobile/dist/antd-mobile.css';
// import NavBar from 'antd-mobile/lib/nav-bar';
// import 'antd-mobile/lib/nav-bar/style/css';
// import Drawer from 'antd-mobile/lib/drawer';
// import 'antd-mobile/lib/drawer/style/css';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: 'app',
      open: false,
    };
  }
  render() {
    // console.log(this.props.route, this.props.params, this.props.routeParams);
    return (
      <div className="container">
        <NavBar className="navBar" mode="light"
          onLeftClick={() => hashHistory.goBack()}
        >
          {this.state.title}
        </NavBar>

        <div style={{ position: 'relative' }}>
            {this.props && this.props.children && React.cloneElement(this.props.children, {
              changeTitle: title => this.setState({ title })
            }) || 'no content'}
        </div>

        {/*<div className="fixed-bottom">底部固定条</div>*/}
      </div>
    );
  }
}
