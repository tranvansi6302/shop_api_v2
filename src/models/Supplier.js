const { DataTypes } = require('sequelize')
const { sequelize } = require('../databases/connect')

const Supplier = sequelize.define(
    'Supplier',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        tax_code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
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
        tableName: 'suppliers',
        timestamps: false
    }
)

module.exports = Supplier
