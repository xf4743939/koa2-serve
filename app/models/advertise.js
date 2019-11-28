const moment = require('moment')
const {
  Sequelize,
  Model
} = require('sequelize')
const {
  sequelize
} = require("../config/dbCon.js")

class Advertise extends Model {}

Advertise.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: '广告标题'
  },
  link: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: '广告链接'
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Date.now,
    get() {
      return moment(this.getDataValue('created_at')).format("YYYY-MM-DD")
    }
  }
}, {
  sequelize,
  modelName: 'advertise',
  tableName: 'advertise'
})

module.exports = {
  Advertise
}