const { Router } = require('express')
const { createCategoryController } = require('../controllers/CategoryController')
const authMiddleware = require('../middlewares/authMiddleware')
const authorizedMiddeware = require('../middlewares/authorizedMiddeware')
const ROLE = require('../constants/role')
const { createProductController } = require('../controllers/ProductController')

// auth -> validator -> controller
const productRouter = Router()
productRouter.post('/', authMiddleware, authorizedMiddeware(ROLE.ADMIN), createProductController)

module.exports = productRouter
