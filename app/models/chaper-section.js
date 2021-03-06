const {
  Sequelize,
  Model
} = require('sequelize')
const {
  sequelize
} = require("../config/dbCon.js")


const {
  ColumnChapter
} = require('./column_chapter.js')

class ChapterSection extends Model {}

ChapterSection.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: '专栏文章标题'
  },
  author: {
    type: Sequelize.STRING(32),
    allowNull: false,
    comment: '专栏的作者'
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'chaper_section',
  tableName: 'chaper_section'
})

// 一对多：章节表下拥有多个专栏文章
ColumnChapter.hasMany(ChaperSection, {
  foreignKey: 'column_chapter_id',
  sourceKey: 'id',
  as: "chaper_cection"
})

ChaperSection.belongsTo(ColumnChapter, {
  foreignKey: 'column_chapter_id',
  sourceKey: 'id',
  as: "column_chapter"
})

module.exports = {
  ChapterSection
}