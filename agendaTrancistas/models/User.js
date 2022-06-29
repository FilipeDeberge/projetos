const Sequelize = require('sequelize');
const db = require('./db');

const User = db.define('tb_usuarios', {id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}, 
    nome: {type: Sequelize.STRING, allowNull: false},
    email: {type: Sequelize.STRING, allowNull: true}, 
    telefone: {type: Sequelize.STRING, allowNull: true}, 
    senha: {type: Sequelize.STRING, allowNull: false}});

// Criar tabela
// User.sync();

module.exports = User;