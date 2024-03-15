const express = require('express');
const app = express();
const port = 3002;
app.use(express.json());
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const CartoonModel = require('./models/BestCartoons');

const Joi = require('joi');

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

const cartoonSchema = Joi.object({
    name: Joi.string().required(),
    title: Joi.string().required(),
    release_date: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
    genre: Joi.string().required(),
    description: Joi.string().required(),
});

app.post('/cartoon', async (req, res) => {
    try {
        const { error } = cartoonSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name, title, release_date, genre, description } = req.body;
        const newCartoon = new CartoonModel({
            name,
            title,
            release_date,
            genre,
            description,
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

app.put('/cartoon/:id', async (req, res) => {
    try {
        const { title, release_date, genre, description } = req.body;
        const { id } = req.params; 
        const updatedCartoon = await CartoonModel.findByIdAndUpdate(
            id, 
            {
                title,
                release_date,
                genre,
                description,
            },
            { new: true }
        );
        res.status(200).json(updatedCartoon);
    } catch (error) {
        console.error('Error updating cartoon:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/cartoon/:id', async (req, res) => {
    try {
        await CartoonModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Cartoon deleted successfully' });
    } catch (error) {
        console.error('Error deleting cartoon:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`🚀 Server running on PORT: ${port}`);
    });
});

module.exports = app;