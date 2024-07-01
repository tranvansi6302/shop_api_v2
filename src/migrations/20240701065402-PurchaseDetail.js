'use strict'

const { DataTypes } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable('purchase_details', {
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
                    model: 'purchase_orders',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            product_item_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'product_items',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            }
        })
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable('purchase_details')
    }
}
