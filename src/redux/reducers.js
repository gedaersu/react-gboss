/*根据老的state和action产生新的state返回*/
import {combineReducers} from 'redux'
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG,
  RECEIVE_MSG_LIST,
  MSG_READ
} from './action-types'

import {getPath} from '../utils'

const initUser = {
  name: '',
  msg: '',
  type:'',
  redirectTo: ''
}

function user(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS: //成功 user
      const user = action.data
      return {...user, redirectTo: getPath(user.type, user.avatar)}
    case ERROR_MSG: //失败 msg
      return {...state, msg: action.data}
    case RECEIVE_USER:
      return action.data
    case RESET_USER:
      return {...initUser, msg: action.data}
    default:
      return state
  }
}

const initUserList = []

function userList(state = initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return action.data
    default:
      return state
  }
}

const initChat = {
  chatMsgs: [],
  users: {},
  unReadCount: 0
}

function chat(state = initChat, action) {
  switch (action.type) {
    case RECEIVE_MSG:
      var {chatMsg, userid} = action.data
      return{
        chatMsgs: [...state.chatMsgs, chatMsg],
        users: state.users,
        unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === userid)
      }
    case RECEIVE_MSG_LIST:
      var {users, chatMsgs, userid} = action.data
      return{
        chatMsgs,
        users,
        unReadCount: chatMsgs.reduce((preTotal, msg) => {
          return preTotal + (!msg.read && msg.to === userid ? 1 : 0)
        }, 0)
      }
    case MSG_READ:
      const {count, from, to} = action.data
      return {
        chatMsgs: state.chatMsgs.map(msg => {
          if (msg.from===from && msg.to===to && !msg.read) {
            return {...msg, read: true}
          } else {
            return msg
          }
        }),
        users: state.users,
        unReadCount: state.unReadCount - count
      }

    default:
      return state
  }
}

export default combineReducers({
  user,
  userList,
  chat
})
