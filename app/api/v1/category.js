const Router = require('koa-router')
const AUTH_ADMIN = 16;
const {
  Auth
} = require('../../middlewares/auth.js')
const {
  CategotyValidator
} = require("../../validators/category.js")
const {
  CategoryDao
} = require('../../dao/category.js')

const router = new Router({
  prefix: "/v1"
})

//创建分类
router.post('/category', async (ctx) => {
  const body = ctx.request.body
  CategotyValidator.isEmpty(body)
  await CategoryDao.create(body)
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    msg: "创建分类成功"
  }
})

//删除广告
router.delete('/category/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {
  const id = ctx.params.id
  CategotyValidator.isInt(id)
  await CategoryDao.destory(parseInt(id))
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    msg: '删除分类成功'
  }
})

// 修改广告
router.put('/category/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  const body = ctx.request.body
  const id = ctx.params.id
  CategotyValidator.isInt(id)
  CategotyValidator.isEmpty(body)
  await CategoryDao.update(parseInt(id), body)
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    msg: "更新分类成功"
  }
})

// 获取所有分类
router.get('/category', async (ctx) => {
  const categorys = await CategoryDao.list()
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    msg: "成功",
    data: categorys
  }
})

// 获取广告详情
router.get('/category/:id', async (ctx) => {
  const id = ctx.params.id
  CategotyValidator.isInt(id)
  const obj = await CategoryDao.detail(parseInt(id))
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    msg: '成功',
    data: obj
  }
})

module.exports = router