const { DataTypes } = require('sequelize')
const { sequelize } = require('../databases/connect')
const PurchaseOrder = require('./PurchaseOrder')
const ProductItem = require('./ProductItem')

const PurchaseDetail = sequelize.define(
    'PurchaseDetail',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        purchase_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        quantity_received: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        purchase_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: PurchaseOrder,
                key: 'id'
            }
        },
        product_item_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ProductItem,
                key: 'id'
            }
        }
    },
    {
        tableName: 'purchase_details',
        timestamps: false
    }
)

module.exports = PurchaseDetail
