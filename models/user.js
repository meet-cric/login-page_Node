const mongoose=require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;
const bcrypt=require('bcrypt');

const loginSchema=new Schema({
  username: {
  type: String,
  index:true
},
password: {
  type: String
},
email: {
  type: String
},
name: {
  type: String
}

});
const User=mongoose.model('login',loginSchema);
module.exports=User;

module.exports.getUserByUsername=function(username,callback){
  var query={username:username};
  User.findOne(query,callback);
}
module.exports.comparePassword=function(candidatePassword,hash,callback){
  bcrypt.compare(candidatePassword, hash, function(err,isMatch) {
    if(err) throw err;
    callback(null,isMatch)
});
}
module.exports.getUserById=function(id,callback){

  User.findById(id,callback);
}
