const validator = require('validator')

const {
  Advertise
} = require('../models/advertise.js')
const {
  ParamException
} = require('../lib/exception.js')

class AdvertiseValidator {
  static create(params) {
    if (!validator.isLength(params.title, {
        min: 1
      })) {
      throw new ParamException('广告标题不能为空')
    }
    if (!validator.isLength(params.link, {
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