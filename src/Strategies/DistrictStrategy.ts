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
      district: data.value.code,
      list_type: "vdc",
    };
    console.log(
      `Fetching data ${JobTypeEnum.DISTRICT} ${data.value.code}`,
      payload
    );
    const response = await standardAPICall(api, payload);
    console.log(
      `Fetched data ${JobTypeEnum.DISTRICT} ${data.value.code}`,
      payload
    );

    const state = await em.findOne(District, { districtId: data.value.code });
    if (state) {
      return {
        next: null,
        payload: {
          value: [],
          parent: {
            [JobTypeEnum.DISTRICT]: data,
          },
        },
      };
    }
    const districts = transformHTMLOptionsToStandardData(
      response.data.result
    ).map((item) => ({
      ...item,
      parent: data.value.code,
    }));
    return {
      next: JobTypeEnum.MUNCIPAL,
      payload: {
        value: districts,
        parent: {
          [JobTypeEnum.DISTRICT]: data,
        },
      },
    };
  }

  async save(em: EntityManager, data) {
    const state = new District();
    state.name = data.value.name;
    state.districtId = data.value.code;
    state.stateId = data.value.parent;
    console.log("Saving", data);
    await em.persistAndFlush(state);
    return true;
  }
}
