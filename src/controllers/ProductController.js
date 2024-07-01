const { sequelize } = require('../databases/connect')
const Product = require('../models/Product')
const ProductItem = require('../models/ProductItem')

const createProductController = async (req, res, next) => {
    const t = await sequelize.transaction()
    try {
        const { name, description, sku, category_id, brand_id, colors, sizes } = req.body
        // Check brand and category
        const product = await Product.create(
            {
                name,
                description,
                sku: sku.toUpperCase(),
                category_id,
                brand_id
            },
            {
                transaction: t
            }
        )

        for (let color of colors) {
            for (let size of sizes) {
                await ProductItem.create(
                    {
                        product_id: product.id,
                        color: color.toUpperCase(),
                        size: size.toUpperCase(),
                        sku: `${sku.toUpperCase()}-${color.toUpperCase()}-${size.toUpperCase()}`,
                        item_name: `${product.name} - ${color} - ${size}`
                    },
                    {
                        transaction: t
                    }
                )
            }
        }
        await t.commit()

        return res.status(201).json({
            success: true,
            message: 'Product created successfully',
            result: product
        })
    } catch (error) {
        await t.rollback()
        next(error)
    }
}

module.exports = {
    createProductController
}
