const {
  Admin
} = require('../models/admin.js')
const validator = require('validator')
const {
  ParamException
} = require('../lib/exception.js')

const {
  isEmpty,
  isEqual
} = require('lodash')

class RegisterValidator {
  async validator(params) {
    if (!validator.isLength(params.nickname, {
        min: 4,
        max: 16
      })) {
      const err = new ParamException('昵称4~12位字符')
      throw err
    }
    if (validator.isEmpty(params.email)) {
      const err = new ParamException('邮箱不能为空')
      throw err
    }
    if (!validator.isEmail(params.email)) {
      const err = new ParamException('邮箱不合法')
      throw err
    }
    if (validator.isEmpty(params.password)) {
      const err = new ParamException('密码不能为空')
      throw err
    }
    if (!validator.isLength(params.password, {
        min: 6,
        max: 30
      })) {
      const err = new ParamException('密码长度6~30位字符')
      throw err
    }
    if (!validator.equals(params.password, params.cofirmPassword)) {
      const err = new ParamException('两次密码不相等')
      throw err
    }
    return params
  }
}

class LoginValidator {
  constructor() {

  }
  validator(params) {
    if (validator.isEmpty(params.email)) {
      const err = new ParamException('邮箱不能为空')
      throw err
    }
    if (!validator.isEmail(params.email)) {
      const err = new ParamException('邮箱不合法')
      throw err
    }
    if (!validator.isLength(params.password, {
        min: 6,
        max: 30
      })) {
      const err = new ParamException('密码长度6~30位字符')
      throw err
    }
    return params
  }
}

module.exports = {
  RegisterValidator,
  LoginValidator
}