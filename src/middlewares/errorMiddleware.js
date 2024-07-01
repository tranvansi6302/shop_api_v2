const errorMiddleware = (err, req, res, next) => {
    const { code, message } = err

    return res.status(typeof code === 'number' ? code : 500).json({
        success: false,
        message: message || 'Lỗi không xác định'
    })
}

module.exports = errorMiddleware
