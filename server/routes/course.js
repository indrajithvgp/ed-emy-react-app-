import express from "express";
import {
  uploadImage,
  removeImage,
  create,
  unpublish,
  publish,
  markIncompleted,
  userReadCourse,
  listCompleted,
  stripeSuccess,
  paidEnrollment,
  freeEnrollment,
  markCompleted,
  userCourses,
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
import { isEnrolled, isInstructor, requireSignIn } from "../middlewares";
const router = express.Router();

router.get('/courses', courses)
router.post("/course/upload-image", uploadImage);
router.post("/course/remove-image", removeImage);

router.get('/user-courses', requireSignIn, userCourses)
router.post("/course", requireSignIn, isInstructor, create);
router.put("/course/:slug", requireSignIn, update);
router.get('/course/:slug', read)
// router.get('/check-enrollment/:courseId',requireSignIn, checkEnrollment)
router.get("/check-enrollment/:courseId",requireSignIn, checkEnrollment);
router.post("/free-enrollment/:courseId",requireSignIn, freeEnrollment);
router.post("/paid-enrollment/:courseId", requireSignIn, paidEnrollment);
router.get("/stripe-success/:courseId", requireSignIn, stripeSuccess);
router.put("/course/publish/:courseId", publish);
router.put("/course/unpublish/:courseId", unpublish);

router.post("/course/video-upload/:intsructorId", requireSignIn, formidable(), uploadVideo);
router.post("/course/remove-video/:intsructorId", removeVideo);
router.post("/course/lesson/:slug/:intsructorId", requireSignIn, addLesson);
router.put("/course/lesson/:slug/:intsructorId", requireSignIn, updateLesson);
router.put("/course/:slug/:lessonId", requireSignIn, removeLesson);

router.get("/user/course/:slug", requireSignIn, isEnrolled, read);
router.post('/mark-completed', requireSignIn, markCompleted);
router.post("/mark-incomplete", requireSignIn, markIncompleted);
router.post("/list-completed", requireSignIn, listCompleted);
module.exports = router; 
