// allows us to enable cross origin resource sharing
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Import the controller file
const petRouter = require('./controllers/pets.js');

// everybody can hit my api! yay!
// app.use(cors())
// only the whitelist can hit my api:
app.use(cors({ origin: 'http://localhost:5173' }));

// this sets up our server <---> db connection
mongoose.connect(process.env.MONGODB_URI);
// check to see if mongoose connection's working
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});


app.use(express.json()); // makes POST requests work

// Routes go here
// Add the petRouter to the `/pets` route
app.use('/pets', petRouter);



app.listen(3000, () => {
  console.log('The express app is ready!');
});
