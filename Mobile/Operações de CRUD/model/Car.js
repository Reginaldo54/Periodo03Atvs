const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Car = new Schema({
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  color: {
    type: String
  },
  price: {
    type: Number
  }
}, {
  collection: 'car'
});

module.exports = mongoose.model('Car', Car);
