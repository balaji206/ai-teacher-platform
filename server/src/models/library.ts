import mongoose
from "mongoose";

const LibrarySchema =
 new mongoose.Schema({

   title: {

      type: String,

      required: true

   },

   type: {

      type: String,

      required: true

   },

   fileUrl: {

      type: String

   },

   uploadedBy: {

      type: String,

      default: "Teacher"

   },

   uploadedAt: {

      type: Date,

      default: Date.now

   },
   teacherId: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "Teacher"
},
quiz:Object,

 },
 {
   timestamps: true
 });

export default mongoose.model(
  "Library",
  LibrarySchema
);