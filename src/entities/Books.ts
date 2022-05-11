import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Book extends BaseEntity {
  @Property()
  title!: string;
}
