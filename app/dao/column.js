const {
  Column
} = require("../models/column.js")
const {
  ColumnChapter
} = require("../models/column_chapter.js")
const {
  ChapterSection
} = require("../models/chaper-section.js")

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

  static async detail(id) {
    const column = await Column.findOne({
      where: {
        id,
        deleted_at: null
      },
      include: [{
        model: ColumnChapter,
        as: 'column_chapter',
        attributes: {
          exclude: ['deleted_at', 'updated_at']
        },
        include: [{
          model: ChapterSection,
          as: "chapter_section",
        }]
      }]
    })
    if (!column) {
      throw new global.errs.NotFound('没有找到相关专栏')
    }
    return column
  }

  static async list(page = 1) {
    const data = await Column.findAndCountAll({
      where: {
        deleted_at: null
      },
      limit: page,
      offset: (page - 1) * 10,
      order: [
        ['created_at', 'DESC']
      ],
    })
    return {
      cur_page: page,
      total: data.count,
      total_page: Math.ceil(article.count / 10),
      columns: data.rows
    }
  }

  static async update(id, body) {
    const column = await Column.findByPk(id)
    if (!column) {
      throw new global.errs.NotFound('专栏不存在')
    }
    column.title = body.title
    column.author = body.author
    column.description = body.description
    column.cover = body.cover
    column.save()
  }

  static async destory(id) {
    const column = await Column.findOne({
      where: {
        id,
        deleted_at: null
      }
    })
    if (!column) {
      throw new global.errs.NotFound('专栏不存在')
    }
    column.destroy()
  }

}


module.exports = {
  ColumnDao
}