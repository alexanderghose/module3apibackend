const mongoose = require('mongoose');

const petSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 0,
    },
    breed: String,
  });

// here we use the schema to create a model
// the model has the actual methods we call like .create() to put
//    stuff into the DB
const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;