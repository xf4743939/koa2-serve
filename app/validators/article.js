const validator = require('validator')

const {
  ParamException
} = require('../lib/exception.js')

class ArticleValidator {
  static valid(params) {

    if (!params.title || !validator.isLength(params.title, {
        min: 1
      })) {
      throw new ParamException('文章标题不能为空')
    }

    if (!params.author || !validator.isLength(params.author, {
        min: 1
      })) {

      throw new ParamException('文章作者不能为空')
    }
    if (!params.content || !validator.isLength(params.content, {
        min: 1
      })) {
      throw new ParamException('文章内容不能为空')
    }
    if (!params.cover || !validator.isLength(params.cover, {
        min: 1
      })) {
      throw new ParamException('文章封面不能为空')
    }
    if (!params.category_id || !validator.isLength(params.category_id, {
        min: 1
      })) {
      throw new ParamException('文章分类Id 不能为空')
    }
  }

  static isInt(id) {
    if (!validator.isInt(id, {
        min: 1
      })) {
      throw new ParamException('id需要正整数')
    }
  }
}

module.exports = {
  ArticleValidator
}