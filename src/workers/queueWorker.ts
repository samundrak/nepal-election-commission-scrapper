import { EntityManager } from "@mikro-orm/core";
import { Job, Queue, Worker } from "bullmq";
import { JobTypeEnum } from "../enum/JobTypEnum";
import { IDataFetchResponse } from "../interfaces/IDataFetchResponse";
import { IStandardData } from "../interfaces/IStandardData";
import { queueName, redisConnection } from "../queue";
import { DataFetchStrategy } from "../Strategies/DataFetchStrategy";
import StateStrategy from "../Strategies/StateStrategy";

export default function (queue: Queue, em: EntityManager) {
  const worker = new Worker(
    queueName,
    async (job: Job<IStandardData>) => {
      if (job.name === JobTypeEnum.STATE) {
        const df = new DataFetchStrategy(new StateStrategy());
        return await df.fetch(em, job.data);
      }
      if (job.name === JobTypeEnum.DISTRICT) {
        console.log("fetch district");
      }
    },
    {
      connection: redisConnection,
    }
  );

  worker.on("completed", async (job, returnValue: IDataFetchResponse) => {
    if (!returnValue.next) return;
    if (job.name === JobTypeEnum.STATE) {
      const df = new DataFetchStrategy(new StateStrategy());
      await df.save(em, job.data);
      returnValue.payload.forEach((district) => {
        queue.add(returnValue.next, district);
      });
    }
  });
}
