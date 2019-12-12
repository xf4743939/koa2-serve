const {
  ColumnChapter
} = require("../models/column_chapter.js")
const {
  ChapterSection
} = require("../models/chaper-section.js")

class ColumnChapterDao {
  static async create(body) {
    const hasChapter = await ColumnChapter.findOne({
      where: {
        title: body.title,
        deleted_at: null
      }
    })
    if (hasChapter) {
      throw new global.errs.Existing('专栏章节已经存在')
    }
    const chapter = new ColumnChapter()
    chapter.title = body.title
    chapter.column_id = Number(body.column_id)
    chapter.save()
  }

  static async detail(id) {
    const chapter = await ColumnChapter.findOne({
      where: {
        id,
        deleted_at: null
      },
      include: [{
        model: ChapterSection,
        as: "chapter_section",
        attributes: {
          exclude: ['updated_at', 'deleted_at']
        }
      }]
    })
    if (!chapter) {
      throw new global.errs.NotFound('没有找到相关专栏章节')
    }
    return chapter
  }

  static async list(id) {
    return await ColumnChapter.findAll({
      where: {
        column_id: id,
        deleted_at: null
      },
      order: [
        ['created_at', 'DESC']
      ]
    })
  }

  static async update(id, body) {
    const chapter = await ColumnChapter.findByPk(id)
    if (!chapter) {
      throw new global.errs.NotFound('专栏章节不存在')
    }
    chapter.title = body.title
    chapter.column_id = Number(body.column_id)
    chapter.save()
  }

  static async destory(id) {
    const chapter = await ColumnChapter.findOne({
      where: {
        id,
        deleted_at: null
      }
    })
    if (!chapter) {
      throw new global.errs.NotFound('专栏章节不存在')
    }
    chapter.destroy()
  }

}

module.exports = {
  ColumnChapterDao
}