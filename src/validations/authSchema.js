const Joi = require('joi')

// fullname: bắt buộc nhập
// email: bắt buộc nhập, đúng định dạng email
// password: bắt buộc nhập, độ dài từ 6 trở lên
// localhost?abc
const registerSchema = Joi.object({
    fullname: Joi.string().required().messages({
        'any.required': 'Họ tên là bắt buộc'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Email không đúng định dạng',
        'any.required': 'Email là bắt buộc'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Mật khẩu phải từ 6 ký tự trở lên',
        'any.required': 'Mật khẩu là bắt buộc'
    })
})

module.exports = {
    registerSchema
}
