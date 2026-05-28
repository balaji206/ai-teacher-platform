import {
 Request,
 Response
}
from "express";

import {
 generateQuizAI
}
from "../services/toolkitAIService";
import {
 AuthRequest
}
from "../middleware/authMiddleware";
import Library
from "../models/library";

export const generateQuiz =
 async (
   req: AuthRequest,
   res: Response
 ) => {

   try {

      const response =
       await generateQuizAI(
         req.body
       );

      const cleaned =
       response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsed =
       JSON.parse(cleaned);

      // SAVE TO LIBRARY
      await Library.create({

   title:
    parsed.title ||

    `${req.body.topic} Quiz`,

   type:
    "quiz",

   uploadedBy:
    req.teacherName,

   teacherId:
    req.teacherId,

   quiz:
    parsed

});

      res.json(parsed);

   } catch (error) {

      console.log(error);

      res.status(500).json({

         message:
          "Quiz generation failed"

      });

   }

};