const Sequelize = require("sequelize")
const address = require("../models/address.js")

class AddressDao {
    async getAddress(name) {
        const addresses = await address.findOne({
            where: {
                user_name: name
            }
        });
        return addresses
    }
}
module.exports = {
    AddressDao
}