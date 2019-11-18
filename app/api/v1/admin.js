const Router = require('koa-router')

const router = new Router({
  prefix: '/v1'
})

router.post('/register', async (ctx, next) => {

})

router.get('/auth', async (ctx) => {
  const err = new global.errs.ParamException()
  throw err
})

module.exports = router