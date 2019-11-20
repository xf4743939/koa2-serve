const Router = require('koa-router')
const {
  LoginValidator,
  RegisterValidator
} = require('../../validators/admin.js')
const AdminDao = require('../../dao/admin.js')

const {
  Auth
} = require('../../middlewares/auth.js')
const {
  LoginManager
} = require('../../service/login.js')

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: '/v1/admin'
})

router.post('/register', async (ctx, next) => {

  let obj = ctx.request.body
  await new RegisterValidator().validator(obj)
  await AdminDao.create(obj)
  // 返回结果
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    msg: '注册成功',
    request: `${ctx.method}${ctx.path}`
  }
})

// 用户登录
router.post('/login', async (ctx, next) => {
  let params = ctx.request.body
  const obj = new LoginValidator().validator(params)
  let token = await LoginManager.adminLogin(obj.email, obj.password)
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    msg: "登录成功",
    data: token
  }
})

router.get('/auth', new Auth(AUTH_ADMIN).m, async (ctx) => {

  const id = ctx.auth.uid
  const userInfo = await AdminDao.detail(id)
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    msg: "成功",
    data: userInfo
  }
})

module.exports = router