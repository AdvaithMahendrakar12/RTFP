
const express = require('express');
const { getAllProducts , createProduct,updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview, getAdminProducts} = require('../controllers/product.controllers.js');
const { isAuthenicated, authorizeRoles } = require('../middlewares/authenication.js');

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/product/new").post(isAuthenicated,authorizeRoles("admin") ,createProduct);
router.route("/admin/product/:id").put(isAuthenicated ,authorizeRoles("admin"),updateProduct)
.delete(isAuthenicated,authorizeRoles("admin") ,deleteProduct);

router.route("/admin/products").get(isAuthenicated,authorizeRoles("admin"),getAdminProducts);
router.route("/review").put(isAuthenicated,createProductReview).get(getProductReviews).delete(isAuthenicated,deleteReview);
router.route("/product/:id").get(getProductDetails);

module.exports = router;