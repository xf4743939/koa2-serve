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