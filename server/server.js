/*启动服务器应用的模块*/
const express = require('express')
const app = express()
app.use('/',function (rep,res) {
  res.send('Hello Server!')
})
app.listen('8888',function () {
  console.log('server start on port: 8888')
})
