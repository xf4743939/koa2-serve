const Router = require('koa-router')
const AUTH_ADMIN = 16;
const {
  Auth
} = require('../../middlewares/auth.js')

const {
  ReplyValidator
} = require("../../validators/reply.js")
const {
  ReplyDao
} = require('../../dao/reply.js')

const router = new Router({
  prefix: "/v1"
})

//  创建回复
router.post(`/reply`, async (ctx) => {
  const body = ctx.request.body
  ReplyValidator.isEmpty(body)
  const reply = await ReplyDao.create(body)
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    msg: "创建回复成功",
    data: reply
  }
})

// 获取回复详情
router.get(`/reply/:id`, async (ctx) => {
  const id = ctx.params.id
  ReplyValidator.isInt(id)
  const reply = await ReplyDao.detail(parseInt(id))
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    msg: "成功",
    data: reply
  }
})

// 获取回复列表
router.get(`/reply`, async (ctx) => {
  const page = +ctx.query.page || 1
  const list = await ReplyDao.list(page)
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    msg: '成功',
    data: list
  }
})

// 更新回复
router.put(`/reply/:id`, new Auth(AUTH_ADMIN).m, async (ctx) => {
  const id = ctx.params.id
  const body = ctx.request.body

  ReplyValidator.isInt(id)
  ReplyValidator.isEmpty(body)

  await ReplyDao.update(parseInt(id), body)
  ctx.response.status = 200
  ctx.body = {
    msg: '更新成功',
    code: 0
  }
})

// 删除评论
router.delete(`/reply/:id`, new Auth(AUTH_ADMIN).m, async (ctx) => {
  const id = ctx.params.id
  ReplyValidator.isInt(id)
  await ReplyDao.destroy(parseInt(id))
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    msg: '删除成功'
  }
})

module.exports = router