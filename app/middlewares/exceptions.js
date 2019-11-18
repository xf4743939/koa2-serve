const {
  HttpException
} = require('../lib/exception')

function catchError() {
  return async (ctx, next) => {
    try {
      await next()
    } catch (error) {

      // 开发环境
      const isHttpException = error instanceof HttpException;
      const isDev = true;

      if (isDev && !isHttpException) {
        throw error
      }

      // 生成环境
      if (isHttpException) {
        ctx.body = {
          msg: error.msg,
          code:error.code,
          request: `${ctx.method} ${ctx.path}`
        }
        ctx.response.status = error.code
      } else {
        ctx.body = {
          msg: "未知错误！",
          code: 9999,
          request: `${ctx.method} ${ctx.path}`
        }
        ctx.response.status = 500
      }
    }
  }
}
module.exports = catchError