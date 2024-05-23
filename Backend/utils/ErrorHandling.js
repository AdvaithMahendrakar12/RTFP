
class ErrorHandling extends Error{
    constructor(
        message = "Something went wrong", 
        statusCode, 
    ){
        super(message); 
        this.message = message; 
        this.statusCode = statusCode; 
        Error.captureStackTrace(this,this.constructor);
              
    }
}


module.exports = ErrorHandling; 