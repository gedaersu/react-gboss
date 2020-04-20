/*应用主面板*/
import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import cookies from 'browser-cookies'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'

import BossInfo from '../boss-info/boss-info'
import GeniusInfo from '../genius-info/genius-info'
import Genius from '../genius/genius'
import Boss from '../boss/boss'
import Msg from '../msg/msg'
import User from '../user/user'
import NotFound from '../not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import {getUser} from '../../redux/actions'
import {getPath} from '../../utils/index'

class Dashboard extends Component {

  componentDidMount() {
    const userid = cookies.get('userid')
    const {user} = this.props
    if (userid && !user._id) {
      this.props.getUser()
    }
  }

  navList = [
    {
      path: '/boss',
      component: Boss,
      title: '牛人列表',
      icon: 'genius',
      text: '牛人',
    },
    {
      path: '/genius',
      component: Genius,
      title: 'BOSS列表',
      icon: 'boss',
      text: '老板',
    },
    {
      path: '/msg',
      component: Msg,
      title: '消息列表',
      icon: 'msg',
      text: '消息',
    },
    {
      path: '/user',
      component: User,
      title: '用户中心',
      icon: 'user',
      text: '个人',
    }
  ]

  render() {
    //判断是否登录过(cookies中的userid是否有值)
    const pathname = this.props.location.pathname
    const userid = cookies.get('userid')
    if (!userid) {
      return <Redirect to='/login'/>
    }
    //cookie中是否有userid
    //redux中user是否有数据
    const {user} = this.props
    if (!user._id) {
      return null
    } else {
      const pathname = this.props.location.pathname
      if (pathname === '/') {
        const path = getPath(user.type, user.avatar)
        return <Redirect to={path}/>
        //指定那个nav被隐藏
        if (user.type === 'boss') {
          this.navList[1].hide = true
        } else {
          this.navList[0].hide = true
        }
      }
    }

    // 得到当前的 nav
    const currentNav = this.navList.find(nav => nav.path === pathname)

    return (
      <div>
        {currentNav ? <NavBar className='stick-top'>{currentNav.title}</NavBar> : null}
        <Switch>
          <Route path='/bossinfo' component={BossInfo}/>
          <Route path='/geniusinfo' component={GeniusInfo}/>
          <Route path='/genius' component={Genius}/>
          <Route path='/boss' component={Boss}/>
          <Route path='/msg' component={Msg}/>
          <Route path='/user' component={User}/>
          <Route component={NotFound}/>
        </Switch>
        {currentNav ? <NavFooter unReadCount={this.props.unReadCount} navList={this.navList}/> : null}
      </div>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {getUser}
)(Dashboard)
