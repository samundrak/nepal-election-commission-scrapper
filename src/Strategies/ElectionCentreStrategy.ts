import { EntityManager } from "@mikro-orm/core";
import ElectionCentre from "../entities/ElectionCentre";
import Voter from "../entities/Voter";
import { JobTypeEnum } from "../enum/JobTypEnum";
import {
  IDataFetchArgument,
  IDataFetchResponse,
} from "../interfaces/IDataFetchResponse";
import { IStandardData } from "../interfaces/IStandardData";
import { standardAPICall, getVoterListFromRawHTML } from "../utils";
import IDataFetchStrategy from "./IDataFetchStrategy";

export class ElectionCentreStrategy implements IDataFetchStrategy {
  async fetch(em: EntityManager, data): Promise<IDataFetchResponse> {
    const api = "https://voterlist.election.gov.np/bbvrs1/view_ward_1.php";
    const typedData = data as IDataFetchArgument["payload"];
    const payload = {
      state:
        typedData.parent[JobTypeEnum.WARD].parent[JobTypeEnum.MUNCIPAL].parent[
          JobTypeEnum.DISTRICT
          //@ts-expect-error
        ].parent[JobTypeEnum.STATE].code,
      district:
        typedData.parent[JobTypeEnum.WARD].parent[JobTypeEnum.MUNCIPAL].parent[
          JobTypeEnum.DISTRICT
        ].value.code,
      vdc_mun:
        typedData.parent[JobTypeEnum.WARD].parent[JobTypeEnum.MUNCIPAL].value
          .code,
      ward: typedData.parent[JobTypeEnum.WARD].value.code,
      reg_centre: data.value.code,
    };
    const state = await em.findOne(ElectionCentre, {
      electionCentreId: data.code,
    });
    if (state) {
      return {
        next: null,
        payload: {
          value: [],
          parent: {
            [JobTypeEnum.LOCAL_CENTRE]: data,
          },
        },
      };
    }
    console.log(
      `Fetching data ${JobTypeEnum.LOCAL_CENTRE} ${data.code}`,
      payload
    );
    const response = await standardAPICall(api, payload);
    console.log(
      `Fetched data ${JobTypeEnum.LOCAL_CENTRE} ${data.code}`,
      payload
    );
    const entitties = getVoterListFromRawHTML(response.data).map((item) => {
      const voter = new Voter();
      voter.age = item.age;
      voter.spouseName = item.spouseName;
      voter.gender = item.gender;
      voter.fatherName = item.fatherName;
      voter.motherName = item.motherName;
      voter.voterId = item.voterId;
      voter.voterName = item.voterName;
      voter.stateId = payload.state;
      voter.districtId = payload.district;
      voter.wardId = payload.ward;
      voter.ec_centreId = payload.reg_centre;
      voter.municipalId = payload.vdc_mun;

      return voter;
    });

    await em.persistAndFlush(entitties);

    return {
      next: null,
      payload: {
        value: [],
        parent: {
          [JobTypeEnum.LOCAL_CENTRE]: null,
        },
      },
    };
  }

  async save(em: EntityManager, data) {
    const state = new ElectionCentre();
    state.name = data.value.name;
    state.wardId = data.value.code;
    state.electionCentreId = data.value.parent;
    await em.persistAndFlush(state);
    return true;
  }
}
