var express = require('express');
var router = express.Router();

var seededRestaurants = require('../model/data').seededRestaurants;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('yum/index',{restaurants : seededRestaurants});
  console.log(seededRestaurants);
});

//New
router.get('/new', (req,res)=>{
  res.render('yum/new');
});

//Create/Post
router.post('/', (req,res)=>{
  req.body.mostPopularItems=req.body.mostPopularItems.split(',');
  req.body.reviews=req.body.reviews.split(',');
  seededRestaurants.push(req.body);
  res.redirect('/yum');
});

//Show
router.get('/:id', (req,res)=>{
  res.render('yum/show', {
    recipe: seededRestaurants[req.params.id],
    id: req.params.id
  });
});

//Update
router.get('/:id/update', (req,res)=>{
  res.render('yum/update', {
    recipe: seededRestaurants[req.params.id],
    id: req.params.id
  });
});

//Update Router
router.put('/:id', (req, res) =>{
  req.body.mostPopularItems=req.body.mostPopularItems.split(',');
  req.body.reviews=req.body.reviews.split(',');
  seededRestaurants[req.params.id] = req.body;
  console.log(seededRestaurants[req.params.id]);
  res.redirect('/yum');
});
//Update, add a dish
router.put('/:id/addDish', (req,res)=>{
  seededRestaurants[req.params.id].mostPopularItems.push(req.body.newDish);
  res.redirect(`/yum/${req.params.id}`);
});

//Update, add a review
router.put('/:id/addReview', (req,res)=>{
  seededRestaurants[req.params.id].reviews.push(req.body.newReview);
  res.redirect(`/yum/${req.params.id}`);
});

//Delete entire restaraunt
router.delete('/:id', (req, res)=>{
  seededRestaurants.splice(req.params.id,1);
  res.redirect('/yum');
});

//Delete, remove a dish
router.delete('/:id/removeDish', (req, res)=>{
  var rem = seededRestaurants[req.params.id].mostPopularItems.indexOf(req.body[seededRestaurants[req.params.id].name]);
  seededRestaurants[req.params.id].mostPopularItems.splice(rem,1);
  res.redirect(`/yum/${req.params.id}`);
});

//Delete, remove a Review
router.delete('/:id/removeReview', (req, res)=>{
  var rem = seededRestaurants[req.params.id].reviews.indexOf(req.body[seededRestaurants[req.params.id].name]);
  seededRestaurants[req.params.id].reviews.splice(rem,1);
  res.redirect(`/yum/${req.params.id}`);
});

module.exports = router;
