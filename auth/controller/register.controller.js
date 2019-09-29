const Register = require('../model/register.model.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config/globle.config');

  // Create and Save a new Note
exports.registerCreate = (req, res) => {

  Register.findOne({ 'email' :  req.body.email }, function(err, user) {
    if (err) {
      console.log(err);
      return res.json({status: false});
    }
    if (user) {
        return res.status(404).json({status: false,message:'Email already exist!'});
    } else {

      var hashedPassword = bcrypt.hashSync(req.body.password, 8);
      
      Register.create({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword
      },
      function (err, user) {
        if (err) return res.status(500).send("There was a problem registering the user.")
        res.status(200).send({ status: true, userData: user });
      }); 

    } 
  });
};

exports.registerUsers = (req, res) =>{

  Register.find({},{_id:1,name:1,email:1}, function(err, users) {
    if (err) {
      console.log(err);
      return res.json({status: false});
    }
    
    if (users) {
      return res.json({status: true,data:users});
    } 
  });
}
exports.addFriends = (req, res) =>{

  // var updateData={
  //   isFriends: req.body.id, 
  // }
  // Find note and update it with the request body
  
  Register.update({_id:req.params.userId}, { $push: { isFriends: req.body.id} },)
  .then(user => {
    
      if(!user) {
          return res.status(404).send({
              message: "contest not found with id " + req.params.userId
          });
      }
      if (user) {
        console.log('user : '+user+ ' Body :'+req.body.id);
        res.send({status:true,message:"Add Friend"});
      }
      
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "user not found with id " + req.params.userId
          });                
      }
      return res.status(500).send({
          message: "Error add friend with id " + req.params.userId
      });
  });
}