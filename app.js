require('express-async-errors')
require('dotenv').config()
const connectDB = require('./database/connect')
const notFoundMiddleware = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/authRoute')
const accountRouter = require('./routes/accountRoute')
const express = require('express')

const app = express()

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

app.get('/', (req, res) => {
    console.log(req.signedCookies)
    res.send('Welcome')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/account', accountRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log('Server listening on port 3000'))
    } catch (error) {
        console.log(error.message)
    }
}

start()
