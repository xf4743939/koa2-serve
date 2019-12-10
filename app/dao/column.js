const {
  Column
} = require("../models/column.js")

class ColumnDao {
  static async create(body) {
    const hasColumn = await Column.findOne({
      where: {
        title: body.title,
        deleted_at: null
      }
    })
    if (hasColumn) {
      throw new global.errs.Existing('专栏标题已存在')
    }
    const column = new Column()
    column.title = body.title
    column.author = body.author
    column.description = body.description
    column.cover = body.cover
    column.save()
  }
}

module.exports = {
  ColumnDao
}