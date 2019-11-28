const validator = require('validator')

const {
  ParamException
} = require('../lib/exception.js')

class ArticleValidator {
  static valid(params) {
    if (!validator.isLength(params.title, {
        min: 1
      })) {
      throw new ParamException('文章标题不能为空')
    }
    if (!validator.isLength(params.content, {
        min: 1
      })) {
      throw new ParamException('文章内容不能为空')
    }
    if (!validator.isLength(params.cover, {
        min: 1
      })) {
      throw new ParamException('文章封面不能为空')
    }
  }
}

module.exports = {
  ArticleValidator
}