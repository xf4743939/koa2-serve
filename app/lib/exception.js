//定义错误基类

class HttpException extends Error {
  /**
   * 构造函数
   * @oaram ex可选参数 通过{}形式传入
   */
  constructor(msg = '服务器异常', code = 0) {
    super()
    this.code = code
    this.msg = msg
  }
}

class Existing extends HttpException {
  constructor(msg = "已存在", code = 412) {
    super()
    this.code = code
    this.msg = msg
  }
}

// 参数错误
class ParamException extends HttpException {
  constructor(msg = '参数错误', code = 400) {
    super()
    this.code = code
    this.msg = msg
  }
}

class AuthFailed extends HttpException {
  constructor(msg, code) {
    super()
    this.code = code || 401
    this.msg = msg || '授权失败'
  }
}

class NotFound extends HttpException {
  constructor(msg, code) {
    super()
    this.code = code || 404
    this.msg = msg || '404找不到'
  }
}

class Forbidden extends HttpException {
  constructor(msg, code) {
    super()
    this.code = code || 412
    this.msg = msg || '禁止访问'
  }
}


module.exports = {
  HttpException,
  Existing,
  ParamException,
  AuthFailed,
  NotFound,
  Forbidden
}