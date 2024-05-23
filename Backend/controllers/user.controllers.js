const { AsyncHandler } = require("../utils/AsyncHandler.js");
const ErrorHandling = require("../utils/ErrorHandling.js");
const sendToken = require('../utils/jwtToken.js');
const User = require('../models/user.model.js'); 
const isPasswordCorrect = require('../models/user.model.js');
const cloudinary = require('cloudinary')

//Register an user 

// exports.registerUser = AsyncHandler(async (req, res, next) => {
//   if (!req.files || !req.files.avatar) {
//     return res.status(400).json({ success: false, error: 'Missing required parameter - file' });
//   }

//   const avatar = req.files.avatar;

//   const myCloud = await cloudinary.uploader.upload(avatar.tempFilePath, {
//     folder: "avatars",
//     width: 150,
//     crop: 'scale',
//   });

//   const { name, email, password, role } = req.body;

//   const user = await User.create({
//     name,
//     email,
//     password,
//     role,
//     avatar: {
//       public_id: myCloud.public_id,
//       url: myCloud.secure_url,
//     },
//   });

//   sendToken(user, 201, res);
// });
exports.registerUser = AsyncHandler(async (req, res, next) => {
    if (!req.body.avatar) {
        return next(new ErrorHandling("Missing required parameter - avatar", 400));
      }
    
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
  
    const { name, email, password } = req.body;
  
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
  
    sendToken(user, 201, res);
  });


exports.loginUser = AsyncHandler( async(req,res,next) => {
    const {email,password} = req.body; 

    if(!email || !password){
        return next(new ErrorHandling("Please enter email or password",400)); 
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandling("Enter valid email or password" ,401)); 
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    
    if(!isPasswordCorrect){
        return next(new ErrorHandling("Invalid Password",401)); 
    }

    sendToken(user,200,res);
    // const token = user.getJWTToken(); 

    // res.status(201).json({
    //     success : true, 
    //     token
    // })
})


exports.logoutUser = AsyncHandler(async (req,res,next) =>{

    res.cookie("token" , null , {
        expires : new Date(Date.now()), 
        httpOnly : true
    })

    res.json({
        success : true, 
        message : "LoggedOut Successfully"
    })

})


exports.getUserDetails = AsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
});
  
  // update User password
exports.updatePassword = AsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");  
    const isPasswordMatched = await user.isPasswordCorrect(req.body.oldPassword);
    if (!isPasswordMatched) {
      return next(new ErrorHandling("Old password is incorrect", 400));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandling("password does not match", 400));
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
});

exports.updateProfile = AsyncHandler(async (req,res,next) => {
    const newUser = {
        name : req.body.name, 
        email : req.body.email
    }

    if(req.body.avatar  !== ""){
        const user = await User.findById(req.user.id);

        const ImageId = user.avatar.public_id;
        await  cloudinary.v2.uploader.destroy(ImageId);
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder : "avatars",
            width : 150,
            crop : "scale"
        });

        newUser.avatar = {
                public_id :myCloud.public_id,
                url: myCloud.url,
        };
    }
        const user = await User.findByIdAndUpdate(req.user.id, newUser ,{
          new: true,
          runValidators: true,
          useFindAndModify: false,
        });

    
   

    res.status(200).json({
        success : true, 
        newUser
    })
})

//GET USERS -- ADMIN 

exports.getUsers = AsyncHandler(async(req,res,next) =>{ 
    const users = await User.find(); 
   
    res.status(201).json({ 
        success : true , 
        users,
    });
})


//GET single User 

exports.getUser = AsyncHandler(async(req,res,next) => {
     const user = await User.findById(req.params.id); 

     if(!user){
        return next(new ErrorHandling(`User with id : ${req.params.id} not found`,404))
     }

     res.status(201).json({
        success : true, 
        user
     })
})


//UPDATE ROLEEE


exports.updateRole = AsyncHandler(async (req,res,next) => {
    const newUser = {
        name : req.body.name, 
        email : req.body.email,
        role : req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id , newUser,{
        new : true, 
        runValidators : true, 
        useFindAndModify: false,

    })

    res.status(200).json({
        success : true, 
    })
}) 


//DELETE --ADMIN

exports.deleteUser = AsyncHandler(async (req,res,next) => { 
    const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandling(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });


})