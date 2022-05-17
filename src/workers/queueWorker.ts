import { EntityManager } from "@mikro-orm/core";
import { Job, Queue, Worker } from "bullmq";
import { JobTypeEnum } from "../enum/JobTypEnum";
import { IDataFetchResponse } from "../interfaces/IDataFetchResponse";
import { IStandardData } from "../interfaces/IStandardData";
import { queueName, redisConnection } from "../queue";
import { DataFetchStrategy } from "../Strategies/DataFetchStrategy";
import { DistrictStrategy } from "../Strategies/DistrictStrategy";
import { ElectionCentreStrategy } from "../Strategies/ElectionCentreStrategy";
import { MunicipalStrategy } from "../Strategies/MunicipalStrategy";
import StateStrategy from "../Strategies/StateStrategy";
import { WardStrategy } from "../Strategies/WardStrategy";

export default function (queue: Queue, em: EntityManager) {
  const worker = new Worker(
    queueName,
    async (job: Job<IStandardData>) => {
      let df: DataFetchStrategy;
      if (job.name === JobTypeEnum.STATE) {
        df = new DataFetchStrategy(new StateStrategy());
      }
      if (job.name === JobTypeEnum.DISTRICT) {
        df = new DataFetchStrategy(new DistrictStrategy());
      }

      if (job.name === JobTypeEnum.MUNCIPAL) {
        df = new DataFetchStrategy(new MunicipalStrategy());
      }

      if (job.name === JobTypeEnum.WARD) {
        df = new DataFetchStrategy(new WardStrategy());
      }
      if (job.name === JobTypeEnum.LOCAL_CENTRE) {
        df = new DataFetchStrategy(new ElectionCentreStrategy());
      }
      return await df.fetch(em, job.data);
    },
    {
      connection: redisConnection,
      concurrency: 2,
    }
  );

  worker.on("completed", async (job, returnValue: IDataFetchResponse) => {
    let df: DataFetchStrategy;
    if (job.name === JobTypeEnum.STATE) {
      df = new DataFetchStrategy(new StateStrategy());
    }
    if (job.name === JobTypeEnum.DISTRICT) {
      df = new DataFetchStrategy(new DistrictStrategy());
    }

    if (job.name === JobTypeEnum.MUNCIPAL) {
      df = new DataFetchStrategy(new MunicipalStrategy());
    }

    if (job.name === JobTypeEnum.WARD) {
      df = new DataFetchStrategy(new WardStrategy());
    }
    if (job.name === JobTypeEnum.LOCAL_CENTRE) {
      df = new DataFetchStrategy(new ElectionCentreStrategy());
    }

    await df.save(em, job.data);
    if (!returnValue.next) return;
    returnValue.payload.value.forEach((district) => {
      queue.add(
        returnValue.next,
        {
          value: district,
          parent: returnValue.payload.parent,
        },
        {}
      );
    });
  });
}
