import express
from "express";
import {
 protect
}
from "../middleware/authMiddleware";
import {

  getLibrary,
  uploadMaterial

} from "../controllers/libraryController";

import {
  upload
}
from "../utils/multer";

const router =
 express.Router();

// GET LIBRARY
router.get(
  "/",
  protect,
  getLibrary
);

// UPLOAD
router.post(

  "/upload",

  protect,

  upload.single(
    "file"
  ),

  uploadMaterial

);

export default router;