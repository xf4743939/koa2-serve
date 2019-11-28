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
const AUTH_ADMIN = 16;

const router = new Router({
  prefix: '/v1'
})

/** 
 * 创建文章
 */
router.post(`/artice`, new Auth().m, async (ctx) => {
  const body = ctx.request.body
  ArticleValidator.valid(body)
  await ArticleDao.create()
})