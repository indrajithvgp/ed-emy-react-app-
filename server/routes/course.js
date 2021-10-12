import express from "express";
import { uploadImage, removeImage } from "../controller/course";

import { requireSignIn } from "../middlewares";
const router = express.Router();


router.post("/course/upload-image", uploadImage);
router.post("/course/remove-image", removeImage);


module.exports = router;