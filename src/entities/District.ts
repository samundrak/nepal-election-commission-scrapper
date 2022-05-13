import { Entity, OneToOne, Property } from "@mikro-orm/core";
import { CustomBaseEntity } from "./CustomBaseEntity";
import State from "./State";

@Entity()
export default class District extends CustomBaseEntity {
  @Property()
  name!: string;

  @Property()
  districtId!: string;

  @OneToOne(() => State, (state) => state.stateId)
  stateId!: State;
}
