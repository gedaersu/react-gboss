/*
对话聊天的路由组件
*/
import React, {Component} from 'react'
import {NavBar, List, InputItem, Icon, Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import QueueAnim from 'rc-queue-anim'

import {sendMsg, readMsg} from '../../redux/actions'

const Item = List.Item
class Chat extends Component {

  state = {
    content:'',
    isShow: false
  }

  componentWillMount () {
    const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂',
      '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '😘', '😋', '😛', '😙',
      '😝', '🙄', '😪', '🤢', '🥶', '😰', '😥', '😭', '😓', '😡', '👌',
      '🙏', '💪', '😎', '😄', '😁', '😆', '😅', '🤣', '😂', '😄', '😁',
      '😆', '😅', '🤣', '😂', '😄', '😁', '😆', '😅', '🤣', '😂']
    this.emojis = emojis.map(value => ({text: value}))
    // console.log(this.emojis)
  }

  changeShow = () => {
    const isShow = !this.state.isShow
    this.setState({isShow})
    if (isShow) {
      // 异步手动派发 resize 事件,解决表情列表显示的 bug
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    }
  }

  msgChange = (content) => {
    this.setState({content})
  }

  componentDidMount() {
// 初始显示列表
    window.scrollTo(0, document.body.scrollHeight)
    //请求标识当前消息已读
    const from = this.props.match.params.userid
    this.props.readMsg(from)
  }
  componentWillUnmount() {
    const from = this.props.match.params.userid
    this.props.readMsg(from)
  }
  componentDidUpdate () {
// 更新显示列表
    window.scrollTo(0, document.body.scrollHeight)
  }

  send = () => {
    const content = this.state.content.trim()
    if (content) {
      console.log('aaaa')
      const from = this.props.user._id
      const to = this.props.match.params.userid
      this.props.sendMsg({from, to, content})
      this.setState({content: '', isShow: false})
    }
  }

  render() {

    //找到所有当前用户与目标用户的聊天列表
    const {user} = this.props
    const {users, chatMsgs} = this.props.chat

    if (!users[user._id]) {
      return null
    }

    const targetId = this.props.match.params.userid
    const meId = user._id
    const chat_id = [targetId, meId].sort().join('_')
    const msgs = chatMsgs.filter(msg => msg.chat_id === chat_id)

    //确定头像
    const targetAvatar = users[targetId].avatar
    const targetIcon = targetAvatar ? require(`../../assets/imgs/${targetAvatar}.png`) : null

    const meAvatar = users[meId].avatar
    const meIcon = require(`../../assets/imgs/${meAvatar}.png`)

    return (
      <div id='chat-page'>
        <NavBar icon={<Icon type='left'/>}
                className='stick-top'
                onLeftClick={() => {
                  this.props.history.goBack()
                }}>{users[targetId].name}
        </NavBar>
        <List style={{marginTop: 50,marginBottom: 50}}>
          {/*alpha left right top bottom scale scaleBig scaleX scaleY*/}
          <QueueAnim type='left' delay={100}>
            {
              msgs.map(msg => {
                if (msg.to === meId) { //别人发给我的
                  return(
                    <Item
                      key={msg._id}
                      thumb={targetIcon}
                    >
                      {msg.content}
                    </Item>
                  )
                } else { //我发的
                  return (
                    <Item
                      key={msg._id}
                      className='chat-me'
                      extra={<img src={meIcon} alt='avatar'/>}
                    >
                      {msg.content}
                    </Item>
                  )
                }
              })
            }
          </QueueAnim>
        </List>
        <div className='am-tab-bar'>
          <InputItem
            onChange={val => {this.msgChange(val)}}
            placeholder="请输入"
            value={this.state.content}
            onFocus={() => this.setState({isShow: false})}
            extra={
              <div>
                <span style={{marginRight:10}}
                      onClick={this.changeShow}
                >😀</span>
                <span onClick={this.send}>发送</span>
              </div>
            }
          />
          {
            this.state.isShow ? (
              <Grid
                data={this.emojis}
                columnNum={8}
                carouselMaxRow={4}
                isCarousel={true}
                onClick={(item) => {
                  this.setState({content: this.state.content + item.text})
                }}
              />
            ) : null
          }
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user,chat: state.chat}),
  {sendMsg, readMsg}
)(Chat)
