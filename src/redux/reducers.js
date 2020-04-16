/*根据老的state和action产生新的state返回*/
import {combineReducers} from 'redux'

function xxx(state = 0, action) {

  return state
}

function yyy(state = {}, action) {

  return state
}

export default combineReducers({
  xxx,
  yyy
})
