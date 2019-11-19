const Router = require("koa-router")
// 使用require-directory加载路由文件夹下的所有router
const requireDirectory = require('require-directory')


class InitManager {
  static initApp(app) {
    InitManager.app = app
    //2.扩展ctx原型方法
    // this.applyDefaultExtends()
    //4.同步数据库
    //5.加载认证jwt
    //6.挂在路由
    InitManager.loadRouter()
    InitManager.loadHttpException()
    InitManager.loadConfig()
  }
  async applyDB() {

  }
  // 加载全部路由
  static loadRouter() {
    // 绝对路径
    const apiDir = `${process.cwd()}/app/api`
    requireDirectory(module, apiDir, {
      visit: whenLoadModule
    })

    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes(), obj.allowedMethods())
      }
    }
  }

  // 处理异常
  static loadHttpException() {
    const errors = require('./exception.js')
    global.errs = errors
  }

  static loadConfig(path = '') {
    const configPath = path || `${process.cwd()}/app/config/config.js`
    const config = require(configPath)
    global.config = config
  }

}

module.exports = InitManager