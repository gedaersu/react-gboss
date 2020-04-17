/*启动服务器应用的模块*/
const express = require('express')
const bodyParser = require('body-parser') //解析请求体
const cookieParser = require('cookie-parser') //解析cookie
const appRouter = require('./appRouter')
const app = express()
/*app.use('/',function (rep,res) {
  res.send('Hello Server!')
})*/
app.use(cookieParser()) //解析cookie
app.use(bodyParser.json()) //解析请求体(ajax请求：json数据格式)
app.use(bodyParser.urlencoded({ extended: false })) //解析请求体(表单数据)
app.use('/api', appRouter) //请求注册：/api/register
app.listen('8888',function () {
  console.log('server start on port: 8888')
})
