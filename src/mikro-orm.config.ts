export default {
  entities: ["./dist/src/entities"], // path to our JS entities (dist), relative to `baseDir`
  entitiesTs: ["./src/entities"], // path to our TS entities (src), relative to `baseDir`
  dbName: "elections",
  type: "mysql",
  allowGlobalContext: true,
  user: "root",
  host: "localhost",
  port: 6603,
  password: "helloworld",
};
