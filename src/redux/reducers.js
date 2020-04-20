/*根据老的state和action产生新的state返回*/
import {combineReducers} from 'redux'
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST
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

export default combineReducers({
  user,
  userList
})
