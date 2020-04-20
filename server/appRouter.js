//后台应用的路由器模块
//引入express
const express = require('express')
const md5 = require('blueimp-md5')
const models = require('./models')
const UserModel = models.getModel('user')
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
//向外暴露路由器
module.exports = router
//通过app使用上路由器(server中编写)
