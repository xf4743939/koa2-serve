//挂在到ctx 原形上
// const {
//     HttpException
// } = require("./exception.js")
// exports.success = (app) => {
//     app.context.success = function (ex) {
//         this.type = 'application/json';
//         const suc = new HttpException(ex);
//         let data = {
//             error_code: suc.errorCode,
//             msg: suc.msg,
//             url: this.req.url
//         };
//         this.status = suc.code;
//         this.body = JSON.stringify(data);
//     };
// };
