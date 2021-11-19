require("dotenv").config();
const { Sequelize } = require("sequelize");
const { config } = require("../config/config");
const setupModels = require("../db/models/index");

// let URI = '';
// if(config.isProd){
//     URI = config.dbUrl;
// } else {
//     const USER = encodeURIComponent(config.dbUser)
//     const PASSWORD = encodeURIComponent(config.dbPassword)
//     URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
// }

const options = {
  dialect: "postgres",
  logging: false
};
if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
  options.logging = false;
}

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

// sequelize.sync({ force: true });

module.exports = sequelize;
