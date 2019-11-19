const {
  Sequelize,
  Model
} = require('sequelize')
const {
  sequelize
} = require("../config/dbCon.js")

const {
  Comment
} = require('./comment.js')

class Reply extends Model {

}

Reply.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: '回复人姓名'
  },
  email: {
    type: Sequelize.STRING(64),
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
}, {
  sequelize,
  modelName: "reply",
  tableName: 'reply',
  timestamps: false
})

// 一对多 评论表下有多个评论
Comment.hasMany(Reply, {
  foreignKey: 'comment_id',
  sourceKey: 'id',
  as: 'reply'
})

Reply.belongsTo(Comment, {
  foreignKey: "comment_id",
  sourceKey: 'id',
  as: "comment"
})

module.exports = {
  Reply
}