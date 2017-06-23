const mongoose = require('mongoose');
const { Schema } = mongoose;

const foodItemSchema = new Schema ({
  name: {
    type: String,
    trim: true
  },
  unit: {
    type: String
  },
  price: {
    type: Number
  },
  description: {
    type: String,
    trim: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  photo: String
})

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = FoodItem;
