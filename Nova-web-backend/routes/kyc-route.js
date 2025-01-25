const express = require("express");
const kycController = require('../Controllers/kyc-controller');
const verifyJWT = require("../middleware/verifyJWT");
const { authorize } = require('../middleware/auth');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

router.post("/submit", verifyJWT, upload.single('document'), kycController.submit);
router.get("/get", verifyJWT, kycController.get);
router.patch("/:id", verifyJWT, authorize(['Admin']), kycController.patch);


module.exports = router;
