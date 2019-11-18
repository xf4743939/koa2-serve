# cms-koa2
node +koa2 + myspl 开发一个后台管理系统
## koa 项目架构
**创建一个全局异常处理的基类**
```
/**
 * HttpException 是所有其他异常的基类
 * ```js
 * // 实例化一个默认的HttpException
 * const ex=new HttpException();
 * //也可以指定所有参数
 * const ex=new HttpException({errorCode:10010,msg:"记录消息",code：200})
 * ```
 */
class HttpException extends Error {
    /**
     * 构造函数
     * @oaram ex可选参数 通过{}形式传入
     */
    constructor(ex) {
        super()
        //http状态ma
        this.code = 500;
        //返回信息内容
        this.msg = "服务器未知错误";
        //特定错误码
        this.errorCode = 999
        if (ex && ex.code) {
            assert_1.default(lodash_1.isInteger(ex.code));
            this.code = ex.code
        }
        if (ex && ex.msg) {
            this.msg = ex.msg
        }
        if (ex && ex.errorCode) {
            assert_1.default(lodash_1.isInteger(ex.errorCode));
            this.errorCode = ex.errorCode
        }
    }
}

exports.HttpException = HttpException
```
**请求处理异常处理中间件挂载在app.on('error',error)**
```
/**
 * 全局异常处理中间件
 */
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
        logger.error(err)
        ctx.body = JSON.stringify({
            error_code: 999,
            msg: "服务器未知错误",
            url: ctx.req.url
        })
    }
}
```
**成功的处理方式**
```
//挂在到ctx 原形上
exports.success = (app) => {
    app.context.success = function (ex) {
        this.type = 'application/json';
        const suc = new HttpException(ex);
        let data = {
            error_code: suc.errorCode,
            msg: suc.msg,
            url: this.req.url
        };
        this.status = suc.code;
        this.body = JSON.stringify(data);
    };
};
```
- 