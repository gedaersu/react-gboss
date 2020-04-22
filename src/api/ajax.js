/*使用 axios 封装的 ajax 请求函数
函数返回的是 promise 对象 */
import axios from 'axios'
// const BASE_URL = 'http://localhost:8888'
const BASE_URL = ''

export default function ajax(url = '', data = {}, type = 'GET') {
  url = BASE_URL + url
  if (type === 'GET') {
    let dataStr = ''
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&'
    })
    if (dataStr !== '') {
      dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr
    }
    return axios.get(url)
  } else {
    return axios.post(url, data)
  }
}
