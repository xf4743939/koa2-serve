const Sequelize = require('sequelize')
const chalk = require("chalk")
const sqlConfig = {
  database: 'lin-cms',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
}

const db = new Sequelize(sqlConfig.database, sqlConfig.username, sqlConfig.password, {
  host: sqlConfig.host,
  dialect: 'mysql',
  port: sqlConfig.port,
  logging: true,
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  },
  timezone: '+08:00' //东八时区
})

// 自动同步所有model
db.sync({
  force: false
})

module.exports = {
  db
}