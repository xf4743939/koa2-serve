// const db = require("./dbCon.js")
// const fs = require("fs")
// const modelDir = `${process.cwd()}/app/models`
// const files = fs.readdirSync(modelDir)
// const js_files = files.filter((f) => {
//     return f.endsWith(".js")
// }, files)
// module.exports = {}

// for (let f of js_files) {
//     console.log(`import model from file ${f}`)
//     const name = f.substring(0, f.length - 3);
//     module.exports[name] = require(modelDir + "/" +
//         f)
// }
// db.sync()