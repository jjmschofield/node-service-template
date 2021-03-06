import {Sequelize} from "sequelize";
import * as heroes from "../hero/lib";

let sequelize: Sequelize;

export const initDb = async () => {
  sequelize = new Sequelize(
    process.env.DB_CONNECTION_STRING || 'DB connection string not set',
    {
      logging: false,
    });

  await sequelize.authenticate(); // just tests that the connection works

  heroes.init(sequelize);
};

export const getDb = (): Sequelize => {
  return sequelize;
}
