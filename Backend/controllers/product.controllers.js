const cloudinary = require('cloudinary');
const Product = require("../models/product.model.js"); 
const { AsyncHandler } = require("../utils/AsyncHandler.js");
const ErrorHandling = require("../utils/ErrorHandling.js");
const ApiFeatures = require("../utils/apiFeatures.js");

//Creating a Product 
exports.createProduct = AsyncHandler(async (req,res,next) =>{

        let images =[]; 

        if(typeof req.body.images === "string"){
          images.push(req.body.images);
        }else{
          images = req.body.images;
        }

        const imagesLink = []; 
        for(let i =0 ; i < images.length ; i++){
          const result = await cloudinary.v2.uploader.upload(images[i],{
            folder : "products"
          })
          imagesLink.push({
            public_id : result.public_id,
            url : result.url
          })
        }

        req.body.images = imagesLink;
        req.body.user = req.user.id;
        const product = await Product.create(req.body);
         res.status(201).json({
                success : true,
                product
          });
});

exports.getAllProducts = AsyncHandler(async(req,res)=>{
    // return next(new ErrorHandling("This is temp",500));
    const resultPerPage = 6;
    const productCount = await Product.countDocuments(); 
    const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const products =  await apiFeature.query;
    res.json({
        success : true,
        products,
        productCount,
        resultPerPage,
    }); 
})

exports.updateProduct = AsyncHandler(async(req,res,next) =>{
    let product = await Product.findById(req.params.id); 

    if(!product){
        return next(new ErrorHandling("Product not found" , 404)); 
    }
    let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    
      res.status(200).json({
        success: true,
        product
      });
    }
)
    


//delete
exports.deleteProduct = AsyncHandler(async (req,res,next)=> {
    const product = await Product.findById(req.params.id); 
    if(!product){
        return next(new ErrorHandling("Product not found") , 401);
    }

    await product.deleteOne(); 

    res.status(201).json({
        success : true, 
        message : "Product deleted"
    })

})

exports.getProductDetails = AsyncHandler( async(req,res,next) =>{
    let product = await Product.findById(req.params.id); 

    if(!product){
        return next(new ErrorHandling("Product not found" , 401));
    }

    res.status(201).json({
        success : true,
        product
    })
   
});

exports.createProductReview = AsyncHandler(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });
  
  // Get All Reviews of a product
  exports.getProductReviews = AsyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
  
    if (!product) {
      return next(new ErrorHandling("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
}); 

exports.deleteReview = AsyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandling("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});


exports.getAdminProducts = AsyncHandler(async(req,res,next) =>{
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
    });
});