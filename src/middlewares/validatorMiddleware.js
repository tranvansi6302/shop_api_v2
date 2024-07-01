const validatorMiddleware = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property]) // req.body dot notation <-> req[body] bracket notation
        if (!error) return next()

        // có lỗi
        const { details } = error
        return res.status(400).json({
            success: false,
            message: details[0]?.message
        })
    }
}

module.exports = validatorMiddleware
