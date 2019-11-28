const {
  Category
} = require('../models/category.js')
class CategoryDao {
  // 创建分类
  static async create(body) {
    const hasCategory = await Category.findOne({
      where: {
        name: body.name,
        deleted_at: null
      }
    })
    if (hasCategory) {
      throw new global.errs.Existing('分类已经存在')
    }
    const category = new Category()
    category.name = body.name
    category.key = body.key
    category.parent_id = body.parent_id || 0
    category.save()
  }
  // 删除分类
  static async destory(id) {
    const category = await Category.findOne({
      where: {
        id,
        deleted_at: null
      }
    })
    if (!category) {
      throw new global.errs.NotFound('没有找到相关分类')
    }
    category.destroy()
  }
  // 获取分类详情
  static async detail(id) {
    const category = await Category.scope('bh').findOne({
      where: {
        id,
        deleted_at: null
      }
    })
    if (!category) {
      throw new global.errs.NotFound('没有找到相关分类')
    }
    return category
  }
  // 更新分类
  static async update(id, v) {
    const category = await Category.findOne({
      where: {
        id,
        deleted_at: null
      }
    })
    if (!category) {
      throw new global.errs.NotFound('没有找到相关分类')
    }
    category.name = v.name
    category.key = v.key
    category.parent_id = v.parent_id
    category.save()
  }
  // 获取分类列表
  static async list() {
    return await Category.scope('bh').findAll({
      where: {
        deleted_at: null
      }
    })
  }
}
module.exports = {
  CategoryDao
}