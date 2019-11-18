const {
  Sequelize,
  Model
} = require('sequelize')
const {
  db
} = require('../lib/core.js')

class Column extends Model {}

Column.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: '专栏标题'
  },
  author: {
    type: Sequelize.STRING(32),
    allowNull: true,
    comment: '专栏的作者'
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '专栏简介'
  },
  cover: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '专栏封面'
  },
  create_at: {
    type: Sequelize.DATE,
    allowNull: false
  }
}, {
  db,
  modelName: 'column',
  tableName: 'column'
})

module.exports = {
  Column
}