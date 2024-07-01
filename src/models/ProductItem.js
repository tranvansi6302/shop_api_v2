const { DataTypes } = require('sequelize')
const Product = require('./Product')
const { sequelize } = require('../databases/connect')

const ProductItem = sequelize.define(
    'ProductItem',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sku: {
            type: DataTypes.STRING,
            allowNull: false
        },
        item_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product,
                key: 'id'
            }
        }
    },
    {
        tableName: 'product_items',
        timestamps: false
    }
)

module.exports = ProductItem
