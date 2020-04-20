/*牛人完善*/
import React, {Component} from 'react'
import {Button, NavBar, InputItem, TextareaItem} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import AvatarSelector from '../../components/avatar-selector/avatar-selector'
import {userUpdate} from '../../redux/actions'

class GeniusInfo extends Component {

  state = {
    avatar:'',
    title:'',
    desc:''
  }

  handleChange =(name, val) => {
    this.setState({[name]: val})
  }

  setAvatar = (avatar) => {
    this.setState({avatar})
  }

  render() {

    const {user} = this.props
    if (user.avatar) {
      return <Redirect to='/genius'/>
    }

    return (
      <div>
        <NavBar>牛人信息完善</NavBar>
        <AvatarSelector setAvatar={this.setAvatar}/>
        <InputItem onChange={val => this.handleChange('title', val)}>求职岗位：</InputItem>
        <TextareaItem title='个人介绍'
                      rows={3}
                      onChange={val => this.handleChange('desc', val)}/>
        <Button type='primary' onClick={() => this.props.userUpdate(this.state)}>保存</Button>
      </div>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {userUpdate}
)(GeniusInfo)
