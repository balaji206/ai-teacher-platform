import {
 Response,
 Request
}
from "express";

import {
 AuthRequest
}
from "../middleware/authMiddleware";

import Group
from "../models/group";

// GET TEACHER GROUPS
export const getGroups =
 async (
   req: AuthRequest,
   res: Response
 ) => {

   try {

      const groups =
       await Group.find({

          teacherId:
           req.teacherId

       })
       .sort({

          createdAt: -1

       });

      res.json(groups);

   } catch (error) {

      console.log(error);

      res.status(500).json({

         message:
          "Error fetching groups"

      });

   }

};

// CREATE GROUP
export const createGroup =
 async (
   req: AuthRequest,
   res: Response
 ) => {

   try {

      // GENERATE JOIN CODE
      const joinCode =
       Math.random()
        .toString(36)
        .substring(2, 8);

      const group =
       await Group.create({

          ...req.body,

          teacherId:
           req.teacherId,

          joinCode,

          ownerTeacher: {

             name:
              req.body.teacherName,

             email:
              req.body.teacherEmail

          },

          teachers: [],

          students: []

       });

      res.json(group);

   } catch (error) {

      console.log(error);

      res.status(500).json({

         message:
          "Error creating group"

      });

   }

};

// JOIN GROUP (STUDENT)
export const joinGroup =
 async (
   req: Request,
   res: Response
 ) => {

   try {

      const {
        joinCode,
        student
      } = req.body;

      // VALIDATION
      if (
        !student?.name
        ||
        !student?.email
      ) {

         return res.status(400).json({

            message:
             "Student details required"

         });

      }

      const group =
       await Group.findOne({

          joinCode

       });

      if (!group) {

         return res.status(404).json({

            message:
             "Invalid join code"

         });

      }

      group.students.push(
        student
      );

      await group.save();

      res.json(group);

   } catch (error) {

      console.log(error);

      res.status(500).json({

         message:
          "Error joining group"

      });

   }

};

// JOIN GROUP (TEACHER)
export const joinTeacherGroup =
 async (
   req: Request,
   res: Response
 ) => {

   try {

      const {
        joinCode,
        teacher
      } = req.body;

      const group =
       await Group.findOne({

          joinCode

       });

      if (!group) {

         return res.status(404).json({

            message:
             "Invalid code"

         });

      }

      group.teachers.push(
        teacher
      );

      await group.save();

      res.json(group);

   } catch (error) {

      console.log(error);

      res.status(500).json({

         message:
          "Join failed"

      });

   }

};