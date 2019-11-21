const Router = require('koa-router')
const {
  WXManager
} = require('../../service/wx.js')
const {
  UserValidator
} = require("../../validators/user.js")

const router = new Router({
  prefix: '/v1/user'
})

// 用户登录
router.post('/token', async (ctx) => {

  const code = ctx.request.body.account
  UserValidator.validator(code)
  const token = await WXManager.codeToToken(code)
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    msg: '成功',
    token: token
  }
})

module.exports = router