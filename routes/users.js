var express = require('express');
var router = express.Router();

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
  // // Validation
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if(errors){
    console.log("yes");
  }else{
    console.log("no");
  }

});



module.exports = router;
