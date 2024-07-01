const { DataTypes } = require('sequelize')
const { sequelize } = require('../databases/connect')

// Khi đẩy lên db -> roles
const Role = sequelize.define(
    'Role',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'roles'
    }
)

module.exports = Role
