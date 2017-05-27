const mongoose = require('mongoose');
const FoodItem = require('../models/FoodItem');

/* GET home page. */
exports.getFoodItems = (req, res) => {
  FoodItem.find()
  .then(foodItems => {
    res.render('index', {
      title: 'Food Items',
      foodItems: foodItems
    })
  })
};
exports.getApiFoodItems = (req, res) => {
  FoodItem.find()
    .then(foodItems => {
      res.json(foodItems)
    })
};


exports.postFoodItems = (req, res) => {
  const name = req.body.food_item_name;
  const price = req.body.food_item_price;
  const unit = req.body.food_item_unit;
  let foodItem = new FoodItem();
  foodItem.name = name;
  foodItem.price = price;
  foodItem.unit = unit;
  foodItem.save()
    .then(() => {
      res.redirect('/')
    })
};
