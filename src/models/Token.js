const { DataTypes } = require('sequelize')
const { sequelize } = require('../databases/connect')

const Token = sequelize.define(
    'Token',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // type 'verify_email', 'forgot_password', 'refresh_token'
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        type: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date()
        }
    },
    {
        tableName: 'tokens',
        timestamps: false
    }
)

module.exports = Token
