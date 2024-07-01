const { DataTypes } = require('sequelize')
const { sequelize } = require('../databases/connect')
const ProductItem = require('./ProductItem')

const Inventory = sequelize.define(
    'Inventory',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_item_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ProductItem,
                key: 'id'
            }
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        total_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        purchase_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },

        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date()
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date()
        }
    },
    {
        tableName: 'inventories',
        timestamps: false
    }
)

module.exports = Inventory
