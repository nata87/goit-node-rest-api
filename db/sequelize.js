import { Sequelize } from "sequelize";
// import { databaseConfig } from "./config.js";

// const sequelize = new Sequelize(databaseConfig);

const {
  DATABASE_DIALECT,
  DATABASE_NAME,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
} = process.env;

const sequelize = new Sequelize({
  dialect: DATABASE_DIALECT,
  database: DATABASE_NAME,
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  dialectOptions: {
    ssl: true,
  },
});

export default sequelize;
