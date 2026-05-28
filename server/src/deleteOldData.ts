import mongoose
from "mongoose";

import dotenv
from "dotenv";

import Assignment
from "./models/assignment";

import Group
from "./models/group";

import Library
from "./models/library";

dotenv.config();

mongoose.connect(
 process.env.MONGO_URL!
).then(async () => {

 console.log(
  "MongoDB Connected"
 );

 await Assignment.deleteMany({});

 await Group.deleteMany({});

 await Library.deleteMany({});

 console.log(
  "All old data deleted"
 );

 process.exit();

});