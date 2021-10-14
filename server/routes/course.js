import express from "express";
import { uploadImage, removeImage, create, read } from "../controller/course";
 
import { isInstructor, requireSignIn } from "../middlewares";
const router = express.Router();


router.post("/course/upload-image", uploadImage);
router.post("/course/remove-image", removeImage);


router.post("/course", requireSignIn, isInstructor, create);
router.get('/course/:slug', read)
module.exports = router;
