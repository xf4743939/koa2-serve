const {
  Sequelize,
  Model
} = require('sequelize')
const {
  db
} = require('../lib/core.js')

class Comment extends Model {}

Comment.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  target_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '评论目标id'
  },
  target_type: {
    type: Sequelize.STRING(32),
    allowNull: true,
    comment: '评论的目标类型'
  },
  nickname: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: '评论人姓名'
  },
  email: {
    type: Sequelize.STRING(64),
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  create_at: {
    type: Sequelize.DATE,
    allowNull: false
  }
}, {
  db,
  modelName: 'comment',
  tableName: 'comment'
})

module.exports = {
  Comment
}