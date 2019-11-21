module.exports = {
  environment: 'dev',
  security: {
    secretKey: "59c1448617ebe1f145dd24f634a81dac",
    // 过期时间 1小时
    expiresIn: 60 * 60 * 24 * 30
  },
  wx: {
    appId: 'wxc3fddfaf5c520b76',
    appSecret: '59c1448617ebe1f145dd24f634a81dac',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  }
}