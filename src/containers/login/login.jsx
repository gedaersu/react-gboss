/*登录*/
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, WingBlank, List, InputItem, Button} from 'antd-mobile'
import {Redirect} from 'react-router'

import {relogin} from '../../redux/actions'

import Logo from "../../components/logo/logo";


class Relogin extends Component {

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
    this.props.relogin(this.state)
  }

  render() {
    const {redirectTo, msg} = this.props.user
    if (redirectTo) {
      return <Redirect to={redirectTo}/>
    }
    return (
      <div>
        <NavBar>苏 总 直 聘</NavBar>
        <Logo/>
        <WingBlank>
          {msg ? <p className='error-msg'>{msg}</p> : null}
          <List>
            <InputItem onChange={(val) => this.handleChange('name', val)}>用&nbsp;&nbsp;户&nbsp;名：</InputItem>
            <InputItem type="password" onChange={(val) => this.handleChange('pwd', val)}>输入密码：</InputItem>
            <Button type="primary" onClick={this.handleLogin}>登录</Button>
            <Button onClick={this.goRegister}>注册账户</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {relogin}
)(Relogin)

