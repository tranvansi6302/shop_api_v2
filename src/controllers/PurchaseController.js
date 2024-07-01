const PURCHASE_STATUS = require('../constants/purchaseStatus')
const { sequelize } = require('../databases/connect')
const Inventory = require('../models/Inventory')
const PurchaseDetail = require('../models/PurchaseDetail')
const PurchaseOrder = require('../models/PurchaseOrder')

const createPurchaseOrderController = async (req, res, next) => {
    const t = await sequelize.transaction()
    try {
        const { id: user_id } = req.user
        const { purchase_code, note, supplier_id, details } = req.body

        // Tạo đơn hàng
        const purchaseOrder = await PurchaseOrder.create(
            {
                purchase_code,
                note,
                supplier_id,
                user_id
            },
            { transaction: t }
        )

        // Validae purchase_code, supplier_id (có tồn tại không?), user_id (có tồn tại không?)

        // Tạo chi tiết đơn hàng
        Array.from(details).forEach(async (detail) => {
            //... check product_item_id -> return 404 if not found
            await PurchaseDetail.create({
                purchase_id: purchaseOrder.id,
                product_item_id: detail.product_item_id,
                quantity: detail.quantity,
                purchase_price: detail.purchase_price
            }),
                { transaction: t }
        })
        await t.commit()
        return res.status(201).json({
            success: true,
            message: 'Tạo đơn hàng thành công',
            result: purchaseOrder
        })
    } catch (error) {
        await t.rollback()
        next(error)
    }
}

const updatePurchaseOrderController = async (req, res, next) => {
    const t = await sequelize.transaction()
    try {
        const { id: purchaseOrderId } = req.params
        // Kiểm tra đơn hàng có tồn tại không?
        const { status } = req.body
        // Cập nhật đơn hàng
        const purchaseOrder = await PurchaseOrder.update(
            {
                status
            },
            {
                where: {
                    id: purchaseOrderId
                }
            }
        )
        if (status === PURCHASE_STATUS.CONFIRM) {
            // Tiến hành đưa vào kho

            const purchaseDetail = await PurchaseDetail.findAll({
                where: {
                    purchase_id: purchaseOrderId
                }
            })
            Array.from(purchaseDetail).forEach(async (detail) => {
                //... cập nhật số lượng nhận được
                await PurchaseDetail.update(
                    {
                        quantity_received: detail.quantity
                    },
                    {
                        where: {
                            id: detail.id
                        }
                    }
                )

                // Cập nhật trong kho
                const existedInventory = await Inventory.findOne({
                    where: {
                        product_item_id: detail.product_item_id
                    }
                })

                // TH1 sản phẩm chưa có trong kho -> thêm mới
                if (!existedInventory) {
                    await Inventory.create({
                        quantity: detail.quantity,
                        total_quantity: detail.quantity,
                        product_item_id: detail.product_item_id,
                        purchase_price: detail.purchase_price
                    })
                } else {
                    // TH2 sản phẩm đã có trong kho -> cập nhật số lượng
                    await Inventory.update(
                        {
                            quantity: existedInventory.quantity + detail.quantity,
                            total_quantity: existedInventory.total_quantity + detail.quantity
                        },
                        {
                            where: {
                                product_item_id: detail.product_item_id
                            }
                        }
                    )
                }
            })

            await t.commit()
        }
        return res.json({
            success: true,
            message: 'Cập nhật đơn hàng thành công',
            result: purchaseOrder
        })
    } catch (error) {
        await t.rollback()
        next(error)
    }
}

module.exports = {
    createPurchaseOrderController,
    updatePurchaseOrderController
}
