const Router = require('koa-router')
const AdminValidator = require('../../validators/admin.js')
const AdminDao = require('../../dao/admin.js')

const router = new Router({
  prefix: '/v1'
})

router.post('/register', async (ctx, next) => {

  let obj = ctx.request.body
  await new AdminValidator().validator(obj)
  await AdminDao.create(obj)
  // 返回结果
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    msg: '注册成功'
  }
})

router.get('/auth', async (ctx) => {

})

module.exports = router