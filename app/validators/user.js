const validator = require('validator')

const {
  ParamException
} = require('../lib/exception.js')

class UserValidator {
  static validator(code) {
    if (!validator.isLength(code, {
        min: 1
      })) {
      throw new ParamException('code 不能为空')
    }
  }
}

module.exports = {
  UserValidator
}