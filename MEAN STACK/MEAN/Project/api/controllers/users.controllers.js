var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var secret =  's3cr3t';


module.exports.register = function(req, res){
  console.log('Registering user');
  
  var username = req.body.username;
  var name = req.body.name || null;
  var password = req.body.password;

  User.create({
    username: username,
    name: name,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))

  }, function(err, user){
      if(err){
        console.log('user created', user);
        res.status(400).json(err);
      } else {
        console.log('User created', user);
        res.status(201).json(user);  
      }
  });
};

module.exports.isExistingUser = function(req, res){

  var username = req.params.username;
  console.log(username);
  User
    .findOne({ 'username': username })
    .exec(function(err, doc){

      if (doc) {
        res.status(200).json({isExistingUser: true});
      } else {
        res.status(200).json({isExistingUser: false});
      }
    });
}

module.exports.login = function(req, res){
  console.log('Logging in user');
  
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({
    username: username
  }).exec(function(err, user){
    if(err){
      console.log(err);
      res.status(400).json(err);
    } else {
      if(user) {//user exist
        if(bcrypt.compareSync(password, user.password)){
            console.log('User found', user);

            //Create token and add info in to token payload({userinfo, secret signing key(enviroment variable), exprire time})
            var token = jwt.sign({username: user.username}, secret, {expiresIn: 3600});
            res.status(200).json({success: true, token: token});

        } else {//wrong passsword
            res.status(401).json('Unauthorized');
        }
      } else {//user not exist
         res.status(401).json('Unauthorized');
      }
    }
  })
};

module.exports.authenticate = function(req, res, next){

  //Authorization header in request object
  var headerExists = req.headers.authorization;

  if(headerExists){

    var token = req.headers.authorization.split(' ')[1]//-> Authorization bearer xxx

    jwt.verify(token, secret, function(err, decoded) {

      if(err) {
        console.log(err);
        res.status(401).json('Unauthorized');
      } else {
        req.user = decoded.username//add to the req object with username has been sign in token
        next();//verify authorized then call the next midleware function
      }

    });

  } else {
    res.status(403).json('No token provided');
  }
}