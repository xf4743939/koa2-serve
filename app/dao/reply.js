const {
  Reply
} = require('../models/reply.js')
const {
  Comment
} = require('../models/comment.js')
class ReplyDao {
  // 创建回复
  static async create(v) {
    // 查询评论 
    const id = +v.comment_id
    const comment = await Comment.findByPk(id)
    if (!comment) {
      throw new global.errs.NotFound("没有找到相关评论")
    }
    const reply = new Reply()
    reply.comment_id = id
    reply.nickname = v.nickname
    reply.email = v.email
    reply.content = v.content
    return reply.save()
  }

  // 获取回复详情
  static async detail(id) {
    const reply = await Reply.scope('iv').findOne({
      id,
      deleted_at: null,
      attributes: {
        exclude: ['email', 'updated_at']
      }
    })
    if (!reply) {
      throw new global.errs.NotFound('没有找到相关评论信息')
    }
    return reply
  }

  // 删除回复
  static async destroy(id) {
    const reply = await Reply.findOne({
      id,
      deleted_at: null
    })
    if (!reply) {
      throw new global.errs.NotFound('没有找到相关回复')
    }
    reply.destroy()
  }

  //更新回复
  static async update(id, v) {

    const reply = await Reply.findByPk(id);
    if (!reply) {
      throw new global.errs.NotFound('没有找到相关评论信息')
    }
    reply.comment_id = v.comment_id
    reply.nickname = v.nickname
    reply.email = v.email
    reply.content = v.content
    reply.save()
  }
  // 获取回复列表
  static async list(comment_id) {
    return await Reply.findAll({
      where: {
        comment_id,
        deleted_at: null
      },
      order: [
        ['created_at', 'DESC']
      ],
    })
  }
}
module.exports = {
  ReplyDao
}