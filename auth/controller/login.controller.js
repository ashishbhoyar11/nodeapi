
const Register = require('../model/register.model.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config/globle.config');

  // Create and Save a new Note
exports.loginUser = (req, res) => {
    let data = {
        email: req.body.email
    };
    Register.findOne(data).lean().exec(function(err, user){
        if(err){
            return res.json({auth: false});
        }
        if(!user){
            return res.status(404).json({message:'Incorrect Username and Password!'});
        }
        console.log(user);
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        let token = jwt.sign(user, config.secret, {
            expiresIn: 18000// expires in 5 hour
        });
        res.json({auth:true, token: token,userData:user});
    })
};




