const bcrypt = require('bcryptjs')

const {
  Sequelize,
  Model
} = require('sequelize')

const {
  sequelize
} = require("../config/dbCon.js")
// 定义模型和表之间的映射
class User extends Model {
  static async getUserByOpenid(openid) {
    const user = await User.findOne({
      where: {
        openid
      }
    })
    return user
  }
  static async registerByOpenid(openid) {
    return await User.create({
      openid
    })
  }
}

User.init({
  // 可以为空 创建时
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  openid: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'User'
})

module.exports = {
  User
}