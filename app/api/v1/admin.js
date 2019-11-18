const Router = require('koa-router')

const router = new Router({
  prefix: '/v1'
})

const adminController = require('../../controllers/admin.js')

router.post('/register', async (ctx, next) => {
  console.log(ctx)
  debugger
})

router.get('/auth', async (ctx) => {
  ctx.response.status = 200
  ctx.body = JSON.stringify({
    code: 0,
    msg: '成功'
  })
})

module.exports = router