import { EntityManager } from "@mikro-orm/core";
import { JobTypeEnum } from "../enum/JobTypEnum";
import { IDataFetchResponse } from "../interfaces/IDataFetchResponse";
import { IStandardData } from "../interfaces/IStandardData";

export default interface IDataFetchStrategy {
  fetch(
    em: EntityManager,
    data: IStandardData
  ): Promise<IDataFetchResponse | Error>;

  save(em: EntityManager, data: any): Promise<boolean>;
}
