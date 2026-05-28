import mongoose
from "mongoose";

const TeacherSchema =
 new mongoose.Schema({

   name: {

      type: String,

      required: true

   },

   email: {

      type: String,

      required: true,

      unique: true

   },

   password: {

      type: String,

      required: true

   },
   schoolName:String,

schoolLocation:String,

 });

export default mongoose.model(
  "Teacher",
  TeacherSchema
);