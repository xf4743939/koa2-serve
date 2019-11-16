const {
  Admin
} = require('../models/admin.js')

// 链接数据库
class AdvertiseDao {
  // 创建管理员
  static async create(v) {
    const hasAdmin = await Admin.findOne({
      where: {
        email: v.get('email')
      }
    })
    if (hasAdmin) {
      throw new global.errs.Existing('管理员已存在')
    }
    const admin = new Admin()
    admin.email = '243630262@qq.com'
    admin.password = '123'
    admin.nickname = '小布丁'
    admin.save()
  }
  // 查询管理员信息
  static async
}