const {
  Sequelize,
  Model
} = require('sequelize')
const {
  db
} = require('../lib/core.js')
const {
  Column
} = require('./column.js')

class ColumnChapter extends Model {}

ColumnChapter.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: '专栏章节标题'
  },
  create_at: {
    type: Sequelize.DATE,
    allowNull: false
  }
}, {
  db,
  modelName: 'column_chapter',
  tableName: 'column_chapter'
})
// 一对多：专栏表下拥有多个章节
Column.hasMany(ColumnChapter, {
  foreignKey: 'column_id',
  sourceKey: 'id',
  as: "column_chapter"
})

ColumnChapter.belongsTo(Column, {
  foreignKey: 'column_id',
  sourceKey: 'id',
  as: 'column'
})
module.exports = {
  ColumnChapter
}