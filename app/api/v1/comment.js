const Router = require('koa-router')
const AUTH_ADMIN = 16;
const {
  Auth
} = require('../../middlewares/auth.js')

const {
  CommentValidator
} = require("../../validators/comment.js")
const {
  CommentDao
} = require('../../dao/comment.js')

const router = new Router({
  prefix: "/v1"
})

//  创建评论
router.post(`/comment`, async (ctx) => {
  const body = ctx.request.body
  CommentValidator.isEmpty(body)
  const comment = await CommentDao.create(body)
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    msg: "创建评论成功",
    data: comment
  }
})

// 获取评论详情
router.get(`/comment/:id`, async (ctx) => {
  const id = ctx.params.id
  CommentValidator.isInt(id)
  const comment = await CommentDao.detail(parseInt(id))
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    msg: "成功",
    data: comment
  }
})

// 获取评论列表
router.get(`/comment`, async (ctx) => {
  const page = +ctx.query.page || 1
  const res = await CommentDao.list(page)
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    msg: '成功',
    data: {
      ...res
    }
  }
})

// 更新评论
router.put(`/comment/:id`, new Auth(AUTH_ADMIN).m, async (ctx) => {
  const id = ctx.params.id
  const body = ctx.request.body

  CommentValidator.isInt(id)
  CommentValidator.isEmpty(body)

  await CommentDao.update(parseInt(id), body)
  ctx.response.status = 200
  ctx.body = {
    msg: '更新评论成功',
    code: 0
  }
})

// 删除评论
router.delete(`/comment/:id`, new Auth(AUTH_ADMIN).m, async (ctx) => {
  const id = ctx.params.id
  CommentValidator.isInt(id)
  await CommentDao.destroy(parseInt(id))
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    msg: '删除评论成功'
  }
})

// 获取关联目标下的评论列表
router.get(`/comment/target/list`, async (ctx) => {
  const query = ctx.query
  let res = CommentDao.targetComment(query)
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    msg: '成功',
    ...res
  }
})

module.exports = router