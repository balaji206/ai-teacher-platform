import express from "express";

import {
 protect
}
from "../middleware/authMiddleware";

import {

  createAssignment,
  getAssignment,
  getAssignments

}
from "../controllers/assignmentController";

const router =
 express.Router();

// CREATE ASSIGNMENT
router.post(
  "/",
  protect,
  createAssignment
);

// GET ALL ASSIGNMENTS
router.get(
  "/",
  protect,
  getAssignments
);

// GET SINGLE ASSIGNMENT
router.get(
  "/:id",
  getAssignment
);

export default router;