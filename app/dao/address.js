const Sequelize = require("sequelize")
const address = require("../models/address.js")

class AddressDao {
    async getAddress() {
        const addresses = await address.findAll({});
        return addresses
    }
}
module.exports = {
    AddressDao
}