const AdminDao = require("../dao/admin.js")

const adminDao = new AdminDao()
class Admin {
    constructor() {
        super()
    }
    async login(ctx) {
        const {
            user_name,
            password
        } = ctx.request.body
        if (!user_name || !password) {
            ctx.body = {
                status: 0,
                message: "用户名或密码为空"
            }
            return
        }
        try {
            const admin = await adminDao.getAdminByName(user_name)
            if(!admin){
                const  adminTip="管理员"
            }

        } catch (error) {

        }
    }
}