const bcrypt = require('bcryptjs')

const {
  Sequelize,
  Model
} = require('sequelize')

const {
  sequelize
} = require("../config/dbCon.js")
// 定义模型和表之间的映射
class Admin extends Model {}

Admin.init({
  // 可以为空 创建时
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nickname: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '管理员名称'
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    comment: '管理员邮箱'
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: "管理员密码",
    set(val) {
      // 加密
      const salt = bcrypt.genSaltSync(10)
      const pwd = bcrypt.hashSync(val, salt)
      this.setDataValue("password", pwd)
    }
  }
}, {
  sequelize,
  modelName: 'admin',
  tableName: 'admin'
})

module.exports = {
  Admin
}