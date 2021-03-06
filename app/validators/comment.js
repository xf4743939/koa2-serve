const validator = require('validator')

const {
  ParamException
} = require('../lib/exception.js')

class CommentValidator {
  static isEmpty(params) {
    
    if (!params.nickname || !validator.isLength(params.nickname, {
        min: 1
      })) {
      throw new ParamException('评论人姓名不能为空')
    }
    if (!params.email || validator.isEmpty(params.email)) {
      const err = new ParamException('邮箱不能为空')
      throw err
    }
    if (!validator.isEmail(params.email)) {
      
      const err = new ParamException('邮箱不合法')
      throw err
    }
    
    if (!params.content || !validator.isLength(params.content, {
        min: 1
      })) {
      throw new ParamException('评论内容不能为空')
    }
    if (!params.target_id) {
      throw new ParamException('目标id 不能为空')
    }
    if (!params.target_type || !validator.isLength(params.target_type, {
        min: 1
      })) {
      throw new ParamException('目标类型不能为空')
    }
  }

  static isInt(id) {
    if (!validator.isInt(id, {
        min: 1
      })) {
      throw new ParamException('评论id需要正整数')
    }
  }
}

module.exports = {
  CommentValidator
}