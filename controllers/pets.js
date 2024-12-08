// Add these at the top of the file:
const Pet = require('../models/pet.js');
const express = require('express');
const router = express.Router();

// Write your routes/controller functions here
// this route handler will kick in if someone tries to POST /pets
// CREATE - POST - /pets
// CREATE - POST - /pets
router.post('/', async (req, res) => {
    try {
      // Create a new pet with the data from req.body
      // req.body = an express variable that contains form data 
      // (eg., {name: "Jeff", age: 3})
      const createdPet = await Pet.create(req.body);
      res.status(201).json(createdPet); // 201 Created
    } catch (error) {
      // Setup for error handling
    }
});

// READ - GET - /pets
// READ - GET - /pets
router.get('/', async (req, res) => {
    try {
        // 1. grab the pets from the database, save in variable
      const foundPets = await Pet.find();
        // 2. respond to frontend with array of pets []
      res.status(200).json(foundPets);  // 200 OK
    } catch (error) {
        res.status(500).json({ error: error.message }); // 500 Internal Server Error
    }
});



// READ - GET - /pets/:petId
router.get('/:petId', async (req, res) => {
  try {
    const foundPet = await Pet.findById(req.params.petId);
    if (!foundPet) {
      res.status(404);
      throw new Error('Pet not found.');
    }
    res.status(200).json(foundPet);
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message });
    } else {
      // Add else statement to handle all other errors
      res.status(500).json({ error: error.message });
    }
  }
});


// Export the router at the bottom of the file
module.exports = router;