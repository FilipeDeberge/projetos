(async() => {
    console.log("Começou!")
    const db = require("./db");
    const agendamentos = await db.selectAgendamentos()
    console.log(agendamentos)
})();

function agendar(){
    document.getElementById("form").innerHTML =
    `<form id="form_agendar" >
    <div class="form-group">
    <input name ='nome' type='text' placeholder='Nome'>
    <input name ='telefone' type='tel' placeholder='Telefone' pattern='[0-9]{2}[0-9]{5}[0-9]{4}'>
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
    <input onclick = "enviar(event)" type='submit' value='AGENDAR'>
    </form>`

}

async function enviar(event){
    event.preventDefault();
    const nome = document.getElementById("form_agendar").nome.value
    const telefone = document.getElementById("form_agendar").telefone.value
    const email = document.getElementById("form_agendar").email.value
    const servico = document.getElementById("form_agendar").servico.value
    const obs = document.getElementById("form_agendar").obs.value
    const sinal = document.getElementById("form_agendar").sinal.value
    const valorTotal = document.getElementById("form_agendar").valorTotal.value
    const faltaPagar = document.getElementById("form_agendar").faltaPagar.value
    const data = document.getElementById("form_agendar").data.value
    const hora = document.getElementById("form_agendar").hora.value

    (async() => {
        
        const db = require("./db");
        console.log("Começou!")
        console.log('INSERT INTO CLIENTES');
        const result = await db.insertAgendamentos(nome, telefone, email, servico, obs, sinal, valorTotal, faltaPagar, data, hora)
        console.log(result.rowCount);
    })();
    
  
    

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