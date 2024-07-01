const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        })
    }
    const token = authHeader.split(' ')[1]

    try {
        const user = jwt.verify(token, 'ABC@12681HKHDISD')
        req.user = user
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        })
    }

    next()
}
module.exports = authMiddleware
