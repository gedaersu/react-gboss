import {Button} from 'antd-mobile'
import '../../assets/css/index.less'

import React, {Component} from 'react'
export default class NotFound extends Component {
  render() {
    return (
      <div>
        <h2 className='text-404'>抱歉，找不到该页面</h2>
        <img src={require(`./img/404.png`)} className='img-404' alt="404"/>
        <Button type='primary' onClick={() => this.props.history.replace('/')}>返回首页</Button>
      </div>
    );
  }
}
