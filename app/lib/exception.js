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

class Existing extends Error {
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

module.exports = {
  HttpException,
  Existing,
  ParamException
}