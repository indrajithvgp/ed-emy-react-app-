import express from "express";

import jwt from "jsonwebtoken";
import {
  makeInstructor,
  studentsCount,
  instructorBalance,
  instructorPayoutSettings,
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
router.get("/instructor/balance", requireSignIn, instructorBalance);

router.post("/instructor/student-count", requireSignIn, studentsCount);
router.post("/instructor/payout-settings", requireSignIn, instructorPayoutSettings);
module.exports = router;
