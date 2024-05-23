const ErrorHandling = require('../utils/ErrorHandling');

module.exports = (err, req, res, next) => { 
    if (!err) {
        // If no error is provided, send a generic 500 Internal Server Error response
        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }

    // Check if statusCode and message properties exist on the error object
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
   

    // Send the error response
    return res.status(err.statusCode).json({
        success: false, 
        error: err.message
    });
};
