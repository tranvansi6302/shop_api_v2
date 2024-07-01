const { Router } = require('express')
const { createCategoryController } = require('../controllers/CategoryController')
const authMiddleware = require('../middlewares/authMiddleware')
const authorizedMiddeware = require('../middlewares/authorizedMiddeware')
const ROLE = require('../constants/role')

// auth -> validator -> controller
const categoryRouter = Router()
categoryRouter.post('/', authMiddleware, authorizedMiddeware(ROLE.ADMIN), createCategoryController)

module.exports = categoryRouter
