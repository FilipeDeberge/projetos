(async() => {
    const db = require("./db")
    console.log("Começou!")
    const agendamentos = await db.selectAgendamentos()
    console.log(agendamentos)
})();

function agendar(){
    document.getElementById("form").innerHTML =
    `<form id="form_agendar" action="" method="post">
    <div class="form-group">
    <input name ='nome' type='text' placeholder='Nome'>
    <input name ='telefone' type='tel' placeholder='Telefone' pattern='[0-9]{2}-[0-9]{5}-[0-9]{4}'>
    </div>
    <div class="form-group">
    <input name ='email' type='email' placeholder='Email'>
    <input name ='servico' type='text' placeholder='Serviço'>
    </div>
    <div class="form-group">
    <input name ='obs' type='text' placeholder='Observações'>
    <input name ='sinal' type = 'number' placeholder='Sinal'>
    </div>
    <div class="form-group">
    <input name ='valorTotal' type = 'number' placeholder='Valor Total'>
    <input name ='faltaPagar' type = 'number' placeholder='Valor Pendente'>
    </div>
    <div class="form-group">
    <input name ='data' type='date' placeholder='Data'>
    <input name ='hora' type='time' placeholder='Horário'>
    </div>
    <input type='submit' value='AGENDAR'>
    </form>`

}
function verDia(){

}
function verSemana(){

}
function verMes(){

}
function periodo(){

}
function valores(){

}