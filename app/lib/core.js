const db = require("../config/dbCon.js")
const Router = require("koa-router")
// 使用require-directory加载路由文件夹下的所有router
const requireDirectory = require('require-directory')
const {
    success
} = require("./extends.js")

class InitManager {
    static initApp(app) {
        this.app = app
        //2.扩展ctx原型方法
        // this.applyDefaultExtends()
        //4.同步数据库
        //5.加载认证jwt
        //6.挂在路由
        this.loadRouter()
    }
    async applyDB() {

    }
    static loadRouter() {

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

    // static applyDefaultExtends() {
    //     success(InitManager.app)
    // }

}

module.exports = InitManager