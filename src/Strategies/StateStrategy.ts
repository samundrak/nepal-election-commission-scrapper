import IDataFetchStrategy from "./IDataFetchStrategy";
import axios from "axios";
import { standardAPICall, transformHTMLOptionsToStandardData } from "../utils";
import { JobTypeEnum } from "../enum/JobTypEnum";
import { IDataFetchResponse } from "../interfaces/IDataFetchResponse";
import { IStandardData } from "../interfaces/IStandardData";
import State from "../entities/State";
import { EntityManager } from "@mikro-orm/core";

export default class StateStrategy implements IDataFetchStrategy {
  async fetch(em: EntityManager, data): Promise<IDataFetchResponse> {
    const api = "https://voterlist.election.gov.np/bbvrs1/index_process_1.php";
    const payload = {
      state: data.code,
      list_type: "district",
    };
    console.log(`Fetching data ${data.code}`, payload);
    const response = await standardAPICall(api, payload);
    console.log(`Fetched data ${data.code}`, payload);

    const state = await em.findOne(State, { stateId: data.code });
    if (state) {
      return {
        next: null,
        payload: [],
      };
    }
    const districts = transformHTMLOptionsToStandardData(
      response.data.result
    ).map((item) => ({
      ...item,
      parent: data.code,
    }));
    return {
      next: JobTypeEnum.DISTRICT,
      payload: districts,
    };
  }

  async save(em: EntityManager, data: IStandardData) {
    const state = new State();
    state.name = data.name;
    state.stateId = data.code;
    console.log("Saving", data);
    await em.persistAndFlush(state);
    return true;
  }
}
