const mongoose = require('mongoose');
const FoodItem = require('../models/FoodItem');
const jimp = require('jimp');
const uuid = require('uuid');

const multer = require('multer');
const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if(isPhoto) {
      next(null, true);
    } else {
      next({ message: 'This filetype isn\'t allowed!' }, false);
    }
  }
};


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

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
  // check if there is no new file to resize
  if (!req.file) {
    next(); // skip to the next middleware
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  // now we resize
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  // once we have written the photo to our filesystem, keep going!
  next();
};


exports.postFoodItems = (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const unit = req.body.unit;
  const description = req.body.description;
  const photo = req.body.photo;
  // const img = req.body.img;
  let foodItem = new FoodItem();
  foodItem.name = name;
  foodItem.price = price;
  foodItem.unit = unit;
  foodItem.description = description;
  foodItem.photo = photo;
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
