import { JobTypeEnum } from "../enum/JobTypEnum";
import { IStandardData } from "./IStandardData";

export interface IDataFetchResponsePayload {
  value: IStandardData;
  parent?: IDataFetchResponsePayload;
}
export interface IDataFetchResponse {
  next: JobTypeEnum | null;
  payload: {
    value: IStandardData[];
    parent: {
      [key: string]: IDataFetchResponse["payload"] | null;
    };
  };
}

export interface IDataFetchArgument {
  next: JobTypeEnum | null;
  payload: {
    value: IStandardData;
    parent: {
      [key: string]: IDataFetchArgument["payload"];
    };
  };
}
