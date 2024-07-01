const { DataTypes } = require('sequelize')
const { sequelize } = require('../databases/connect')

const UserOtp = sequelize.define(
    'UserOtp',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        otp: {
            type: DataTypes.STRING,
            allowNull: false
        },

        verified_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: new Date()
        }
    },
    {
        tableName: 'user_otps',
        timestamps: false
    }
)

module.exports = UserOtp
