const { USER_STATUS } = require('../constants/userStatus')
const User = require('../models/User')
const UserOtp = require('../models/UserOtp')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const emailService = require('../services/MailService')
const generateOTP = require('../utils/randomOTP')
const TOKEN_TYPE = require('../constants/tokenType')
const Token = require('../models/Token')
const randomBytes = require('../utils/randomBytes')
const { omit } = require('lodash')
const e = require('express')

const registerController = async (req, res, next) => {
    try {
        const { fullname, email, password } = req.body
        const existedUser = await User.findOne({
            where: {
                email
            }
        })

        if (existedUser) {
            return res.status(404).json({
                success: false,
                message: 'Email đã tồn tại'
            })
        }

        // Thêm vào database
        const otp = generateOTP()
        const [createdUser] = await Promise.all([
            User.create({
                fullname,
                email,
                password: bcrypt.hashSync(password),
                role_id: 2
            }),

            // Xác thực tài khoản
            UserOtp.create({
                email,
                otp
            }),

            emailService.sendMail(
                email,
                'Đăng ký tài khoản thành công',
                'Chúc mừng bạn đã đăng ký tài khoản thành công',
                `<h1 style={color:'red'}>Mã OTP của bạn là: ${otp}</h1>`
            )
        ])

        const user = createdUser.dataValues

        const finalUser = omit(user, ['password'])

        return res.status(201).json({
            success: true,
            message: 'Đăng ký thành công',
            result: finalUser
        })
    } catch (err) {
        next(err)
    }
}

// body: {email: string}
const resendController = async (req, res) => {
    const { email } = req.body
    const existedUser = await User.findOne({
        where: {
            email
        }
    })
    const isVerified = existedUser && existedUser.status === USER_STATUS.ACTIVE
    if (isVerified) {
        return res.status(404).json({
            success: false,
            message: 'Tài khoản đã được xác thực'
        })
    }

    // Kiểm tra có tồn email không
    if (!existedUser) {
        return res.status(404).json({
            success: false,
            message: 'Email không tồn tại'
        })
    }

    // Kiểm tra đã có mã chưa
    const existedOtp = await UserOtp.findOne({
        where: {
            email
        }
    })
    existedOtp && (await existedOtp.destroy())

    UserOtp.create({
        email,
        otp: generateOTP()
    })

    return res.json({
        success: true,
        message: 'Gửi lại mã OTP thành công'
    })
}

// body: {email: string, otp: string}
const verifyEmailController = async (req, res) => {
    const { email, otp } = req.body
    const existedOtp = await UserOtp.findOne({
        where: {
            email,
            otp
        }
    })
    if (!existedOtp) {
        return res.status(400).json({
            success: false,
            message: 'Mã OTP không chính xác'
        })
    }

    // Cập nhật status của user -> User
    // Delete opt trong UserOtp -> UserOtp
    await Promise.all([
        // Cập nhật status của user -> User
        User.update(
            {
                status: USER_STATUS.ACTIVE
            },
            {
                where: {
                    email
                }
            }
        ),

        // Delete opt trong UserOtp -> UserOtp
        existedOtp.destroy()
        // UserOtp.destroy({
        //     where: {
        //         email
        //     }
        // })
    ])
    return res.json({
        success: true,
        message: 'Xác thực email thành công'
    })
}

const forgotPasswordController = async (req, res) => {
    const { email } = req.body
    const existedUser = await User.findOne({
        where: {
            email
        }
    })
    if (!existedUser) {
        return res.status(404).json({
            success: false,
            message: 'Email không tồn tại'
        })
    }

    const existedToken = await Token.findOne({
        where: {
            email,
            type: TOKEN_TYPE.RESET_PASSWORD
        }
    })
    if (existedToken) {
        await existedToken.destroy()
        const token = randomBytes(32)
        await Token.create({
            email,
            token,
            type: TOKEN_TYPE.RESET_PASSWORD
        })
        // Send mail // https://localhost:3000/api/auth/forgot-password?token=abcz
        return res.status(201).json({
            success: true,
            message: 'Vui lòng kiểm tra email để reset mật khẩu'
        })
    }

    // Tạo token
    const token = randomBytes(32)
    await Token.create({
        email,
        token,
        type: TOKEN_TYPE.RESET_PASSWORD
    })

    // Send mail // https://localhost:3000/api/auth/forgot-password?token=abcz
    console.log(token)

    return res.status(201).json({
        success: true,
        message: 'Vui lòng kiểm tra email để reset mật khẩu'
    })
}

const verifyForgotTokenController = async (req, res) => {
    const { token } = req.body

    const existedToken = await Token.findOne({
        where: {
            token,
            type: TOKEN_TYPE.RESET_PASSWORD
        }
    })
    if (!existedToken) {
        return res.status(400).json({
            success: false,
            message: 'Token không hợp lệ'
        })
    }
    // await existedToken.destroy()
    return res.json({
        success: true,
        message: 'Xác thực token thành công'
    })
}

const resetPasswordControler = async (req, res) => {
    const { token, new_password } = req.body
    const existedToken = await Token.findOne({
        where: {
            token,
            type: TOKEN_TYPE.RESET_PASSWORD
        }
    })
    if (!existedToken) {
        return res.status(400).json({
            success: false,
            message: 'Token không hợp lệ'
        })
    }
    // Hợp lệ
    await User.update(
        {
            // Mã hóa mật khẩu
            password: bcrypt.hashSync(new_password)
        },
        {
            where: {
                email: existedToken.email
            }
        }
    )
    const user = await User.findOne({
        where: {
            email: existedToken.email
        },
        attributes: {
            exclude: ['password']
        }
    })
    await existedToken.destroy()

    return res.json({
        success: true,
        message: 'Reset mật khẩu thành công',
        result: user
    })
}

const loginController = async (req, res) => {
    const { email, password } = req.body
    const existedUser = await User.findOne({
        where: {
            email
        }
    })
    const isMatch = bcrypt.compareSync(password, existedUser.password)
    if (!isMatch || !existedUser) {
        return res.status(400).json({
            success: false,
            message: 'Email hoặc mật khẩu không chính xác'
        })
    }

    // Tạo token
    const token = jwt.sign(
        {
            id: existedUser.id
        },
        'ABC@12681HKHDISD',
        {
            expiresIn: '1d'
        }
    )
    return res.json({
        success: true,
        message: 'Đăng nhập thành công',
        result: {
            token,
            user: omit(existedUser.dataValues, ['password'])
        }
    })
}

module.exports = {
    registerController,
    resendController,
    verifyEmailController,
    forgotPasswordController,
    verifyForgotTokenController,
    resetPasswordControler,
    loginController
}
