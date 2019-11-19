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
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: "管理员密码"
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
}, {
  sequelize,
  modelName: 'admin',
  tableName: 'admin',
  timestamps: false
})

module.exports = {
  Admin
}