const { AsyncHandler } = require("../utils/AsyncHandler");
const ErrorHandling = require("../utils/ErrorHandling");
const jwt = require("jsonwebtoken");
const User = require('../models/user.model.js'); 


exports.isAuthenicated = AsyncHandler(async(req,res,next) => {
    let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }


    const decodedToken = jwt.verify(token , process.env.JWT_SECRET); 

    req.user = await User.findById(decodedToken.id); 
    next(); 
})


exports.authorizeRoles = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
           return next(new ErrorHandling(`Role : ${req.user.role} is not allowed to access`,403));
        }
        next(); 
    }
}