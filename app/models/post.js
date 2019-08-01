const Sequelize = require('sequelize')
const db = require("../config/dbCon.js")

const post = db.define('post', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    title: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    md: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    uid: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    moment: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    comments: {
        type: Sequelize.STRING(200),
        allowNull: false,
        defaultValue: 0
    },
    pv: {
        type: Sequelize.STRING(40),
        allowNull: false,
        defaultValue: 0
    },
    avator: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
}, {
    freezeTableName: true,
    timestamps: false
})
module.exports = post