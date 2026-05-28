import Assignment
from "../models/assignment";

import {
  Response,
  Request
}
from "express";

import {
  AuthRequest
}
from "../middleware/authMiddleware";

import {
  generateQuestions
}
from "../services/geminiService";
import {
 redis
}
from "../utils/redis";
// CREATE ASSIGNMENT
export const createAssignment =
 async (
   req: AuthRequest,
   res: Response
 ) => {

   try {

      const assignment =
       await Assignment.create({

          ...req.body,

          teacherId:
           req.teacherId

         });
         const cacheKey =

 `${assignment.title}-
 ${assignment.numberOfQuestions}-
 ${assignment.totalMarks}`;

 const cachedPaper =
 await redis.get(
   cacheKey
 );

if (cachedPaper) {

   console.log(
    "Using Cached Assignment"
   );

   assignment.generatedPaper =
    JSON.parse(
      cachedPaper
    );

   assignment.status =
    "completed";

   await assignment.save();

   return res.json({

      success: true,

      assignmentId:
       assignment._id,

      cached: true

   });

}
         console.log(
   await redis.ping()
  );
      // GENERATE QUESTIONS
      const response =
       await generateQuestions(
         assignment
       );

      // CLEAN RESPONSE
      const cleaned =
       response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .replace(/\n/g, " ")
        .replace(/\r/g, " ")
        .replace(/\t/g, " ")
        .trim();

      let parsed;

      try {

         parsed =
          JSON.parse(cleaned);

      } catch (error) {

         console.log(
          "JSON PARSE ERROR"
         );

         console.log(cleaned);

         // FALLBACK
         parsed = {

            schoolName:
             "VedaAI School",

            subject:
             assignment.title,

            class:
             "10th",

            duration:
             "45 Minutes",

            totalMarks:
             Number(
               assignment.totalMarks || 50
             ),

            sections: [

               {

                  title:
                   "Section A",

                  instruction:
                   "Attempt all questions",

                  questions:
                   Array.from({

                      length:
                       Number(
                        assignment.numberOfQuestions || 5
                       )

                   }).map((_, index) => ({

                      question:
                       `${assignment.title} Question ${index + 1}`,

                      difficulty:
                       index % 2 === 0
                       ? "easy"
                       : "medium",

                      marks:
                       Math.floor(

                         Number(
                           assignment.totalMarks || 50
                         )

                         /

                         Number(
                           assignment.numberOfQuestions || 5
                         )

                       ),

                      answer:
                       `Sample answer for question ${index + 1}`

                   }))

               }

            ],

            answerKey:
             Array.from({

                length:
                 Number(
                  assignment.numberOfQuestions || 5
                 )

             }).map((_, index) => ({

                questionNumber:
                 index + 1,

                answer:
                 `Sample answer ${index + 1}`

             }))

         };

      }

      // SAVE GENERATED PAPER
      assignment.generatedPaper =
       parsed;

       await redis.set(

  cacheKey,

  JSON.stringify(parsed),

  "EX",

  3600

);

      assignment.status =
       "completed";

      await assignment.save();

      res.json({

         success: true,

         assignmentId:
          assignment._id

      });

   } catch (error) {

      console.log(error);

      res.status(500).json({

         success: false,

         message:
          "Error generating paper"

      });

   }

};

// GET SINGLE ASSIGNMENT
export const getAssignment =
 async (
   req: Request,
   res: Response
 ) => {

   try {

      const assignment =
       await Assignment.findById(
         req.params.id
       );

      res.json(assignment);

   } catch (error) {

      console.log(error);

      res.status(500).json({

         message:
          "Error fetching assignment"

      });

   }

};

// GET TEACHER ASSIGNMENTS
export const getAssignments =
 async (
   req: AuthRequest,
   res: Response
 ) => {

   try {
console.log(
 "REQ TEACHER:",
 req.teacherId
);
      const assignments =
       await Assignment.find({

          teacherId:
           req.teacherId

       })
       .sort({

          createdAt: -1

       });

      res.json(assignments);

   } catch (error) {

      console.log(error);

      res.status(500).json({

         message:
          "Error fetching assignments"

      });

   }

};