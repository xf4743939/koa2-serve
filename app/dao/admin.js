const {
  Admin
} = require('../models/admin.js')

// 链接数据库
class AdminDao {
  // 创建管理员
  static async create(v) {
    const {
      email,
      password,
      nickname
    } = v
    const hasAdmin = await Admin.findOne({
      where: {
        email: email
      }
    })
    if (hasAdmin) {
      throw new global.errs.Existing('管理员已存在')
    }
    const admin = new Admin()
    admin.email = email
    admin.password = password
    admin.nickname = nickname
    admin.save()
  }
  // 查询管理员信息
  // static async 
}

module.exports = AdminDao