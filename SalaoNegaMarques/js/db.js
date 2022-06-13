async function connect(){
    
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:Mefazviver77!@localhost:3306/agenda");
    console.log("Conectado com sucesso!");
    global.connection = connection;
    return connection;
        
}
async function selectAgendamentos(){
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM tb_agendamentos;");
    return rows;
}

async function insertAgendamentos(agendamento){
    const conn = await connect();
    const sql = 'INSERT INTO tb_agendamentos (NM_CLIENTE, TELEFONE, EMAIL, SERVICO, OBSERVACAO, VL_SINAL, VL_TOTAL, VL_PENDENTE, DT_AGENDADA, HR_AGENDADA) VALUES (?,?,?,?,?,?,?,?,?,?)';
    const values = [agendamento.nome, agendamento.telefone, agendamento.email, agendamento.servico, agendamento.obs, agendamento.sinal, agendamento.valorTotal, agendamento.faltaPagar, agendamento.data, agendamento.hora];
    await conn.query(sql, values);
}

module.exports = {selectAgendamentos, insertAgendamentos};
