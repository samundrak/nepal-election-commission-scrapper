import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
import IORedis from "ioredis";
import { Worker, Job, Queue } from "bullmq";

export const serverAdapter = new ExpressAdapter();
export const queueName = "dataFetching";
export const redisConnection = new IORedis(9002);
export const myQueue = new Queue(queueName, {
  connection: redisConnection,
});

createBullBoard({
  queues: [new BullMQAdapter(myQueue)],
  serverAdapter,
});
