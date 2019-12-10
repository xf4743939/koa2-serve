const validator = require('validator')

const {
  ParamException
} = require('../lib/exception.js')

class ChapterSectionValidator {
  static isEmpty(body) {
    if (!body || !Object.keys(body).length) {
      throw new ParamException('参数不能为空')
    }
    if (!body.title || !validator.isLength(body.title, {
        min: 1
      })) {
      throw new ParamException('专栏文章标题不能为空')
    }
    if (!body.author || !validator.isLength(body.author, {
        min: 1
      })) {
      throw new ParamException('专栏文章作者不能为空')
    }
    if (!body.content || !validator.isLength(body.content, {
        min: 1
      })) {
      throw new ParamException('专栏文章内容为空')
    }
    if (!body.column_chapter_id || !validator.isLength(body.column_chapter_id, {
        min: 1
      })) {
      throw new ParamException('章节ID不能为空')
    }
  }
  static isInt(id) {
    if (!id || !validator.isInt(id, {
        min: 1
      })) {
      throw new ParamException('id需要正整数')
    }
  }
}

module.exports = {
  ChapterSectionValidator
}