const validator = require('validator')

const {
  ParamException
} = require('../lib/exception.js')

class ColumnValidator {
  static isEmpty(body) {
    if (!body || !Object.keys(body).length) {
      throw new ParamException('参数不能为空')
    }
    if (!body.title || !validator.isLength(body.title, {
        min: 1
      })) {
      throw new ParamException('专栏标题不能为空')
    }
    if (!body.author || !validator.isLength(body.author, {
        min: 1
      })) {
      throw new ParamException('专栏作者不能为空')
    }
    if (!body.description || !validator.isLength(body.description, {
        min: 1
      })) {
      throw new ParamException('专栏简介不能为空')
    }
    if (!body.cover || !validator.isLength(body.cover, {
        min: 1
      })) {
      throw new ParamException('专栏封面不能为空')
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
  ColumnValidator
}