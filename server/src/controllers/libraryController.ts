import {
 Response
}
from "express";

import {
 AuthRequest
}
from "../middleware/authMiddleware";

import Library
from "../models/library";

// GET LIBRARY
export const getLibrary =
 async (
   req: AuthRequest,
   res: Response
 ) => {

   try {

      const items =
 await Library.find({

   teacherId:
    req.teacherId

 })
        .sort({
          uploadedAt: -1
        });

      res.json(items);

   } catch (error) {

      console.log(error);

      res.status(500).json({

         message:
          "Error fetching library"

      });

   }

};

// UPLOAD MATERIAL
export const uploadMaterial =
 async (

   req: AuthRequest & {
 file?: Express.Multer.File
},

   res: Response

 ) => {

   try {

      const file =
       req.file;

      const {
        title,
        type
      } = req.body;

      const material =
 await Library.create({

    title,

    type,

    fileUrl:
     file?.filename,

    uploadedBy:
     req.teacherName,

    teacherId:
     req.teacherId

 });

      res.json(material);

   } catch (error) {

      console.log(error);

      res.status(500).json({

         message:
          "Upload failed"

      });

   }

};