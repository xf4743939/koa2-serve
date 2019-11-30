const validator = require('validator')

const {
  ParamException
} = require('../lib/exception.js')

class AdvertiseValidator {
  static create(params) {
    if (!params || Object.keys(params).length) {
      throw new ParamException('参数不能为空')
    }
    if (!params.title || !validator.isLength(params.title, {
        min: 1
      })) {
      throw new ParamException('广告标题不能为空')
    }
    if (!params.link || !validator.isLength(params.link, {
        min: 1
      })) {

      throw new ParamException('广告链接不能为空')
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
  AdvertiseValidator
}