const {
  Op
} = require('sequelize')
const {
  Article
} = require('../models/article.js')
const {
  Category
} = require('../models/category.js')

class ArticleDao {
  // 创建文章
  static async create(body) {
    const hasArticle = Article.findOne({
      where: {
        title: body.title,
        deleted_at: null
      }
    })
    if (hasArticle) {
      throw new global.errs.Existing('文章已存在')
    }
    const article = new Article()
    article.title = body.title
    article.author = body.author || ''
    article.description = body.description || ''
    article.content = body.content
    article.cover = body.cover
    article.browse = body.browse || 0
    article.category_id = body.category_id
    article.save()
  }
  // 获取文章列表
  static async list(params) {
    const {
      category_id,
      keyword,
      page = 1,
      pageSize = 10,
      desc = 'created_at'
    } = params
    // 筛选方式
    let filter = {
      deleted_at: null
    }
    // 分类id
    if (category_id) {
      filter.category_id = category_id
    }
    // 存在搜索关键字
    if (title) {
      filter.title = {
        [Op.like]: `%${keyword}%`
      }
    }
    const article = await Article.findAndCountAll({
      limit: pageSize, // 每页几条
      offset: (page - 1) * pageSize,
      where: filter,
      order: [desc, 'DESC'],
      include: [{
        model: Category,
        as: 'category',
        attributes: {
          exclude: ['deleted_at', 'updated_at']
        }
      }]
    })
    return {
      data: article.rows,
      cur_page: parseInt(page),
      total: article.count,
      total_pages: Math.ceil(article.count / 10)
    }
  }

  // 删除文章
  static async destroy(id) {
    // 检查是否存在文章
    const article = await article.findOne({
      where: {
        id,
        deleted_at: null
      }
    })
    // 不存在抛出错误
    if (!article) {
      throw new global.errs.NotFound('没有找到相关文章')
    }
    article.destroy()
  }
  // 更新文章
  static async update(id, v) {
    const article = await Article.findByPk(id)
    if (!article) {
      throw new global.errs.NotFound('没有找到相关文章')
    }
    //更新系统
    article.title = v.title
    article.author = v.author
    article.description = v.description
    article.content = v.content
    article.cover = v.cover
    article.browse = v.browse
    article.category_id = v.category_id
    article.save()
  }
  //更新文章浏览次数
  static async updateBrowse(id, browse) {
    const article = await Article.findByPk(id)
    if (!article) {
      throw new global.errs.NotFound('没有找到相关文章')
    }
    article.browse = browse
    article.save()
  }
  //文章详情
  static async detail(id) {

  }
}