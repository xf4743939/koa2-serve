const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require("@koa/cors")
const json = require("koa-json")
const logger = require("koa-logger")
const InitManager = require('./app/lib/core.js')
const catchError = require('./app/middlewares/exceptions')
const app = new koa();
app.use(cors()) //配置跨域
app.use(catchError())
app.use(bodyParser())
app.use(json())
app.use(logger())


InitManager.initApp(app)

app.listen(3000, () => {
  console.log(`listening at port 3000`)
})