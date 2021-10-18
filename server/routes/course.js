import express from "express";
import {
  uploadImage,
  removeImage,
  create,
  read,
  removeVideo,
  uploadVideo,
} from "../controller/course";
 import formidable from 'express-formidable'
import { isInstructor, requireSignIn } from "../middlewares";
const router = express.Router();


router.post("/course/upload-image", uploadImage);
router.post("/course/remove-image", removeImage);


router.post("/course", requireSignIn, isInstructor, create);
router.get('/course/:slug', read)
router.post("/course/video-upload", requireSignIn, formidable(), uploadVideo);
router.post("/course/remove-video", requireSignIn, removeVideo);
module.exports = router; 
