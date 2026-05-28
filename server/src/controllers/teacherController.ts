import {
 Response
}
from "express";

import bcrypt
from "bcryptjs";

import Teacher
from "../models/teacher";

import {
 AuthRequest
}
from "../middleware/authMiddleware";

// UPDATE PROFILE
export const updateProfile =
 async (
   req: AuthRequest,
   res: Response
 ) => {

   try {

      const teacher =
       await Teacher.findById(
         req.teacherId
       );

      if (!teacher) {

         return res.status(404).json({

            message:
             "Teacher not found"

         });

      }

      teacher.name =
       req.body.name
       || teacher.name;

      teacher.email =
       req.body.email
       || teacher.email;

      // PASSWORD UPDATE
      if (req.body.password) {

         teacher.password =
          await bcrypt.hash(

             req.body.password,

             10

          );

      }

      await teacher.save();

      res.json({

         success: true,

         teacher

      });

   } catch (error) {

      console.log(error);

      res.status(500).json({

         message:
          "Update failed"

      });

   }

};