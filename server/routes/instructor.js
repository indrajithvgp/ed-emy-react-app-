import express from "express";

import jwt from "jsonwebtoken";
import {
  makeInstructor,
  getAccountStatus,
  currentInstructor,
  instructorCourses,
} from "../controller/instructor";
import { requireSignIn } from "../middlewares";
const router = express.Router();

router.post('/make-instructor', requireSignIn, makeInstructor);
router.post("/get-account-status", requireSignIn, getAccountStatus);
router.get("/current-instructor", requireSignIn, currentInstructor);

router.get("/instructor-courses", requireSignIn, instructorCourses);

module.exports = router;
