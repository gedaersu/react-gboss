/*应用主面板*/
import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import cookies from 'browser-cookies'
import {connect} from 'react-redux'

import BossInfo from '../boss-info/boss-info'
import GeniusInfo from '../genius-info/genius-info'
import Genius from '../genius/genius'
import Boss from '../boss/boss'
import Msg from '../msg/msg'
import User from '../user/user'
import NotFound from '../not-found/not-found'
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

  render() {
    //判断是否登录过(cookies中的userid是否有值)
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
      }
    }

    return (
      <div>
        {/*<p>{this.props.user.type}</p>*/}
        <Switch>
          <Route path='/bossinfo' component={BossInfo}/>
          <Route path='/geniusinfo' component={GeniusInfo}/>
          <Route path='/genius' component={Genius}/>
          <Route path='/boss' component={Boss}/>
          <Route path='/msg' component={Msg}/>
          <Route path='/user' component={User}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {getUser}
)(Dashboard)
