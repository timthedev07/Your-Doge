const MODE = process.env.NODE_ENV;

const basedir = MODE === "production" ? "dist" : "src";
const fileType = MODE === "production" ? "js" : "ts";

module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: "homework-manager",
  synchronize: true,
  logging: false,
  entities: [`${basedir}/entity/**/*.${fileType}`],
  migrations: [`${basedir}/migrations/**/*.${fileType}`],
  subscribers: [`${basedir}/subscriber/**/*.${fileType}`],
  cli: {
    entitiesDir: `${basedir}/entity`,
    migrationsDir: `${basedir}/migrations`,
    subscribersDir: `${basedir}/subscriber`,
  },
};
