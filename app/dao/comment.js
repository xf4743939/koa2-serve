const {
  Comment
} = require('../models/comment.js')
const {
  Reply
} = require('../models/reply.js')
class CommentDao {
  // 创建评论
  static async create(v) {
    const comment = new Comment()
    comment.target_id = +v.target_id
    comment.target_type = v.target_type
    comment.nickname = v.nickname
    comment.email = v.email
    comment.content = v.content
    return comment.save()
  }
  // 删除评论
  static async destroy(id) {
    const comment = await Comment.findOne({
      id,
      deleted_at: null
    })
    if (!comment) {
      throw new global.errs.NotFound('没有找到相关评论')
    }
    comment.destroy()
  }
  // 获取评论详情
  static async detail(id) {
    const comment = await Comment.scope('iv').findOne({
      id,
      deleted_at: null,
      attributes: {
        exclude: ['email', 'updated_at']
      },
      include: [{
        model: 'Reply',
        as: 'reply',
        attributes: {
          exclude: ['email', 'updated_at', 'deleted_at']
        }
      }]
    })
    if (!comment) {
      throw new global.errs.NotFound('没有找到相关评论')
    }
    return comment
  }
  //更新评论
  static async update(id, v) {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      throw new global.errs.NotFound('没有找到相关评论')
    }
    comment.target_id = v.target_id
    comment.target_type = v.target_type
    comment.nickname = v.nickname
    comment.email = v.email
    comment.content = v.content
    comment.save()
  }
  // 获取评价列表
  static async list(page = 1) {
    const pageSize = 10
    const comment = await Comment.findAndCountAll({
      where: {
        deleted_at: null
      },
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [
        ['created_at', 'DESC']
      ],
      attributes: {
        exclude: ['updated_at']
      }
    })
    return {
      cur_page: parseInt(page),
      comments: comment.rows,
      count: comment.count,
      total: comment.count,
      total_page: Math.ceil(comment.count / 10)
    }
  }

  // 关联目标下的评论
  static async targetComment(params = {}) {
    const {
      target_id,
      target_type,
      page = 1,
      desc = "created_at"
    } = params
    const pageSize = 10
    const comment = await Comment.findAndCountAll({
      target_id,
      target_type,
      deleted_at: null,
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [
        [desc, 'DESC']
      ],
      attributes: {
        exclude: ['email', 'undated_at']
      },
      include: [{
        model: Reply,
        as: 'reply',
        attributes: {
          exclude: ['email', 'undated_at', 'deleted_at']
        }
      }]
    })
    return {
      cur_page: parseInt(page),
      comments: comment.rows,
      count: comment.count,
      total: comment.count,
      total_page: Math.ceil(comment.count / 10)
    }
  }
}
module.exports = {
  CommentDao
}