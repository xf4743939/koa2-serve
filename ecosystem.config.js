module.exports = {
  apps: [{
    name: 'API',
    script: 'app.js',
    env: {
      COMMON_VARIABLE: "true"
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    // 生成环境
    production: {
      user: 'Administrator', //登录远程服务器的用户名
      host: '134.175.141.31', //"远程服务器的IP或hostname
      ref: 'origin/master', //远端名称及分支名
      repo: 'git@github.com:xf4743939/koa2-serve.git', //git地址
      path: '/production', //远程服务器部署目录
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js --env production'
      // 部署后需要执行的命令
    },
    // 开发环境
    dev: {

    }
  }
};