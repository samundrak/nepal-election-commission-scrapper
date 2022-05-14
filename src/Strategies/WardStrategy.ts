import { EntityManager } from "@mikro-orm/core";
import District from "../entities/District";
import Ward from "../entities/Ward";
import { JobTypeEnum } from "../enum/JobTypEnum";
import { IDataFetchResponse } from "../interfaces/IDataFetchResponse";
import { IStandardData } from "../interfaces/IStandardData";
import { standardAPICall, transformHTMLOptionsToStandardData } from "../utils";
import IDataFetchStrategy from "./IDataFetchStrategy";

export class WardStrategy implements IDataFetchStrategy {
  async fetch(em: EntityManager, data): Promise<IDataFetchResponse> {
    const api = "https://voterlist.election.gov.np/bbvrs1/index_process_1.php";
    const payload = {
      ward: data.value.code,
      list_type: "reg_centre",
      vdc: data.value.parent,
    };
    const state = await em.findOne(Ward, { wardId: data.value.code });
    if (state) {
      return {
        next: null,
        payload: {
          value: [],
          parent: {
            [JobTypeEnum.WARD]: data,
          },
        },
      };
    }
    console.log(
      `Fetching data ${JobTypeEnum.WARD} ${data.value.code}`,
      payload
    );
    const response = await standardAPICall(api, payload);
    console.log(`Fetched data ${JobTypeEnum.WARD} ${data.value.code}`, payload);

    const districts = transformHTMLOptionsToStandardData(
      response.data.result
    ).map((item) => ({
      ...item,
      parent: data.value.code,
    }));
    return {
      next: JobTypeEnum.LOCAL_CENTRE,
      payload: {
        value: districts,
        parent: {
          [JobTypeEnum.WARD]: data,
        },
      },
    };
  }

  async save(em: EntityManager, data) {
    const state = new Ward();
    state.name = data.value.name;
    state.wardId = data.value.code;
    state.municipalId = data.value.parent;
    console.log("Saving", data);
    await em.persistAndFlush(state);
    return true;
  }
}
