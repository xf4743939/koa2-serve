const {
    HttpException
} = require("./exception.js")

exports.error = function (err, ctx) {
    ctx.type = "application/json";
    if (err instanceof HttpException) {
        ctx.status = err.code || 500
        ctx.body = JSON.stringify({
            error_code: err.errorCode,
            msg: err.msg,
            url: ctx.req.url
        })
    } else {
        ctx.body = JSON.stringify({
            error_code: 999,
            msg: "服务器未知错误",
            url: ctx.req.url
        })
    }
}