const express = require("express");
const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();


router.post("/signup", userController.signup);
router.post("/googlesignup", userController.googlesignup);
router.post("/login", userController.login);
router.patch("/update/:email", userController.updateUser);
router.patch("/change/:email", userController.changePass);
router.patch("/forgot-pass/:email", userController.ForgotPass);
router.get("/signup/confirmation/:token", userController.confirmEmail);
router.get("/", userController.getAllUser);
router.get("/me", verifyToken, userController.getMe);
router.get("/:email", userController.getAllUserByEmail);





module.exports = router;