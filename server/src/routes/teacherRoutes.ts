import express
from "express";

import {
 protect
}
from "../middleware/authMiddleware";

import {
 updateProfile
}
from "../controllers/teacherController";

const router =
 express.Router();

router.put(

 "/profile",

 protect,

 updateProfile

);

export default router;