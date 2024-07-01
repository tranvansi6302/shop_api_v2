const Brand = require('../models/Brand')
const Category = require('../models/Category')

const createBrandController = async (req, res) => {
    // const { id: userId } = req.user

    const { name } = req.body

    const existedBrand = await Brand.findOne({
        where: {
            name
        }
    })
    if (existedBrand) {
        return res.status(400).json({
            success: false,
            message: 'TH đã tồn tại'
        })
    }

    // Tạo mới
    const brand = await Brand.create({
        name
    })
    return res.status(201).json({
        success: true,
        message: 'Tạo TH thành công',
        result: brand
    })
}

module.exports = {
    createBrandController
}
