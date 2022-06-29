const Sequelize = require('sequelize');
require('dotenv').config();

const database = process.env.database;
const user = process.env.user;
const password = process.env.password;
const host = process.env.host;
const dialect = process.env.dialect;

const sequelize = new Sequelize(database,user,password,{host: host, dialect: dialect});

sequelize.authenticate().then(() => {console.log("Conexão realizada com sucesso!")}).catch(err => {console.log(err);});

module.exports = sequelize;