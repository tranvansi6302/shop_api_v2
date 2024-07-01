'use strict'

const { DataTypes } = require('sequelize')
const Role = require('../models/Role')
const { USER_STATUS } = require('../constants/userStatus')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable('users', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            fullname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            avatar: {
                type: DataTypes.STRING,
                allowNull: true
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true
            },
            address: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            // 0 Chưa kích hoạt, 1 Kích hoạt, 2 Khóa
            status: {
                type: DataTypes.TINYINT,
                allowNull: false,
                defaultValue: USER_STATUS.UNACTIVE
            },
            role_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'roles',
                    key: 'id'
                }
            },

            created_at: {
                type: DataTypes.DATE,
                defaultValue: new Date()
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: new Date()
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
        await queryInterface.dropTable('users')
    }
}
