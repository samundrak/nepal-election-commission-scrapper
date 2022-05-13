import { Entity, Property } from "@mikro-orm/core";
import { CustomBaseEntity } from "./CustomBaseEntity";

@Entity()
export default class State extends CustomBaseEntity {
  @Property()
  name!: string;

  @Property()
  stateId!: string;
}
