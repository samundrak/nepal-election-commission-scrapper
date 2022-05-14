import { EntityManager } from "@mikro-orm/core";
import { JobTypeEnum } from "../enum/JobTypEnum";
import { IDataFetchResponse } from "../interfaces/IDataFetchResponse";
import { IStandardData } from "../interfaces/IStandardData";
import { standardAPICall, transformHTMLOptionsToStandardData } from "../utils";
import IDataFetchStrategy from "./IDataFetchStrategy";
import MunicipalEntity from "../entities/Municipal";
export class MunicipalStrategy implements IDataFetchStrategy {
  async fetch(em: EntityManager, data): Promise<IDataFetchResponse> {
    const api = "https://voterlist.election.gov.np/bbvrs1/index_process_1.php";
    const payload = {
      vdc: data.value.code,
      list_type: "ward",
    };
    console.log(
      `Fetching data ${JobTypeEnum.MUNCIPAL} ${data.value.code}`,
      payload
    );
    const response = await standardAPICall(api, payload);
    console.log(
      `Fetched data ${JobTypeEnum.MUNCIPAL} ${data.value.code}`,
      payload
    );

    const state = await em.findOne(MunicipalEntity, {
      municipalId: data.value.code,
    });
    if (state) {
      return {
        next: null,
        payload: {
          value: [],
          parent: {
            [JobTypeEnum.MUNCIPAL]: data,
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
      next: JobTypeEnum.WARD,
      payload: {
        value: districts,
        parent: {
          [JobTypeEnum.MUNCIPAL]: data,
        },
      },
    };
  }

  async save(em: EntityManager, data) {
    const state = new MunicipalEntity();
    state.name = data.value.name;
    state.municipalId = data.value.code;
    state.districtId = data.value.parent;
    console.log("Saving", data);
    await em.persistAndFlush(state);
    return true;
  }
}
