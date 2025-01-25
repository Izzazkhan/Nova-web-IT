const express = require("express");
const kycController = require('../../controllers/kyc-controller');
const authController = require("../../controllers/auth-controller");

const verifyJWT = require("../../middleware/verifyJWT");
const { authorize } = require('../../middleware/auth');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

//Auth based routes
router.post("/signUp", authController.SignUp);
router.post("/signIn", authController.SignIn);
router.get("/refresh", authController.refreshToken);
router.get("/logout", authController.logOut);
router.get("/getUser/:id", verifyJWT, authController.getUserData);


router.post("/submit", verifyJWT, upload.single('document'), kycController.submit);
router.get("/get", verifyJWT, kycController.get);
router.patch("/kyc/:id", verifyJWT, authorize(['Admin']), kycController.patch);
// router.post("/submit", kycController.submit);


module.exports = router;
