// const Sequelize = require('sequelize')
// const db = require("../config/dbCon.js")

// const address = db.define('address', {
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//         unique: true,
//     },
//     address: {
//         type: Sequelize.STRING(100),
//         allowNull: false
//     },
//     phone: {
//         type: Sequelize.STRING(30),
//         allowNull: false
//     },
//     user_id: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     }
// }, {
//     freezeTableName: true,
//     timestamps: false
// })

// module.exports = address