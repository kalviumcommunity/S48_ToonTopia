const express = require('express');
const app = express();
const port = 3002; 
app.use(express.json());
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const CartoonModel = require('./models/BestCartoons');

app.use(cors());
app.use(express.urlencoded({ extended: true }));

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

app.post('/cartoon', async (req, res) => {
    try {
        const { name, title, release_date, genre, description } = req.body;
        const newCartoon = new CartoonModel({
            name,
            title,
            release_date,
            genre,
            description
        });
        await newCartoon.save();
        res.status(201).json({ message: 'Cartoon added successfully' });
    } catch (error) {
        console.error('Error adding cartoon:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/cartoon', async (req, res) => {
    try {
        const cartoons = await CartoonModel.find();
        console.log('Retrieved cartoons:', cartoons);
        res.json(cartoons);
    } catch (err) {
        console.error('Error retrieving cartoons:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`🚀 Server running on PORT: ${port}`);
    });
});

module.exports = app;
