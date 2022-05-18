import { EntityManager } from "@mikro-orm/knex";
import Ward from "../entities/Ward";
import { JobTypeEnum } from "../enum/JobTypEnum";
import { myQueue } from "../queue";

export default (em: EntityManager) =>
  function (req, res) {
    return (async function () {
      try {
        const wards = await em.execute(
          "SELECT ward_id as wardId,state.state_id as stateId, municipal.municipal_id as municipalId, district.district_id as districtId FROM ward LEFT JOIN municipal on municipal.municipal_id = ward.municipal_id left join district on district.district_id = municipal.district_id left join state on state.state_id = district.state_id ORDER BY `stateId` DESC"
        );

        const jobs = wards.map((ward) => {
          return {
            name: JobTypeEnum.WARD,
            data: {
              value: {
                name: "5",
                code: ward.wardId,
                parent: ward.municipalId,
              },
              parent: {
                MUNCIPAL: {
                  value: {
                    name: "नाम्खा गाउँपालिका",
                    code: ward.municipalId,
                    parent: ward.districtId,
                  },
                  parent: {
                    DISTRICT: {
                      value: {
                        name: "हुम्ला",
                        code: ward.districtId,
                        parent: ward.stateId,
                      },
                      parent: {
                        STATE: {
                          name: "कर्णाली प्रदेश",
                          code: ward.stateId,
                        },
                      },
                    },
                  },
                },
              },
            },
          };
        });
        myQueue.addBulk(jobs);
      } catch (err) {
        res.send(200);
      }
    })();
  };
