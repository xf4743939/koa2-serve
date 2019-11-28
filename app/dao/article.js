const {
  Article
} = require('../models/article.js')

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
}