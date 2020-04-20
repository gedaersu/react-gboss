/*登录注册*/
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, WingBlank, List, Radio, InputItem, Button} from 'antd-mobile'
import {register} from '../../redux/actions'
import {Redirect} from 'react-router'


import Logo from "../../components/logo/logo";

const RadioItem = Radio.RadioItem

class Register extends Component {

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

  goLogin = () => {
    this.props.history.replace('/login')
  }

  handleRegister = () => {
    //调用action中的register
    this.props.register(this.state)
  }

  // failToast = () => {
  //   Toast.fail('用户名已存在', 1);
  // }

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
          {/*{msg ? this.failToast() : null}*/}
          {msg ? <p className='error-msg'>{msg}</p> : null}
          <List>
            <InputItem onChange={(val) => this.handleChange('name', val)}>用&nbsp;&nbsp;户&nbsp;名：</InputItem>
            <InputItem type="password" onChange={(val) => this.handleChange('pwd', val)}>输入密码：</InputItem>
            <InputItem type="password" onChange={(val) => this.handleChange('pwd2', val)}>确认密码：</InputItem>
            <RadioItem checked={this.state.type === 'genius'} onClick={() => {
              this.handleChange('type', 'genius')
            }}>牛人</RadioItem>
            <RadioItem checked={this.state.type === 'boss'} onClick={() => {
              this.handleChange('type', 'boss')
            }}>BOSS</RadioItem>
            <Button type="primary" onClick={this.handleRegister}>注册</Button>
            <Button onClick={this.goLogin}>已有账户</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {register}
)(Register)
