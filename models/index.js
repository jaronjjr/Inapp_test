import fs from "fs";
import path from "path";
const basename = path.basename(module.filename);
import Sequelize from "sequelize";

var db = {};

import dotenv from "dotenv";
dotenv.config();
const Op = Sequelize.Op;
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    //logging: false,
    dialect: "postgres",
    dialectOptions: {
      useUTC: false, // for reading from database
    },
    timezone: '+05:30',
    operatorsAliases: {
      $and: Op.and,
      $or: Op.or,
      $not:Op.not,
      $eq: Op.eq,
      $gt: Op.gt,
      $gte: Op.gte,
      $lt: Op.lt,
      $lte: Op.lte,
      $between: Op.between,
      $notBetween:Op.notBetween,
      $like: Op.like,
      $iLike: Op.iLike,
      $in: Op.in,
      $notIn: Op.notIn,
    },

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      freezeTableName: true,
    },
  }
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

// Object.keys(db).forEach(function(modelName) {
//     if (db[modelName].associate) {
//       db[modelName].associate(db);
//     }
//   });

Object.keys(db).forEach((key) => {
  if ("associate" in db[key]) {
    db[key].associate(db);
  }
});
console.log(db);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
