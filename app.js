require('dotenv').config();
const express = require('express');
require('express-async-errors');


const app = express();
// const {validateSignup} = require('./validator');

app.use(express.json());
const connectDB = require('./database/connect');

const notFoundMiddleware = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');

const port = process.env.PORT || 3000;

// app.post('/signup', (req, res) => {
//     const {error, value} = validateSignup(req.body);

//     if (error) {
//         console.log(error);
//         return res.send(error.details);
//     }
//     res.send('Successfully signed up');
// });

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => { 
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, console.log('Server listening on port 3000'));
    } catch (error) {
        console.log(error.message);
        
    }
}

start()