import express
from "express";
import {
 protect
}
from "../middleware/authMiddleware";
import {
  generateQuiz
}
from "../controllers/toolkitController";

const router =
 express.Router();

router.post(
  "/quiz",
  protect ,
  generateQuiz
);

export default router;