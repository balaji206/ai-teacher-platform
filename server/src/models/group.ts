import mongoose
from "mongoose";

const GroupSchema =
 new mongoose.Schema({

   name: {

      type: String,

      required: true

   },

   subject: {

      type: String,

      required: true

   },

   joinCode: {

      type: String

   },

   ownerTeacher: {

      name: String,

      email: String

   },

   teachers: [

      {

         name: String,

         email: String

      }

   ],

   students: [

      {

         name: String,

         email: String

      }

   ],

   createdAt: {

      type: Date,

      default: Date.now

   },
   teacherId: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "Teacher"
},

 });

export default mongoose.model(
  "Group",
  GroupSchema
);