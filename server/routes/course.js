import express from "express";
import { uploadImage, removeImage, create } from "../controller/course";

import { isInstructor, requireSignIn } from "../middlewares";
const router = express.Router();


router.post("/course/upload-image", uploadImage);
router.post("/course/remove-image", removeImage);


router.post("/course/", requireSignIn, isInstructor, create);

module.exports = router;
