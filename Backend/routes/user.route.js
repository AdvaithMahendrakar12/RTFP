const express = require('express'); 
const { registerUser, loginUser, logoutUser, getUserDetails, updatePassword, updateProfile, getUsers,getUser, deleteUser, updateRole } = require('../controllers/user.controllers');
const { isAuthenicated, authorizeRoles } = require('../middlewares/authenication');

const router = express.Router(); 


router.route("/register").post(registerUser); 
router.route("/login").post(loginUser); 

router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthenicated,getUserDetails); 
router.route("/password/update").put(isAuthenicated,updatePassword);
router.route("/me/update").put(isAuthenicated,updateProfile);

router.route("/admin/users").get(isAuthenicated,authorizeRoles("admin"),getUsers);
router.route("/admin/user/:id").get(isAuthenicated , authorizeRoles("admin") , getUser)
.delete(isAuthenicated,authorizeRoles("admin"),deleteUser)
.put(isAuthenicated , authorizeRoles("admin"),updateRole);



module.exports = router; 
