/*登录注册*/
import React, {Component} from 'react'
import {NavBar,WingBlank,List,Radio,InputItem,Button} from 'antd-mobile'

import Logo from "../../components/logo/logo";

const RadioItem = Radio.RadioItem

export default class Register extends Component {

  state = {
    name: '',
    pwd: '',
    pwd2: '',
    type: 'boss'
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }

  gologin = () => {
    this.props.history.replace('/login')
  }

  handleRegister = () => {
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
            <InputItem type="password" onChange={(val) => this.handleChange('pwd2',val)}>确认密码：</InputItem>
            <RadioItem checked={this.state.type === 'genius'} onClick={() => {this.handleChange('type','genius')}}>牛人</RadioItem>
            <RadioItem checked={this.state.type === 'boss'} onClick={() => {this.handleChange('type','boss')}}>BOSS</RadioItem>
            <Button type="primary" onClick={this.handleRegister}>注册</Button>
            <Button onClick={this.gologin}>已有账户</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}
