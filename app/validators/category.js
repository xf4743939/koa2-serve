const validator = require('validator')

const {
  ParamException
} = require('../lib/exception.js')

class CategotyValidator {
  static isEmpty(params) {
    if (!params || !Object.keys(params).length) {
      throw new ParamException('参数不能为空')
    }
    if (!validator.isLength(params.name, {
        min: 1
      })) {
      throw new ParamException('分类名称不能为空')
    }
    if (!validator.isLength(params.key, {
        min: 1
      })) {
      throw new ParamException('分类关键字不能为空')
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
  CategotyValidator
}