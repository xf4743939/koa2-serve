const Router = require('koa-router')
const {
  Auth
} = require('../../middlewares/auth.js')
const {
  ChapterSectionValidator
} = require('../../validators/chaper-section.js')
const {
  ChapterSectionDao
} = require("../../dao/chaper-section.js")
const {
  CommentDao
} = require("../../dao/comment.js")

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: "/v1"
})

//创建专栏文章
router.post(`/chapter/section`, async (ctx) => {
  const body = ctx.request.body;
  ChapterSectionValidator.isEmpty(body)
  await ChapterSectionDao.create(body)
  ctx.body = {
    msg: "创建专栏文章成功",
    code: 0
  }
})

// 专栏文章详情
router.get(`/column/section/:id`, async (ctx) => {
  const id = ctx.params.id
  ChapterSectionValidator.isInt(id)
  const chapterDetail = await ChapterSectionDao.detail(parseInt(id))
  const section_comment = await CommentDao.targetComment(parseInt(id), 'column')
  chapterDetail.setDataValue('section_comment', section_comment.data)
  ctx.body = {
    code: 0,
    msg: '成功',
    data: chapterDetail
  }
})

// 获取专栏文章列表
router.get(`/column/section-list/:column_chapter_id`, async (ctx) => {
  const id = ctx.params.column_chapter_id
  ChapterSectionValidator.isInt(id)
  const list = await ChapterSectionDao.list(parseInt(id))
  ctx.body = {
    code: 0,
    msg: '成功',
    data: list
  }
})

//更新单篇专栏文章
router.put(`/column/article/:id`, new Auth(AUTH_ADMIN).m, async (ctx) => {
  const id = ctx.params.id
  const body = ctx.params.body
  ChapterSectionValidator.isInt(id)
  ChapterSectionValidator.isEmpty(body)
  await ChapterSectionDao.update(parseInt(id), body)
  ctx.body = {
    code: 0,
    msg: '成功'
  }
})

// 删除单篇专栏文章

router.delete(`/column/section/:id`, new Auth(AUTH_ADMIN).m, async (ctx) => {
  const id = ctx.params.id
  ChapterSectionValidator.isInt(id)
  await ChapterSectionDao.destory(parseInt(id))
  ctx.body = {
    code: 0,
    msg: "删除专栏文章成功"
  }
})

module.exports = router