import { Sequelize } from "sequelize";
import { databaseConfig } from "./config.js";
const {
  DATABASE_DIALECT,
  DATABASE_USER,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
} = process.env;
console.log("1", DATABASE_DIALECT);

const sequelize = new Sequelize(databaseConfig);

export default sequelize;
