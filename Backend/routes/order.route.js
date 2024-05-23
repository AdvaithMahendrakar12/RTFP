
const express = require("express"); 
const { createOrder, getAllOrders,myOrders, getSingleOrder, updateOrder } = require("../controllers/order.controllers");
const router = express.Router(); 
const { isAuthenicated, authorizeRoles } = require('../middlewares/authenication');



router.route("/order/new").post(isAuthenicated,createOrder); 
router.route("/orders/me").get(isAuthenicated,myOrders);
router
  .route("/admin/orders")
  .get(isAuthenicated, authorizeRoles("admin"), getAllOrders);

router.route("/admin/order/:id").get(isAuthenicated,authorizeRoles("admin"),getSingleOrder).put(isAuthenicated,authorizeRoles("admin"),updateOrder);


module.exports = router;