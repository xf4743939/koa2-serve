const Sequelize = require('sequelize')

const sqlConfig = {
  database: 'boy',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
}

const sequelize = new Sequelize(sqlConfig.database, sqlConfig.username, sqlConfig.password, {
  host: sqlConfig.host,
  dialect: 'mysql',
  port: sqlConfig.port,
  logging: true,
  define: {
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    underscored: true
  },
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  },
  timezone: '+08:00' //东八时区
})
// 自动同步所有model
sequelize.sync({
  force: true
})

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.')
}).catch(err => {
  console.error('Unable to connect to the database:', err)
})

module.exports = {
  sequelize
}