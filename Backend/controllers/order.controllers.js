
const Order = require('../models/order.model.js');
const Product = require('../models/product.model.js')
const { AsyncHandler } = require("../utils/AsyncHandler.js");
const ErrorHandling = require("../utils/ErrorHandling.js"); 


exports.createOrder = AsyncHandler( async(req,res) => {
    const{shippingInfo,orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice } = req.body;
        
    const order = await Order.create({shippingInfo,orderItems,
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice,
        paidAt : Date.now(), 
        user : req.user._id,
        
    })

    res.status(201).json({
        success : true, 
        message : "Order created successfully", 
        order
    })
})


exports.getSingleOrder = AsyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
  
    if (!order) {
      return next(new ErrorHander("Order not found with this Id", 404));
    }
  
    res.status(200).json({
      success: true,
      order,
    });
});
  
exports.deleteOrder = AsyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHander("Order not found with this Id", 404));
    }
  
    await order.remove();
  
    res.status(200).json({
      success: true,
    });
});


exports.updateOrder = AsyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandling("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandling("You have already delivered this order", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});



async function updateStock(id, quantity) {

    const product = await Product.findById(id);
  
    product.Stock -= quantity;
  
    await product.save({ validateBeforeSave: false });
  }

  exports.getAllOrders = AsyncHandler(async (req, res, next) => {
    const orders = await Order.find();
  
    let totalAmount = 0;
  
    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
  
    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
});

exports.myOrders = AsyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

  

