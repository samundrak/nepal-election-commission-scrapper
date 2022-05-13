import { JobTypeEnum } from "../enum/JobTypEnum";
import { IStandardData } from "./IStandardData";

export interface IDataFetchResponse {
  next: JobTypeEnum | null;
  payload: IStandardData[];
}
