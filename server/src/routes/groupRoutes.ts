import express
from "express";
import {
 protect
}
from "../middleware/authMiddleware";
import {

  getGroups,
  createGroup,
  joinGroup,
  joinTeacherGroup

} from "../controllers/groupController";

const router =
 express.Router();

// GET GROUPS
router.get(
  "/",
  protect,
  getGroups
);

// CREATE GROUP
router.post(
 "/",
 protect,
 createGroup
);

// JOIN GROUP
router.post(
  "/join",
  joinGroup
);

router.post(
  "/join-teacher",
  protect,
  joinTeacherGroup
);
export default router;