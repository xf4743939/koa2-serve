const Router = require('koa-router')
const {
  Auth
} = require('../../middlewares/auth.js')
const {
  ArticleValidator
} = require('../../validators/article.js')
const {
  ArticleDao
} = require('../../dao/article.js')
const {
  CommentDao
} = require('../../dao/comment.js')

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: '/v1'
})

/** 
 * 创建文章
 */
router.post(`/article`, new Auth(AUTH_ADMIN).m, async (ctx) => {
  const body = ctx.request.body
  ArticleValidator.valid(body)
  await ArticleDao.create(body)
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    msg: "创建文章成功"
  }
})

/**
 * 删除文章
 */
router.delete(`/article/:id`, new Auth(AUTH_ADMIN).m, async (ctx) => {
  const id = ctx.params.id

  ArticleValidator.isInt(id)
  await ArticleDao.destroy(parseInt(id))
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    msg: "删除文章成功"
  }
})

/**
 * 更新文章 
 */
router.put(`/article/:id`, new Auth(AUTH_ADMIN).m, async (ctx) => {

  const id = ctx.params.id
  const body = ctx.request.body
  ArticleValidator.isInt(id)
  ArticleValidator.valid(body)
  await ArticleDao.update(parseInt(id), body)
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    msg: '更新文章成功'
  }
})

/**
 *获取文章列表 
 */
router.get(`/article`, async (ctx) => {
  // 获取页面 排序方法 分类id  搜索关键字
  // 查询文章

  const res = await ArticleDao.list(ctx.query)
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    msg: "成功",
    data: {
      ...res
    }
  }
})

/**
 * 获取文章详情 
 * @Date 2019/12/06 完成文章详情
 */
router.get(`/article/:id`, async (ctx) => {
  const id = ctx.params.id
  ArticleValidator.isInt(id)
  const article = await ArticleDao.detail(parseInt(id))
  //获取关联文章的评论列表
  const commentList = await CommentDao.targetComment({
    target_id: article.target_id,
    target_type: article.target_type
  })
  /* ***** */
  // 更新文章浏览
  await ArticleDao.updateBrowse(parseInt(id), ++article)
  await article.setDataValue('comments', commentList)
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    data: article,
    msg: "成功",
  }
})

/**
 * 返回首页的文章和专栏
 * @data 2019/12/06
 * 暂未完成
 */
router.get('/home', async (ctx) => {
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    msg: "回首页成功"
  }
})
module.exports = router