import mongoose from "mongoose";

const AssignmentSchema =
 new mongoose.Schema({

    title:String,

    dueDate:String,

    instructions:String,

    questionTypes:[String],

    numberOfQuestions:Number,

    totalMarks:Number,

    status:{
        type:String,
        default:"pending"
    },

    generatedPaper:Object,

    teacherId: {

      type:
       mongoose.Schema.Types.ObjectId,

      ref:
       "Teacher"

    },

 },
 {
   timestamps: true
 });
export default mongoose.model(
    "Assignment",
    AssignmentSchema
)