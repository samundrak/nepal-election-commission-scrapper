import { MikroORM } from "@mikro-orm/core";
import type { MySqlDriver } from "@mikro-orm/mysql"; // or any other driver package

import express from "express";
import fromWard from "./controllers/from-ward";
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
  app.get("/obliterate", (req, res) => {
    myQueue.obliterate({
      force: true,
    });
    return res.send(200);
  });

  app.get("/start", (req, res) => {
    states.forEach((state) => {
      myQueue.add(JobTypeEnum.STATE, state);
    });
    res.send(200);
  });
  app.get("/process", (req, res) => {
    queueWorker(myQueue, orm.em);
    res.send(200);
  });

  app.get("/from-ward", fromWard(orm.em));
}
main();
