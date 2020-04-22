import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList,
  reqMsgList,
  reqReadMsg
} from '../api'
import {
  ERROR_MSG,
  AUTH_SUCCESS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG,
  RECEIVE_MSG_LIST,
  MSG_READ
} from './action-types'

import io from 'socket.io-client'

const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})
const receiveMsg = (chatMsg, userid) => ({type: RECEIVE_MSG, data: {chatMsg, userid}})
const receiveMsgList = ({users, chatMsgs, userid}) => ({type: RECEIVE_MSG_LIST, data: {users, chatMsgs, userid}})
const msgRead = ({count, from, to}) => ({type: MSG_READ, data: {count, from, to}})

function initIO(userid, dispatch) {
  //连接io服务器
  io.socket = io(`ws://localhost:8888?userid=${userid}`)
  //绑定接收服务器发送消息的监听
  io.socket.on('receiveMsg', function (chatMsg) {
    // if(chatMsg.from===userid || chatMsg.to===userid) {
    //   dispatch(receiveMsg(chatMsg, chatMsg.to === userid))
    // }
    console.log('服务器发给浏览器', chatMsg)
    dispatch(receiveMsg(chatMsg, userid))
  })
}
 //获取当前用户相关的所有聊天列表
async function getMsgList(dispatch, userid) {
 const response = await reqMsgList()
  const result = response.data
  if (result.code === 0) {
    const {users, chatMsgs} = result.data
    dispatch(receiveMsgList({users, chatMsgs, userid}))
  }
}

export const sendMsg = ({from, to, content}) => {
  return dispatch => {
    io.socket.emit('sendMsg', {from, to, content})
    console.log("浏览器发给服务器" , {from, to, content})
  }
}

//异步注册
export const register = ({name, pwd, pwd2, type}) => {
  //做前台验证，错误返回
  if (!name || !pwd) {
    return errorMsg('用户名或密码不能为空')
  } else if (pwd !== pwd2) {
    return errorMsg('两次输入的密码必须一致')
  }
 // 如果成功，发送一部ajax请求
  return async dispatch => { //返回一个一部action函数
    reqRegister({name, pwd, type}).then(respose => {
      const result = respose.data //{code：0, data: user} {code: 1,msg：'xxx'}
      //如果成功，分发一个成功的action
      if (result.code === 0) {
        initIO(result.data._id, dispatch)
        getMsgList(dispatch, result.data._id)
        dispatch(authSuccess(result.data))
      } else { //如果失败，分发一个错误信息的action
        dispatch(errorMsg(result.msg))
      }
    })
  }
  // return async dispatch => {
  //   const response = await reqRegister({name, pwd, type})
  //   const result = response.data
  //   if (result.code === 0) {
  //     dispatch(authSuccess(result.data))
  //   } else {
  //     dispatch(errorMsg(result.msg))
  //   }
  // }
}

//异步登录
export const relogin = ({name, pwd}) => {
  if (!name || !pwd) {
    return errorMsg('用户或密码不能为空')
  }
  return async dispatch => {
    const response = await reqLogin({name, pwd})
    const result = response.data
    if (result.code === 0) {
      initIO(result.data._id, dispatch)
      getMsgList(dispatch, result.data._id)
      dispatch(authSuccess(result.data))
    } else {
      dispatch(errorMsg(result.msg))
    }
  }
}

//异步完善更新用户信息
export const userUpdate = (user) => {
  return async dispatch => {
    const response = await reqUpdateUser(user)
    const result = response.data
    if (result.code === 0) {
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}

//异步获取user
export const getUser = () => {
  return async dispatch => {
    const response = await reqUser()
    const result = response.data
    if (result.code === 0) {
      initIO(result.data._id, dispatch)
      getMsgList(dispatch, result.data._id)
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}

//异步获取用户列表
export const getUserList = (type) => {
  return async dispatch => {
    const response = await reqUserList(type)
    const result = response.data
    if (result.code === 0) {
      dispatch(receiveUserList(result.data))
    }
  }
}

//异步读取聊天
export const readMsg = (from) => {
 return async (dispatch, getstate) => {
   const response = await reqReadMsg(from)
   const result = response.data
    if (result.code===0) {
      const count = result.data
      const to =getstate().user._id
      dispatch(msgRead({count, from, to}))
    }
 }
}
