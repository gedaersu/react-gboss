/*启动服务器应用的模块*/
const express = require('express')
const bodyParser = require('body-parser') //解析请求体
const cookieParser = require('cookie-parser') //解析cookie
const appRouter = require('./appRouter')
const ChatModel = require('./models').getModel("chat")

const app = express()
/*app.use('/',function (rep,res) {
  res.send('Hello Server!')
})*/
const server = require('http').Server(app)
const io = require('socket.io')(server)

const sockets = {}

io.on('connection', function (socket) {
  console.log('soketio connected')
  const userid = socket.handshake.query.userid

  if (!userid) {
    return
  }

  const savedSocket = sockets[userid]
  if (savedSocket) {
    delete sockets[userid]
    savedSocket.disconnect()
  }

  sockets[userid] = socket

  socket.on('sendMsg', function ({from, to, content}) {
    console.log('服务器接收到浏览器的消息', {from, to, content})

    //保存到数据库
    const chat_id = [from, to].sort().join('_')
    const create_time = Date.now()
    const chatModel = new ChatModel({from, to, content, chat_id, create_time})
    chatModel.save(function (err, chatMsg) {
      //保存成功后把msg发送给from/to所对应的客户端
      sockets[from] && sockets[from].emit('receiveMsg',chatMsg)
      sockets[to] && sockets[to].emit('receiveMsg',chatMsg)
      console.log('服务器向两个客户端发送', from, to, chatMsg)
    })
  })
})

app.use(cookieParser()) //解析cookie
app.use(bodyParser.json()) //解析请求体(ajax请求：json数据格式)
app.use(bodyParser.urlencoded({extended: false})) //解析请求体(表单数据)
app.use('/api', appRouter) //请求注册：/api/register
// app.listen('8888', function () {
//   console.log('server start on port: 8888')
// })
server.listen('8888', () => {
  console.log('服务器启动成功 port: 8888')
})
