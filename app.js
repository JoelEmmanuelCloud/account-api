const express = require('express');
const app = express();
const {validateSignup} = require('./validator');

app.use(express.json());

const port = process.env.PORT || 3000;

// app.post('/signup', (req, res) => {
//     const {error, value} = validateSignup(req.body);

//     if (error) {
//         console.log(error);
//         return res.send(error.details);
//     }
//     res.send('Successfully signed up');
// });


const start = async () => { 
    try {
        app.listen(port, console.log('Server listening on port 3000'));
    } catch (error) {
        console.log(error.message);
        
    }
}

start()