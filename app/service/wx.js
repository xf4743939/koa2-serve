const util = require('util')
const axios = require('axios')
const {
  generateToken
} = require("../lib/util.js")
const {
  Auth
} = require('../middlewares/auth.js')
const {
  User
} = require('../models/user.js')
class WXManager {
  static async codeToToken(code) {
    // code  小程序生成微信
    // openid 唯一标识 鉴定
    // code appid appsecret 三个 
    const url = util.format(global.config.wx.loginUrl,
      global.config.wx.appId,
      global.config.wx.appSecret,
      code
    )
    const result = await axios.get(url)
    if (result.status !== 200) {
      throw new global.errs.AuthFailed('openId获取失败')
    }
    if (result.data.errcode) {
      throw new global.errs.AuthFailed(result.data.errmsg)
    }
    const {
      openid,
      session_key
    } = result.data
    let user = await User.getUserByOpenid(openid)
    if (!user) {
      user = await User.registerByOpenid(openid)
    }
    return generateToken(openid, Auth.USER)
  }
}

module.exports = {
  WXManager
}