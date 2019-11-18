const {
  Sequelize,
  Model
} = require('sequelize')
const {
  db
} = require('../lib/core.js')
const {
  Category
} = require('./category.js')

class Article extends Model {}

Article.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: '文章标题'
  },
  author: {
    type: Sequelize.STRING(30),
    allowNull: true,
    defaultValue: "小布丁",
    comment: '文章作者'
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
    comment: '文章标题'
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  cover: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '文章封面'
  },
  browse: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
    comment: '文章浏览量'
  },
  create_at: {
    type: Sequelize.DATE,
    allowNull: false
  }
}, {
  db,
  modelName: 'article',
  tableName: 'article'
})

// 文章关联分类
// article 表上注册外键
Category.hasMany(Article, {
  foreignKey: 'category_id',
  sourceKey: 'id',
  as: 'article'
})

Article.belongsTo(Category, {
  foreignKey: 'category_id',
  targetKey: 'id',
  as: 'category'
})


module.exports = {
  Article
}