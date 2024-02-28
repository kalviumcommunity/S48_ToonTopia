const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = 3002;
const CartoonModel = require('./models/BestCartoons')

const mongoURI = process.env.MONGODB_URI;
const cors = require('cors')
app.use(cors())
app.use(express.json())

mongoose.connect(mongoURI, {   
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
    res.send(`Welcome to the home page. Database connection status: ${db.readyState === 1 ? 'Connected' : 'Not Connected'}`);
});

app.get('/cartoon', (req,res)=>{
    CartoonModel.find()
    .then(data =>res.json(data))
    .catch(err => res.json(err))
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
