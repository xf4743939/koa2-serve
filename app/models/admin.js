const Sequelize = require('sequelize')
const db = require("../config/dbCon.js")

const admin = db.define("admin", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: Sequelize.STRING,
  moment: {
    type: Sequelize.STRING,
    allowNull: false
  },
  avator: {
    type: Sequelize.STRING
  },

}, {
  freezeTableName: true,
  timestamps: false
})

module.exports = admin