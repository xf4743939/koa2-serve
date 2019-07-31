const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require("@koa/cors")
const serve = require("koa-static")
const path = require("path")
const InitManager = require('./lib/core.js')
const {
    error
} = require("./lib/error.js")
const app = new koa();


app.use(bodyParser())
app.use(cors()) //配置跨域

const main = serve(path.join(__dirname))
app.use(main)

app.on("error", error)

InitManager.initApp(app)

app.listen(3000, () => {
    console.log(`listening at port 3000`)
})