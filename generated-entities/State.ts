import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class State {

  @PrimaryKey({ length: 255 })
  uuid!: string;

  @Property()
  createdAt!: Date;

  @Property()
  updatedAt!: Date;

  @Property({ length: 255 })
  name!: string;

  @Property({ length: 255 })
  stateId!: string;

}
