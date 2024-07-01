const Category = require('../models/Category')

const createCategoryController = async (req, res) => {
    // const { id: userId } = req.user

    const { name } = req.body

    const existedCategory = await Category.findOne({
        where: {
            name
        }
    })
    if (existedCategory) {
        return res.status(400).json({
            success: false,
            message: 'Loại sản phẩm đã tồn tại'
        })
    }

    // Tạo mới
    const category = await Category.create({
        name
    })
    return res.status(201).json({
        success: true,
        message: 'Tạo loại sản phẩm thành công',
        result: category
    })
}

module.exports = {
    createCategoryController
}
