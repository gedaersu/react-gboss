//后台应用的路由器模块
//引入express
const express = require('express')
const md5 = require('blueimp-md5')
const models = require('./models')
const UserModel = models.getModel('user')
const ChatModel = models.getModel('chat')
const filter = {pwd: 0}
//得到路由器
const router = express.Router()
//注册n个路由
  //注册路由
router.post('/register', function (req, res) {
// 1.获取请求参数数据(name，pwd，type)
  const {name, pwd, type} = req.body
// 2.处理数据
  //2.1根据name查询数据库，检查是否已经存在
  UserModel.findOne({name},function (err, user) {
// 3.返回响应数据
    if (user) {
      res.send({code: 1, msg:'此用户名已存在'})
    } else {
      new UserModel({name, pwd: md5(pwd), type}).save(function (err, user) {
        res.cookie('userid', user._id, {maxAge:1000*60*60*24*7})
        res.send({code: 0, data: {_id: user._id, name, type}})
      })
    }
  })

})

  //登陆路由
router.post('/login', function (req, res) {
  const {name, pwd} = req.body
  UserModel.findOne({name, pwd: md5(pwd)}, filter,function (err, user) {
    if(!user){
      res.send({code: 1, msg:'用户名或密码错误'})
    } else {
      res.cookie('userid', user._id, {maxAge:1000*60*60*24*7})
      res.send({code: 0, data: user})
    }
  })
})

  //更新用户信息
router.post('/update', function (req, res) {
  const userid = req.cookies.userid
  if (!userid) {
    return res.send({code: 1, msg: '请先注册'})
  }
  UserModel.findByIdAndUpdate({_id:userid}, req.body, function (err, user) {
    if (!userid) {
      res.clearCookie('userid')
      return res.send({code: 1, msg: '请先注册'})
    } else {
      const {_id, name, type} = user
      const data = Object.assign(req.body,{_id, name, type})
      res.send({code: 0, data})
    }
  })
})

  //根据cookie获取对应user
router.get('/user', function (req, res) {
  //根据cookie中的userid获取用户
  const userid = req.cookies.userid
  //如果没有
  if (!userid) {
    return res.send({code: 1, msg: '请先注册'})
  }
  //根据userid找到对应的用户并返回
  UserModel.findOne({_id: userid}, filter, function (err, user) {
    //如果没有
    if (!user) {
      //清除浏览器缓存
      res.clearCookie('userid')
      return res.send({code: 1, msg: '请先注册'})
    } else {
      return res.send({code: 0, data: user})
    }
  })

})

  //根据type获取user列表
router.get('/userlist', function (req, res) {
  const type = req.query.type
  UserModel.find({type}, filter, function (err, users) {
    res.send({code: 0, data: users})
  })
})

  //获取当前用户所有相关聊天信息列表
router.get('/msglist', function (req, res) {
//  获取cookie 中的userid
  const userid = req.cookies.userid
// 查询得到所有user 文档数组
  UserModel.find(function (err, userDocs) {
//  用对象存储所有user 信息:  key 为user 的_id,  val 为name 和header 组成的user 对象
    const users = {} // 对象容器
    userDocs.forEach(doc => {
      users[doc._id] = {name: doc.name, avatar: doc.avatar}
    })
    /*
    查询userid相关的所有聊天信息
    参数1: 查询条件
    参数2: 过滤条件
    参数3: 回调函数
    */
    ChatModel.find({'$or': [{from: userid}, {to: userid}]}, filter, function (err, chatMsgs) {
// 返回包含所有用户和当前用户相关的所有聊天消息的数据
      res.send({code: 0, data: {users, chatMsgs}})
    })
  })
})

  //修改指定消息为已读
router.post('/readmsg', function (req, res) {
//  得到请求中的from 和to
  const from = req.body.from
  const to = req.cookies.userid
  /*
更新数据库中的chat 数据参数1:  查询条件
参数2:  更新为指定的数据对象
参数3:  是否1 次更新多条,  默认只更新一条参数4:  更新完成的回调函数
*/
  ChatModel.update({from, to, read: false}, {read: true}, {multi: true}, function (err, doc) {
    console.log('/readmsg', doc)
    res.send({code: 0, data: doc.nModified})  //  更新的数量
  })
})

//向外暴露路由器
module.exports = router
//通过app使用上路由器(server中编写)

