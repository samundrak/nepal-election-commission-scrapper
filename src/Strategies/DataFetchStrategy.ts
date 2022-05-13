import { EntityManager } from "@mikro-orm/core";
import { IStandardData } from "../interfaces/IStandardData";
import IDataFetchStrategy from "./IDataFetchStrategy";

export class DataFetchStrategy implements IDataFetchStrategy {
  constructor(private strategy: IDataFetchStrategy) {}
  fetch(em: EntityManager, data: IStandardData) {
    return this.strategy.fetch(em, data);
  }

  save(em: EntityManager, data: IStandardData) {
    return this.strategy.save(em, data);
  }
}
