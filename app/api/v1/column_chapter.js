const Router = require('koa-router')
const {
  Auth
} = require('../../middlewares/auth.js')
const {
  ColumnChapterValidator
} = require("../../validators/column_chapter.js")
const {
  ColumnChapterDao
} = require("../../dao/column_chapter.js")

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: "/v1"
})
// 创建专栏章节
router.post(`/column/chapter`, async (ctx) => {
  const body = ctx.request.body
  ColumnChapterValidator.isEmpty(body)
  await ColumnChapterDao.create(body)
  ctx.body = {
    code: 0,
    msg: '创建专栏章节成功'
  }
})

// 专栏章节详情
router.get(`/column/chapter/:id`, async (ctx) => {
  const id = ctx.params.id
  ColumnChapterValidator.isInt(id)
  const chapter = await ColumnChapterDao.detail(parseInt(id))
  ctx.body = {
    code: 0,
    msg: "成功",
    data: chapter
  }
})

// 专栏章节列表
router.get(`/column/chapter-list/:column_id`, async (ctx) => {
  const id = ctx.params.column_id
  ColumnChapterValidator.isInt(id)
  const list = await ColumnChapterDao.list(parseInt(id))
  ctx.body = {
    code: 0,
    msg: '成功',
    data: list
  }
})

//更新单篇专栏章节
router.put(`/column/chapter/:id`, new Auth(AUTH_ADMIN).m, async (ctx) => {
  const id = ctx.params.id
  const body = ctx.request.body
  ColumnChapterValidator.isInt(id)
  ColumnChapterValidator.isEmpty(body)
  await ColumnChapterDao.update(parseInt(id), body)
  ctx.body = {
    code: 0,
    msg: "更新专栏章节成功"
  }
})

// 删除单篇专栏章节文章
router.delete(`/column/chapter/:id`, async (ctx) => {
  const id = ctx.params.id
  ColumnChapterValidator.isInt(id)
  await ColumnChapterDao.destory(parseInt(id))
  ctx.body = {
    code: 0,
    msg: "删除单篇专栏章节"
  }
})



module.exports = router