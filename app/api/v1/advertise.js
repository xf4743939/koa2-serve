const Router = require('koa-router')
const AUTH_ADMIN = 16;
const {
  Auth
} = require('../../middlewares/auth.js')
const {
  AdvertiseValidator
} = require("../../validators/advertise")
const AdvertiseDao = require('../../dao/advertise.js')
const router = new Router({
  prefix: "/v1"
})

//创建广告
router.post('/advertise', async (ctx) => {
  const body = ctx.request.body
  AdvertiseValidator.create(body)
  const v = await AdvertiseDao.create(body)
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    msg: "成功"
  }
})

//删除广告
router.delete('/advertise/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {
  const id = ctx.params.id
  AdvertiseValidator.isInt(id)
  await AdvertiseDao.destory(parseInt(id))
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    msg: '删除成功'
  }
})

// 修改广告
router.put('/advertise/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  const body = ctx.request.body
  const id = ctx.params.id

  AdvertiseValidator.isInt(id)
  AdvertiseValidator.create(body)
  await AdvertiseDao.update(parseInt(id), body)
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    msg: "更新评论成功"
  }
})

// 获取广告列表
router.get('/advertise', async (ctx) => {
  const page = ctx.query.page
  AdvertiseValidator.isInt(page)
  const res = await AdvertiseDao.list(parseInt(page))
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    msg: "成功",
    data: {
      ...res
    }
  }
})

// 获取广告详情
router.get('/advertise/:id', async (ctx) => {
  const id = ctx.params.id
  AdvertiseValidator.isInt(id)
  const obj = await AdvertiseDao.detail(parseInt(id))
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    msg: '成功',
    data: obj
  }
})

module.exports = router