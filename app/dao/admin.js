const Op = require("sequelize").Op
const admin = require("../models/admin.js")

class AdminDao {
    async getAdminByName(user_name) {
        const admin = await admin.findOne({
            where: {
                user_name: {
                    [Op.eq]: user_name
                }
            }
        })
        return admin
    }
}
module.exports = AdminDao