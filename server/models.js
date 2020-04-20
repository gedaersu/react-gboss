/*包含 n 个能操作 mongodb 数据库集合的 model 的模块
1. 连接数据库
 1.1. 引入 mongoose
 1.2. 连接指定数据库(URL 只有数据库是变化的)
 1.3. 获取连接对象
 1.4. 绑定连接完成的监听(用来提示连接成功)
2. 定义出对应特定集合的 Model 并向外暴露
 2.1. 字义 Schema(描述文档结构)
 2.2. 定义 Model(与集合对应, 可以操作集合)
 2.3. 向外暴露 Model
*/
// 1. 连接数据库
// 1.1. 引入 mongoose
const mongoose = require('mongoose')
// 1.2. 连接指定数据库(URL 只有数据库是变化的)
mongoose.connect('mongodb://localhost:27017/gboss')
// 1.3. 获取连接对象
const conn = mongoose.connection
// 1.4. 绑定连接完成的监听(用来提示连接成功)
conn.on('connected',function () {
  console.log('数据库连接成功')
})
// 2. 定义出对应特定集合的 Model 并向外暴露
// 2.1. 字义 Schema(描述文档结构)
const userSchema = mongoose.Schema({
  name: {type: String, required: true}, // 用户名
  pwd: {type: String, required: true}, // 密码
  type: {type: String, required: true}, // 用户类型: dashen/laoban
  avatar: {type: String},
  desc: {type: String},
  title: {type: String},
  company: {type: String},
  money: {type: String}
})
// 2.2. 定义 Model(与集合对应, 可以操作集合)
mongoose.model('user',userSchema)
// 2.3. 向外暴露 Model
module.exports = {
  getModel (name) {
    return mongoose.model(name)
  }
}