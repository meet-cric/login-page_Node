var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');



const User  =require('../models/user');

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
   req.checkBody('name', 'Name is required').notEmpty();
   req.checkBody('email', 'Email is required').notEmpty();
   req.checkBody('email', 'Email is not valid').isEmail();
   req.checkBody('username', 'Username is required').notEmpty();
   req.checkBody('password', 'Password is required').notEmpty();
   req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if(errors){
		res.render('register',{
			errors:errors
		});
    }
  else{
    //signup data passed to database with hash password
        bcrypt.genSalt(10, function(err, salt) {
          var myData = new User(req.body);
    	    bcrypt.hash(myData.password, salt, function(err, hash) {
    	        myData.password = hash;
              myData.save()
                 .then((item) => {
                   req.flash('success_msg', 'You are registered and can now login');
                   res.render("./login");
                   req.flash('success_msg', 'You are registered and can now login');
              })
               .catch((err) => {
                 console.log(err.message);
                 res.status(400).send("unable to save to database");
              });
    	    });
    	});
  }
});
//login-page username and password validation
passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

  passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local',{ successRedirect:'/',
                                  failureRedirect:'/users/login',
                                  failureFlash:'Invalid username and password'
  }),
  function(req, res) {
    res.redirect('/');
  });


module.exports = router;
