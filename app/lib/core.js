const Router = require("koa-router")
// 使用require-directory加载路由文件夹下的所有router
const requireDirectory = require('require-directory')

class InitManager {
  static initApp(app) {
    this.app = app
    //2.扩展ctx原型方法
    // this.applyDefaultExtends()
    //4.同步数据库
    //5.加载认证jwt
    //6.挂在路由
    InitManager.loadRouter()
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

}

module.exports = InitManager