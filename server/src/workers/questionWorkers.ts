import { Worker } from "bullmq";

import { redis }
from "../utils/redis";

import Assignment
from "../models/assignment";

import {
 generateQuestions
}
from "../services/aiService";
new Worker(

  "question-generation",

  async (job) => {

    try {

      console.log(
        "JOB RECEIVED"
      );

      const {
        assignmentId
      } = job.data;

      console.log(
        "Assignment ID:",
        assignmentId
      );

      // FIND ASSIGNMENT
      const assignment =
        await Assignment.findById(
          assignmentId
        );

      if (!assignment) {

        console.log(
          "Assignment not found"
        );

        return;
      }

      // UPDATE STATUS
      assignment.status =
        "processing";

      await assignment.save();

      console.log(
        "Generating Questions..."
      );

      // GEMINI GENERATION
      const response =
        await generateQuestions(
          assignment
        );

      console.log(
        "RAW GEMINI RESPONSE:",
        response
      );

      if (!response) {

   throw new Error(
     "No AI response"
   );

}

const cleanedResponse =
 response
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

      // PARSE JSON
      const parsedResponse =
        JSON.parse(
          cleanedResponse
        );

      // SAVE GENERATED PAPER
      assignment.generatedPaper =
        parsedResponse;

      assignment.status =
        "completed";

      await assignment.save();

      console.log(
        "QUESTION PAPER GENERATED"
      );

    } catch (error) {

      console.log(
        "WORKER ERROR:",
        error
      );

    }

  },

  {
    connection: redis
  }

);