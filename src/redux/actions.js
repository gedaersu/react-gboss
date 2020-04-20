import {reqRegister, reqLogin, reqUpdateUser, reqUser} from '../api'
import {ERROR_MSG, AUTH_SUCCESS, RECEIVE_USER, RESET_USER} from './action-types'

const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
const resetUser = (msg) => ({type: RESET_USER, data: msg})

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
    return errorMsg('用户密码必须输入')
  }
  return async dispatch => {
    const response = await reqLogin({name, pwd})
    const result = response.data
    if (result.code === 0) {
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
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}
