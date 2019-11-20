const AdminDao = require('../dao/admin.js')
const {
  generateToken
} = require("../lib/util.js")
const {
  Auth
} = require('../middlewares/auth.js')

class LoginManager {
  static async adminLogin(email, password) {
    // 验证正好密码是否正确
    const admin = await AdminDao.verify(email, password)
    // 用用户id 权限id  生成token
    return generateToken(admin.id, Auth.ADMIN)
  }
}

module.exports = {
  LoginManager
}