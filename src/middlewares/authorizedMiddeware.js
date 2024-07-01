const Role = require('../models/Role')
const User = require('../models/User')

const authorizedMiddeware =
    (...roles) =>
    async (req, res, next) => {
        const { id: userId } = req.user
        const user = await User.findByPk(userId, {
            include: {
                model: Role,
                as: 'role',
                attributes: ['name']
            }
        })

        const roleName = user.role.dataValues.name

        if (!roles.includes(roleName)) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden'
            })
        }
        next()
    }

module.exports = authorizedMiddeware
