const assert_1 = require("assert")
const lodash_1 = require("loadsh")
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