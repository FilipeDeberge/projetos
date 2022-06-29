const Sequelize = require('sequelize');
const db = require('./db');

const Agendamento = db.define('tb_agendamentos', 
    {ID: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    NM_CLIENTE: {type: Sequelize.STRING, allowNull: true},
    TELEFONE: {type: Sequelize.STRING, allowNull: true},
    EMAIL: {type: Sequelize.STRING, allowNull: true},
    SERVICO: {type: Sequelize.STRING, allowNull: true},
    OBSERVACAO: {type: Sequelize.STRING, allowNull: true},
    VL_SINAL: {type: Sequelize.DECIMAL, allowNull: true},
    VL_TOTAL: {type: Sequelize.DECIMAL, allowNull: true},
    VL_PENDENTE: {type: Sequelize.DECIMAL, allowNull: true},
    DT_AGENDADA: {type: Sequelize.DATEONLY, allowNull: true},
    HR_AGENDADA: {type: Sequelize.TIME, allowNull: true}});

// Criar tabela
// Agendamento.sync();

module.exports = Agendamento;