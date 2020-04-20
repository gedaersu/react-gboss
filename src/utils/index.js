/*
n个工具函数的模块
*/

export function getPath(type, avatar) {
  let path = ''
  path += type==='boss' ? '/boss' : '/genius'
  if (!avatar) {
    path += 'info'
  }
  return path
}
