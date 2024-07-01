const { DataTypes } = require('sequelize')
const { sequelize } = require('../databases/connect')
const PURCHASE_STATUS = require('../constants/purchaseStatus')
const User = require('./User')
const Supplier = require('./Supplier')

const PurchaseOrder = sequelize.define(
    'PurchaseOrder',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        // Mã đơn hàng
        purchase_code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        purchase_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date()
        },

        note: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        // 0 đang chờ, 1 đã xác nhận, 2 đã hủy
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: PURCHASE_STATUS.PENDING
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },

        supplier_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Supplier,
                key: 'id'
            }
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
        tableName: 'purchase_orders',
        timestamps: false
    }
)

module.exports = PurchaseOrder
