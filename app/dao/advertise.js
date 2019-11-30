const {
  Advertise
} = require('../models/advertise.js')

// 链接数据库
class AdvertiseDao {
  // 创建管理员
  static async create(v) {
    const title = v.title
    const hasAdvertise = await Advertise.findOne({
      where: {
        title
      }
    })

    if (hasAdvertise) {
      throw new global.errs.Existing('广告已存在')
    }
    const advertise = new Advertise()
    advertise.title = v.title
    advertise.link = v.link
    return advertise.save()
  }
  // 删除广告
  static async destory(id) {
    const advertise = await Advertise.findOne({
      where: {
        id,
        deleted_at: null
      }
    })
    if (!advertise) {
      throw new global.errs.NotFound('没有找到相关广告')
    }
    advertise.destroy()
  }

  // 获取广告详情
  static async detail(id) {
    const advertise = await Advertise.scope('iv').findOne({
      where: {
        id,
        deleted_at: null
      }
    })
    if (!advertise) {
      throw new global.errs.NotFound('没有找到相关广告')
    }
    return advertise
  }

  //更新广告
  static async update(id, v) {
    const advertise = await Advertise.findByPk(id)
    if (!advertise) {
      throw new global.errs.NotFound('没有找到相关广告')
    }
    advertise.title = v.title
    advertise.link = v.link
    advertise.save()
  }

  // 获取广告列表
  static async list(page = 1, pageSize = 10) {
    const advertise = await Advertise.scope('bh').findAndCountAll({
      where: {
        deleted_at: null
      }, // 排序
      order: [
        ['created_at', 'DESC']
      ],
      offset: (page - 1) * pageSize,
      limit: pageSize //每页十条
    })
    return {
      cur_page: parseInt(page),
      advertises: advertise.rows,
      count: advertise.count,
      total: advertise.count,
      total_page: Math.ceil(advertise.count / 10)
    }
  }
}

module.exports = AdvertiseDao