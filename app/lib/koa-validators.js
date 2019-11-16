const validator = require('validator')
const {
  ParamException
} = './exception.js'
const {
  get,
  last,
  set,
  cloneDeep
} = require('lodash')

class LinValidar {
  constructor() {
    this.data = {}
    this.parsed = {}
  }
  _assembleAllParams(ctx) {
    return {
      body: ctx.request.body,
      query: ctx.request.query,
      path: ctx.path,
      header: ctx.request.header
    }
  }
  get(path, parsed = true){
    
  }
}