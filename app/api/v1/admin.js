const Router = require('koa-router')

const router = new Router({
  prefix: '/v1'
})

router.get('/advertise', async (ctx, next) => {
  const page = ctx.query.page;
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    data: [],
    msg: 'success'
  }
})

module.exports = router