const { Sequelize } = require('sequelize')

// Khai báo kết nối với database
const sequelize = new Sequelize('nodejs_api', 'tranvansi', 'tranvansi', {
    logging: false,
    host: '127.0.0.1',
    port: 3307,
    dialect: 'mysql'
})

// Kết nối
const connectMysql = async () => {
    try {
        await sequelize.authenticate()
        console.log('Kết nối thành công')
    } catch (error) {
        console.log(error)
        console.log('Kết nối thất bại')
    }
}

module.exports = {
    sequelize,
    connectMysql
}
