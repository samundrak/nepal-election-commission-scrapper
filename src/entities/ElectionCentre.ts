import { Entity, Property } from "@mikro-orm/core";
import { CustomBaseEntity } from "./CustomBaseEntity";

@Entity()
export default class ElectionCentre extends CustomBaseEntity {
  @Property()
  name!: string;

  @Property()
  electionCentreId!: string;

  @Property()
  wardId!: string;
}
