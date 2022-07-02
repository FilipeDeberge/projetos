function agendar(){
    document.getElementById("form").innerHTML =
    `<form id="form_agendar" action = "http://localhost:8081/agendar" method= "POST">
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
    <input type='submit' value='AGENDAR'>
    </form>`

}

function excluir(id){
    var res = confirm("Deseja excluir o agendamento?");
    if (res == true) {
        var url = "http://localhost:8081/delete/"+id;
        window.location.href = url;
    }

}

function verSemana(){

}
function verMes(){

}
function periodo(){
    document.getElementById("form").innerHTML =
    `<form id="form_periodo" action = "http://localhost:8081/periodo" method= "POST">
    <h1 class="titulos">Selecione o Período</h1>
    <div class="form-group">
    <input name ='data_inicial' type='date' placeholder='Data Inicial'>
    <input name ='data_final' type='date' placeholder='Data Final'>
    </div>
    <input type='submit' value='PERIODO' onclick = "obterDados()">
    </form>`
    
}
