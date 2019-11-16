const {
  Sequelize,
  Model
} = require('sequelize')
const {
  db
} = require('../lib/core.js')

class Advertise extends Model {}

Advertise.init({
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
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
  ceeatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
}, {
  db,
  modelName: 'advertise',
  tableName: 'advertise'
})

module.exports = {
  Advertise
}