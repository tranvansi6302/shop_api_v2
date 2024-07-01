const { Router } = require('express')
const { createCategoryController } = require('../controllers/CategoryController')
const authMiddleware = require('../middlewares/authMiddleware')
const authorizedMiddeware = require('../middlewares/authorizedMiddeware')
const ROLE = require('../constants/role')
const { createBrandController } = require('../controllers/BrandController')

// auth -> validator -> controller
const brandRouter = Router()
brandRouter.post('/', authMiddleware, authorizedMiddeware(ROLE.ADMIN), createBrandController)

module.exports = brandRouter
