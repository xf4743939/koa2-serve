const {
  Sequelize,
  Model
} = require('sequelize')

const {
  db
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
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: '管理员名称'
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: "管理员密码"
  },
  ceeatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
}, {
  db,
  modelName: 'admin',
  tableName: 'admin'
})

module.exports = {
  Admin
}