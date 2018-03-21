const mongoose=require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

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
const loginModel=mongoose.model('login',loginSchema);
module.exports=loginModel;
