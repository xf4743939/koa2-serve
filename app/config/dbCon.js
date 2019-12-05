const Sequelize = require('sequelize')

const sqlConfig = {
  database: 'boy',
  host: '134.175.141.31',
  port: 3306,
  username: 'root',
  password: 'xuFAN4743939.',
}

const sequelize = new Sequelize(sqlConfig.database, sqlConfig.username, sqlConfig.password, {
  host: sqlConfig.host,
  dialect: 'mysql',
  port: sqlConfig.port,
  logging: true,
  define: {
    timestamps: true,
    paranoid: true, // 表示软删除
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true,
    scopes: {
      bh: {
        attributes: {
          exclude: ['created_at', 'updated_at', 'deleted_at']
        }
      },
      iv: {
        attributes: {
          exclude: ['content', 'password', 'updated_at', 'deleted_at']
        }
      }
    }
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
  force: false
})

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.')
}).catch(err => {
  console.error('Unable to connect to the database:', err)
})

module.exports = {
  sequelize
}