const { DataTypes } = require('sequelize')
const { sequelize } = require('../databases/connect')

const Brand = sequelize.define(
    'Brand',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date()
        }
    },
    {
        tableName: 'brands',
        timestamps: false
    }
)

module.exports = Brand
