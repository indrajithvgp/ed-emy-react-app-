import express from "express";
import {
  uploadImage,
  removeImage,
  create,
  read,
  update,
  addLesson,
  removeVideo,
  uploadVideo,
} from "../controller/course";
 import formidable from 'express-formidable'
import { isInstructor, requireSignIn } from "../middlewares";
const router = express.Router();


router.post("/course/upload-image", uploadImage);
router.post("/course/remove-image", removeImage);


router.post("/course", requireSignIn, isInstructor, create);
router.put("/course/:slug", requireSignIn, update);
router.get('/course/:slug', read)
router.post("/course/video-upload/:intsructorId", requireSignIn, formidable(), uploadVideo);
router.post("/course/remove-video/:intsructorId", requireSignIn, removeVideo);
router.post("/course/lesson/:slug/:intsructorId", requireSignIn, addLesson);
module.exports = router; 
