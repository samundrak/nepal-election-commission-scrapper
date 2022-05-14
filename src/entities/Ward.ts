import { Entity, OneToOne, Property } from "@mikro-orm/core";
import { CustomBaseEntity } from "./CustomBaseEntity";
import State from "./State";

@Entity()
export default class Ward extends CustomBaseEntity {
  @Property()
  name!: string;

  @Property()
  wardId!: string;

  @Property()
  municipalId!: string;
}
