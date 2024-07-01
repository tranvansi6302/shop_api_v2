const express = require('express')
const morgan = require('morgan')
const authRouter = require('./routers/authRouter')
const { connectMysql } = require('./databases/connect')
const generateOTP = require('./utils/randomOTP')
const randomBytes = require('./utils/randomBytes')
const errorMiddleware = require('./middlewares/errorMiddleware')
const categoryRouter = require('./routers/categoryRouter')
const brandRouter = require('./routers/brandRouter')
const productRouter = require('./routers/productRouter')
const purchaseRouter = require('./routers/purchaseRouter')
const app = express()
const port = 3000

app.use(express.json())
app.use(morgan('dev'))

// Kết nối database
connectMysql()
require('./models/relationship')

// Router
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/categories', categoryRouter)
app.use('/api/v1/brands', brandRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/purchases', purchaseRouter)

// Error middleware
app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
