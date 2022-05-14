import { Entity, Property } from "@mikro-orm/core";
import { CustomBaseEntity } from "./CustomBaseEntity";

@Entity()
export default class Voter extends CustomBaseEntity {
  @Property()
  voterId!: string;

  @Property()
  voterName!: string;

  @Property()
  age!: string;

  @Property()
  spouseName!: string;

  @Property()
  fatherName!: string;

  @Property()
  motherName!: string;

  @Property()
  gender!: string;

  @Property()
  stateId!: string;

  @Property()
  districtId!: string;

  @Property()
  municipalId!: string;

  @Property()
  wardId!: string;

  @Property()
  ec_centreId!: string;
}
