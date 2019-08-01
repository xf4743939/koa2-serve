const Router = require("koa-router")
const router = new Router()
const HttpException = require("../../lib/exception.js")
const {
    AddressDao
} = require("../../dao/address.js")

const addressDto = new AddressDao()

router.get('/v1/user', async (ctx, next) => {
    const address = await addressDto.getAddress()
    if (!address) {
        throw new HttpException({
            errCode: 999,
            msg: "没有找到相关书籍"
        })
    }
    ctx.body = {
        code: 0,
        data: address,
    }
    // ctx.state = 200
    // ctx.body = JSON.stringify({
    //     code: 0,
    //     msg: "user"
    // })
})
module.exports = router