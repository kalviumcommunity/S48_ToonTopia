const express = require('express');
const app = express();
const port = 3002;
app.use(express.json());
require('dotenv').config();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser'); 
app.use(cookieParser());
const cors = require('cors');
const mongoose = require('mongoose');
const CartoonModel = require('./models/BestCartoons');
const UserModel = require('./models/User');

const Joi = require('joi');
dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

const User = require('./models/User'); 
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

app.use(bodyParser.json());
app.use(cors());

app.post('/signup', async (req, res) => {
    try {
      const { name, username, email, phone, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        username,
        email,
        phone,
        password: hashedPassword, 
      });
      await newUser.save();
      res.cookie('user', newUser, { httpOnly: true });
      res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      await user.save()
      if (user) {

        res.cookie('user', user, { httpOnly: true });
        res.json({
            success: true,
            message: "Login successful",
            username
          });
    //   const isPasswordValid = await bcrypt.compare(password, user.password);
    //   if (!isPasswordValid) {
    //     return res.status(401).json({ error: 'Invalid credentials' });
    //   }
      }else{
        return res.status(401).json({ error: 'Invalid credentials' });

      }
      
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Incorrect username or password' });
    }
  });
  
  const authenticateUser = (req, res, next) => {
    if (req.cookies.user) {
      next();
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  };
  
  app.get('/protected', authenticateUser, (req, res) => {
    res.json({ message: 'Access granted to protected route' });
  });
  
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
app.get('/signup', async (req, res) => {
    try {
        const users = await UserModel.find();
        console.log('Retrieved users:', users);
        res.json(users);
    } catch (err) {
        console.error('Error retrieving cartoons:', err);
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