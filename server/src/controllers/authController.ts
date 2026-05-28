import {
 Request,
 Response
}
from "express";

import bcrypt
from "bcryptjs";

import jwt
from "jsonwebtoken";

import Teacher
from "../models/teacher";

// SIGNUP
export const signup =
 async (
   req: Request,
   res: Response
 ) => {

   try {

      const {

  name,
  email,
  password,

  schoolName,
  schoolLocation

} = req.body;

      const existing =
       await Teacher.findOne({
         email
       });

      if (existing) {

         return res.status(400).json({

            message:
             "Teacher already exists"

         });

      }

      const hashed =
       await bcrypt.hash(
         password,
         10
       );

      const teacher =
 await Teacher.create({

    name,

    email,

    password: hashed,

    schoolName,

    schoolLocation

 });

      const token =
       jwt.sign(

         {
           id:
            teacher._id
         },

         process.env.JWT_SECRET!,

         {
           expiresIn: "7d"
         }

       );

      res.json({

         token,
         teacher

      });

   } catch (error) {

      console.log(error);

      res.status(500).json({

         message:
          "Signup failed"

      });

   }

};

// LOGIN
export const login =
 async (
   req: Request,
   res: Response
 ) => {

   try {

      const {
        email,
        password
      } = req.body;

      const teacher =
       await Teacher.findOne({
         email
       });

      if (!teacher) {

         return res.status(404).json({

            message:
             "Teacher not found"

         });

      }

      const isMatch =
       await bcrypt.compare(
         password,
         teacher.password
       );

      if (!isMatch) {

         return res.status(400).json({

            message:
             "Invalid credentials"

         });

      }

      const token =
       jwt.sign(

         {
           id:
            teacher._id
         },

         process.env.JWT_SECRET!,

         {
           expiresIn: "7d"
         }

       );

      res.json({

         token,
         teacher

      });

   } catch (error) {

      console.log(error);

      res.status(500).json({

         message:
          "Login failed"

      });

   }

};