import React from 'react'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import {connect} from 'react-redux'
import cookies from 'browser-cookies'

import {resetUser} from '../../redux/actions'
const Item = List.Item
const Brief = Item.Brief

class User extends React.Component {

  handleLoginout = () => {
    Modal.alert('注销','确认退出登陆吗',[
      {
        text:'取消'
        // onPress: () => console.log('cancel')
      },
      {
        text:'确认',
        onPress: () => {
          //清楚cookie中的userid
          cookies.erase('userid')
          //重置redux中的user状态
          this.props.resetUser()
        }
      }
    ])
  }

  render() {

    const {name, avatar, title, desc, money, company} = this.props.user

    return (
      <div style={{marginTop: 50}}>
        <Result img={<img src={require(`../../assets/imgs/${avatar}.png`)}
                          style={{width: 50}}
                          alt="avatar"/>}
                          title={name}
                          message={company}/>
        <List renderHeader={() => '相关信息'}>
          <Item multipleLine>
            <Brief>职位: {title}</Brief>
            <Brief>简介: {desc}</Brief>
            {money ? <Brief>薪资: {money}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace/>
        <List>
            <Button type='warning' onClick={this.handleLoginout}>退出登录</Button>
        </List>
      </div>)
  }
}

export default connect(
  state => ({user: state.user}),
  {resetUser}
)(User)
