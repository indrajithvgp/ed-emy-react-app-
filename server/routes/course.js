import express from "express";
import {
  uploadImage,
  removeImage,
  create,
  unpublish,
  publish,
  read,
  update,
  addLesson,
  removeVideo,
  removeLesson,
  checkEnrollment,
  updateLesson,
  courses,
  uploadVideo,
} from "../controller/course";
 import formidable from 'express-formidable'
import { isInstructor, requireSignIn } from "../middlewares";
const router = express.Router();

router.get('/courses', courses)
router.post("/course/upload-image", uploadImage);
router.post("/course/remove-image", removeImage);


router.post("/course", requireSignIn, isInstructor, create);
router.put("/course/:slug", requireSignIn, update);
router.get('/course/:slug', read)
router.get('/check-enrollment/:courseId', checkEnrollment)
router.put("/course/publish/:courseId", publish);
router.put("/course/unpublish/:courseId", unpublish);

router.post("/course/video-upload/:intsructorId", requireSignIn, formidable(), uploadVideo);
router.post("/course/remove-video/:intsructorId", removeVideo);
router.post("/course/lesson/:slug/:intsructorId", requireSignIn, addLesson);
router.put("/course/lesson/:slug/:intsructorId", requireSignIn, updateLesson);
router.put("/course/:slug/:lessonId", requireSignIn, removeLesson);



module.exports = router; 
