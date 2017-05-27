var express = require('express');
var router = express.Router();

const FoodItem = require('../models/FoodItem');
const FoodItemController = require('../controllers/FoodItemController')

router.get('/', FoodItemController.getFoodItems);
router.get('/api/v1/foodItem', FoodItemController.getApiFoodItems);

router.post('/', FoodItemController.postFoodItems);


module.exports = router;
