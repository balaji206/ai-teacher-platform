import { Queue } from "bullmq";
import { redis } from "../utils/redis";

export const questionQueue = new Queue(
   "question-generation",
   {
      connection: {
   host: process.env.REDIS_HOST,
   port: Number(process.env.REDIS_PORT),
   password: process.env.REDIS_PASSWORD
}
   }
);