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
  const name = req.body.name;
  const price = req.body.price;
  const unit = req.body.unit;
  const description = req.body.description;
  // const img = req.body.img;
  let foodItem = new FoodItem();
  foodItem.name = name;
  foodItem.price = price;
  foodItem.unit = unit;
  foodItem.description = description;
  // foodItem.img = img;
  foodItem.save()
    .then(() => {
      res.redirect('/')
    });
};

exports.editFoodItem = (req, res) => {
  FoodItem.findOne({ _id: req.params.id })
    .then(foodItem => {
      res.render('editFoodItem', {foodItem: foodItem});
    });
};

exports.updateFoodItem = (req, res) => {
    console.log('edit req.body: ', req.body)
  FoodItem.findOneAndUpdate({ _id: req.params.id}, req.body, {
    new: true //returns new food item
  })
    .then(foodItem => {
      console.log('foodItem: ', foodItem)

      res.redirect('/')
    });
};

exports.updateApiFoodItem = (req, res) => {
  console.log('edit req.query: ', req.query)
  FoodItem.findOneAndUpdate({ _id: req.params.id }, req.query, {
    new: true // returns new food item
  })
  .then(foodItem => {
    res.json(foodItem)
  });
};
