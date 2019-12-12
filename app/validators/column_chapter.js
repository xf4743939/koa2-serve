const validator = require('validator')

const {
  ParamException
} = require('../lib/exception.js')

class ColumnChapterValidator {
  static isEmpty(body) {
    if (!body || !Object.keys(body).length) {
      throw new ParamException('参数不能为空')
    }
    if (!body.title || !validator.isLength(body.title, {
        min: 1
      })) {
      throw new ParamException('专栏章节标题不能为空')
    }
    if (!body.column_id || !validator.isLength(body.column_id, {
        min: 1
      })) {
      throw new ParamException('专栏ID不能为空')
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
  ColumnChapterValidator
}