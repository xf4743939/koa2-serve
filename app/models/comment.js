const Sequelize = require('sequelize')
const db = require("../config/dbCon.js")

const comment = db.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    moment: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    post_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    avator: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
}, {
    freezeTableName: true,
    timestamps: false
})
module.exports = comment