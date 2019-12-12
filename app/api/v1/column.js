const Router = require('koa-router')
const {
  Auth
} = require('../../middlewares/auth.js')
const {
  ColumnValidator
} = require("../../validators/column.js")
const {
  ColumnDao
} = require("../../dao/column.js")

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: "/v1"
})
// 创建专栏
router.post(`/column`, async (ctx) => {
  const body = ctx.request.body
  ColumnValidator.isEmpty(body)
  await ColumnDao.create(body)
  ctx.body = {
    code: 0,
    msg: '创建专栏成功'
  }
})

// 专栏详情
router.get(`/column/:id`, async (ctx) => {
  const id = ctx.params.id
  ColumnValidator.isInt(id)
  const _data = await ColumnDao.detail(parseInt(id))
  ctx.body = {
    code: 0,
    msg: "成功",
    data: _data
  }
})

// 专栏列表
router.get(`/column`, async (ctx) => {
  const page = ctx.query.page || 1
  const list = await ColumnDao.list(parseInt(page))
  ctx.body = {
    code: 0,
    msg: '成功',
    data: {
      ...list
    }
  }
})

//更新单篇专栏
router.put(`/column/:id`, new Auth(AUTH_ADMIN).m, async (ctx) => {
  const id = ctx.params.id
  const body = ctx.request.body
  ColumnValidator.isInt(id)
  ColumnValidator.isEmpty(body)
  await ColumnDao.update(parseInt(id), body)
  ctx.body = {
    code: 0,
    msg: "更新专栏成功"
  }
})

// 删除专栏
router.delete(`/column/:id`, async (ctx) => {
  const id = ctx.params.id
  ColumnValidator.isInt(id)
  await ColumnDao.destory(parseInt(id))
  ctx.body = {
    code: 0,
    msg: "删除专栏成功"
  }
})



module.exports = router