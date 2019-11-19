const {
  Sequelize,
  Model
} = require('sequelize')
const {
  sequelize
} = require("../config/dbCon.js")

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
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
}, {
  sequelize,
  modelName: 'column_chapter',
  tableName: 'column_chapter',
  timestamps: false
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