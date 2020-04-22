/*
对话消息列表组件
*/
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'

const Item = List.Item
const Brief = Item.Brief

//
function getLastMsgs(chatMsgs, meId) {
  //存储lastMsg的容器
  const lastMsgObjs = {}
  //遍历chatMsgs
  chatMsgs.forEach(msg => {
    msg.unReadCount = 0

    //取出msg对应保存的lastMsg
    const savedLastMsgs = lastMsgObjs[msg.chat_id]
    if (!savedLastMsgs) {
      lastMsgObjs[msg.chat_id] = msg
      //如果当前别人发的消息未读
      if (!msg.read && meId===msg.to) {
        msg.unReadCount = 1
      }
    } else {
      if (msg.create_time > savedLastMsgs.create_time) {
        lastMsgObjs[msg.chat_id] = msg
        msg.unReadCount = savedLastMsgs.unReadCount
      }
      if (!msg.read && meId===msg.to) {
        msg.unReadCount++
      }
    }
  })
  //得到所有lastMsg组成的数组
  const lastMsgs = Object.values(lastMsgObjs)
  //对数组进行排序（按照create_time降序排列）
  lastMsgs.sort(function (msg1, msg2) {//如果返回负数，msg1在前面，正数msg2在前面，否则不变位置
    return msg2.create_time - msg1.create_time
  })
  return lastMsgs
}

class Msg extends Component {
  render() {
    const {user, chat} = this.props
    const {users, chatMsgs} = chat
    const meId = user._id
    //得到跟所有人聊天的最后一条msg的数组
    const lastMsgs = getLastMsgs(chatMsgs, meId)


    return (
      <List style={{marginTop: 50, marginBottom: 50}}>
        {/*alpha left right top bottom scale scaleBig scaleX scaleY*/}
        <QueueAnim  type='scale' delay={100}>
          {
            lastMsgs.map(lastMsg => {
              const targetId = lastMsg.to === meId ? lastMsg.from : lastMsg.to
              const targetUser = users[targetId]
              const targetAvatarIcon = targetUser.avatar ? require(`../../assets/imgs/${targetUser.avatar}.png`) : null

              return(
                <Item
                  key={lastMsg._id}
                  extra={<Badge text={lastMsg.unReadCount}/>}
                  thumb={targetAvatarIcon}
                  arrow='horizontal'
                  onClick={() => this.props.history.push(`/chat/${targetId}`)}
                >
                  {lastMsg.content}
                  <Brief>{targetUser.name}</Brief>
                </Item>
              )
            })
          }
        </QueueAnim>

      </List>
    )
  }
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {}
)(Msg)
