var express = require('express');
var router = express.Router();

const FoodItem = require('../models/FoodItem');
const FoodItemController = require('../controllers/FoodItemController')

router.get('/', FoodItemController.getFoodItems);
router.post('/', FoodItemController.postFoodItems);


router.get('/api/v1/foodItems', FoodItemController.getApiFoodItems);


router.get('/foodItem/:id/edit', FoodItemController.editFoodItem);
router.post('/foodItem/:id/edit', FoodItemController.updateFoodItem);


router.get('/foodItem/:id/delete', function(req, res){
	FoodItem.findByIdAndRemove({_id: req.params.id},
	   function(err){
		if(err) res.json(err);
		else    res.redirect('/');
	});
});

module.exports = router;
