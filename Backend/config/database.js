
const mongoose = require('mongoose'); 

const  connectDB = async() => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.DB_URL}`)
        console.log(`MongoDB connected with ${connectionInstance.connection.host}`)
    }catch(err){
        console.log("MONGODB connection error" , err);
        process.exit(1);    
    }
}

module.exports = connectDB;