import { MikroORM } from "@mikro-orm/core";
import type { MySqlDriver } from "@mikro-orm/mysql"; // or any other driver package
import { Book } from "./entities/Books";

async function main() {
  const orm = await MikroORM.init<MySqlDriver>();

  const book = new Book();
  book.title = "samundra";
  orm.em.persist(book);

  await orm.em.flush();
}
main();
