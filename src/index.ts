import { MikroORM } from "@mikro-orm/core";
import type { MySqlDriver } from "@mikro-orm/mysql"; // or any other driver package

import express from "express";
import states from "./datas/states";
import { JobTypeEnum } from "./enum/JobTypEnum";
import { myQueue, serverAdapter } from "./queue";
import queueWorker from "./workers/queueWorker";

async function main() {
  const orm = await MikroORM.init<MySqlDriver>();

  const app = express();
  app.listen(3232);
  app.use("/", serverAdapter.getRouter());

  /**
   * This remove every thing in queue
   */
  app.get("/obliterate", (res) => {
    myQueue.obliterate({
      force: true,
    });
    return res.send(200);
  });

  // states.forEach((state) => {
  //   myQueue.add(JobTypeEnum.STATE, state);
  // });
  // myQueue.add(JobTypeEnum.STATE, states[0]);

  // queueWorker(myQueue, orm.em);
}
main();
