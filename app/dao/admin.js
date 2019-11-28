const bcrypt = require('bcryptjs')

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
        email: email,
        deleted_at: null
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

  // 验证密码
  static async verify(email, plainPassword) {
    // 查询用户是否存在
    const admin = await Admin.findOne({
      where: {
        email: email
      }
    })
    if (!admin) {
      throw new global.errs.AuthFailed('账号不存在')
    }
    // 验证密码是否正确
    const corret = bcrypt.compareSync(plainPassword, admin.password)
    if (!corret) {
      throw new global.errs.AuthFailed('账号不存在或密码不正确')
    }
    return admin
  }

  // 查询管理员信息
  static async detail(id) {
    const admin = await Admin.scope('iv').findOne({
      where: {
        id
      }
    })
    if (!admin) {
      throw new global.errs.AuthFailed('账号不存在或者密码不正确')
    }
    return admin
  }
}

module.exports = AdminDao