var express = require('express');
var router = express.Router();
var multer  = require('multer');

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

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '.uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
});
// 
// var upload = multer({ storage: storage }).single('img');
//
//
//
// router.post('/', function (req, res) {
//   upload(req, res, function (err) {
//     if (err) {
//       // An error occurred when uploading
//       return
//     }
//     res.json({
//       success: true,
//       message: 'image uploaded'
//     });
//     // Everything went fine
//   })
// });


module.exports = router;
