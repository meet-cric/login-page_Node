var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');


const loginModel=require('../models/user');

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('./register');
});
router.get('/login', function(req, res, next) {
  res.render('./login');
});

// Register User
router.post('/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

  console.log(req.body.name);
// Validation
//
   // req.checkBody('name', 'Name is required').notEmpty();
  // req.checkBody('email', 'Email is required').notEmpty();
   // req.checkBody('email', 'Email is not valid').isEmail();
   // req.checkBody('username', 'Username is required').notEmpty();
   // req.checkBody('password', 'Password is required').notEmpty();
   // req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  // var errors = req.validationErrors();
  //
  // if(errors){
  //   console.log("yes");
  // }else{
  //   console.log("no");
  // }

//signup data passed to database with hash password
    bcrypt.genSalt(10, function(err, salt) {
      var myData = new loginModel(req.body);
	    bcrypt.hash(myData.password, salt, function(err, hash) {
	        myData.password = hash;
          myData.save()
             .then((item) => {
               res.render("./login");
          })
           .catch((err) => {
             console.log(err.message);
             res.status(400).send("unable to save to database");
          });
	    });
	});
});



module.exports = router;
