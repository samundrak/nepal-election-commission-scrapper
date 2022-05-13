import { EntityManager } from "@mikro-orm/core";
import District from "../entities/District";
import { JobTypeEnum } from "../enum/JobTypEnum";
import { IDataFetchResponse } from "../interfaces/IDataFetchResponse";
import { IStandardData } from "../interfaces/IStandardData";
import { standardAPICall, transformHTMLOptionsToStandardData } from "../utils";
import IDataFetchStrategy from "./IDataFetchStrategy";

export class DistrictStrategy implements IDataFetchStrategy {
  async fetch(em: EntityManager, data): Promise<IDataFetchResponse> {
    const api = "https://voterlist.election.gov.np/bbvrs1/index_process_1.php";
    const payload = {
      state: data.code,
      list_type: "district",
    };
    console.log(`Fetching data ${data.code}`, payload);
    const response = await standardAPICall(api, payload);
    console.log(`Fetched data ${data.code}`, payload);

    const state = await em.findOne(District, { districtId: data.code });
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
    // const state = new District();
    // state.name = data.name;
    // state.districtId = data.code;
    // state.stateId = data.parent;
    console.log("Saving", data);
    // await em.persistAndFlush(state);
    return true;
  }
}
