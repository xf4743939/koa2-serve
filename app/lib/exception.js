class HttpException extends Error {
  /**
   * 构造函数
   * @oaram ex可选参数 通过{}形式传入
   */
  constructor(msg = '服务器错误', errCode = 1000, code = 400) {
    super()
    this.errCode = errCode
    this.code = code
    this.msg = msg
  }
}
exports.HttpException = HttpException