module.exports = {
  environment: 'dev',
  security: {
    secretKey: "secretKey",
    // 过期时间 1小时
    expiresIn: 60 * 60 * 24 * 30
  },
  wx: {
    appId: '',
    appSecret: '',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  }
}