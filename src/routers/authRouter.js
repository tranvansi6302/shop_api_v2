const { Router } = require('express')
const {
    registerController,
    resendController,
    verifyEmailController,
    forgotPasswordController,

    verifyForgotTokenController,
    resetPasswordControler,
    loginController
} = require('../controllers/AuthController')
const { registerSchema } = require('../validations/authSchema')
const validatorMiddleware = require('../middlewares/validatorMiddleware')

const authRouter = Router()

authRouter.post('/register', validatorMiddleware(registerSchema), registerController)
authRouter.post('/resend-otp', resendController)
authRouter.post('/verify-email', verifyEmailController)
authRouter.post('/forgot-password', forgotPasswordController)
authRouter.post('/verify-forgot-token', verifyForgotTokenController)
authRouter.patch('/reset-password', resetPasswordControler)
authRouter.post('/login', loginController)

module.exports = authRouter
