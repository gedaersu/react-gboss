/*登录*/
import React, {Component} from 'react'
import {NavBar,WingBlank,List,InputItem,Button} from 'antd-mobile'

import Logo from "../../components/logo/logo";



export default class Register extends Component {

  state = {
    name: '',
    pwd: '',
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }

  goRegister = () => {
    this.props.history.replace('/register')
  }

  handleLogin = () => {
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <NavBar>苏 总 直 聘</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            <InputItem onChange={(val) => this.handleChange('name',val)}>用&nbsp;&nbsp;户&nbsp;名：</InputItem>
            <InputItem type="password" onChange={(val) => this.handleChange('pwd',val)}>输入密码：</InputItem>
            <Button type="primary" onClick={this.handleLogin}>登录</Button>
            <Button onClick={this.goRegister}>注册账户</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}

