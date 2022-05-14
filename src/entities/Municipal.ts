import { Entity, OneToOne, Property } from "@mikro-orm/core";
import { CustomBaseEntity } from "./CustomBaseEntity";
import State from "./State";

@Entity()
export default class Municipal extends CustomBaseEntity {
  @Property()
  name!: string;

  @Property()
  municipalId!: string;

  @Property()
  districtId!: string;
}
