const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
  constructor(level) {
    this.level = level || 1
    Auth.USER = 8
    Auth.ADMIN = 16
    Auth.SPUSER_ADMIN = 32
  }
  get m() {

    // token 检查
    // token 开发者 传递令牌
    // token body header
    // HTTP 规定 身份验证机制 HttpBasicAuth
    return async (ctx, next) => {
      // 从请求头解析出用户信息
      // ctx.req node.js 原生的request
      const tokenToken = basicAuth(ctx.req)
      let errMsg = "token不合法"
      if (!tokenToken || !tokenToken.name) {
        errMsg = '需要携带token 值'
        throw new global.errs.Forbidden(errMsg)
      }
      try {
        // 验证token 是否正确
        var decode = jwt.verify(tokenToken.name, global.config.security.secretKey)
      } catch (error) {
        // token 不合法
        // token 过期
        if (error.name == "TokenExpiredError") {
          errMsg = 'token已过期'
          throw new global.errs.Forbidden(errMsg)
        }
        throw new global.errs.Forbidden(errMsg)
      }
      if (decode.scope < this.level) {
        errMsg = '权限不足'
        throw new global.errs.Forbidden(errMsg)
      }
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }
      await next()
    }
  }
}

module.exports = {
  Auth
}