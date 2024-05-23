

const cloudinary = require('cloudinary').v2;


const dotenv = require('dotenv');
const app = require('./app');
const connectDB = require('./config/database');

dotenv.config();
dotenv.config({path:"config/config.env"}); 

process.on("uncaughtException" ,(err) =>{
    console.log(`Error : ${err.message}`);
    console.log("Server is shutting down due to uncaught exception");

    process.exit(1);
})


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'avatar', // folder name for the uploaded files
//     allowed_formats: ['jpg', 'jpeg', 'png'], // allowed image formats
//     transformation: [{ width: 150, crop: 'scale' }] // transformation options
//   }
// });

// const upload = multer({ storage: storage });

connectDB();




app.listen(process.env.PORT,()=>{
    console.log(`Server is running on https://localhost:${process.env.PORT}`); 
})

process.on("unhandledRejection" ,(err) =>{
    console.log(`Error : ${err.message}`);
    console.log("Server is shutting down due to unhandled Rejection");

    server.close(() => {
        process.exit(1);
    })
})


// module.exports = upload;