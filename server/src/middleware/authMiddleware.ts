import {
 Request,
 Response,
 NextFunction
}
from "express";
import Teacher
from "../models/teacher";
import jwt
from "jsonwebtoken";

export interface AuthRequest
 extends Request {

   teacherId?: string;

   teacherName?: string;

}

export const protect =
 async(
   req: AuthRequest,
   res: Response,
   next: NextFunction
 ) => {

   try {

      const authHeader =
       req.headers.authorization;

      if (!authHeader) {

         return res.status(401).json({

            message:
             "No token"

         });

      }

      const token =
       authHeader.split(" ")[1];

      const decoded:any =
       jwt.verify(

         token,

         process.env.JWT_SECRET!

       );

      req.teacherId =
 decoded.id;

const teacher =
 await Teacher.findById(
   decoded.id
 );

req.teacherName =
 teacher?.name;

next();

   } catch (error) {

      console.log(error);

      res.status(401).json({

         message:
          "Invalid token"

      });

   }

};