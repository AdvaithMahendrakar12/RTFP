
const express = require("express"); 
const errorMiddleware = require('./middlewares/errors.js')
const app = express(); 
const cookieParser = require("cookie-parser"); 
const cors = require('cors');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')


app.use(express.json());

app.use(cookieParser());


const corsOptions = {
    origin: function(origin, callback) {
        // Allow requests from all origins during development
        callback(null, true);
    },
    credentials: true,
};

app.use(cors(corsOptions));
  
app.use(bodyParser.urlencoded({extended : true}))
app.use(fileUpload());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const product = require("./routes/product.route.js"); 
const user = require("./routes/user.route.js"); 
const order = require('./routes/order.route.js'); 

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1" , order);

//middlewares
app.use(errorMiddleware);

module.exports = app;