const { Router } = require('express')
const { createCategoryController } = require('../controllers/CategoryController')
const authMiddleware = require('../middlewares/authMiddleware')
const authorizedMiddeware = require('../middlewares/authorizedMiddeware')
const ROLE = require('../constants/role')
const { createPurchaseOrderController, updatePurchaseOrderController } = require('../controllers/PurchaseController')

// auth -> validator -> controller
const purchaseRouter = Router()
purchaseRouter.post('/', authMiddleware, authorizedMiddeware(ROLE.ADMIN), createPurchaseOrderController)
purchaseRouter.patch('/:id', authMiddleware, authorizedMiddeware(ROLE.ADMIN), updatePurchaseOrderController)

module.exports = purchaseRouter
