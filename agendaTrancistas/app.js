const express = require('express');
const session = require('express-session');
var path = require('path');
const app = express();
const User = require('./models/User');
const Agendamento = require('./models/Agendamento');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { eAdmin } = require('./middlewares/auth');
const { format } = require('path');
const moment = require('moment');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({secret:"koaskoaskoas"}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));


app.get('/login',(req, res) =>{
    res.render('login')
})

app.get('/index', (req, res) => {
    res.render('../views/index')

})

app.post('/login', async (req, res) => {
   
    const user = await User.findOne({
        attributes: ['id', 'nome', 'senha'],
        where: {
            nome: req.body.username
        }
    })
    

    if (user === null){
        return res.status(400).json({
            erro: true,
            mensagem: "Usuário não encontrado!"});
            
    }
    if(!(await bcrypt.compare(req.body.password, user.senha))){

        return res.status(400).json({
            erro: true,
            mensagem: "Senha incorreta!"})
            
            
    }

    //var token = jwt.sign({id: user.id}, "F98SJ326JAIOWESLPIOE203412",{expiresIn:'7d'});

    // return res.json({erro: false, mensagem: "Login realizado com sucesso!"});


    res.render('index')

    // if(req.body.password == senha && req.body.username == login){
    //     //logado com sucesso!
    //     req.session.username = login;
    //     res.render('../views/index')
    // }else{
    //     res.render('../views/login');
    // }
    
});


app.post("/cadastrar", async (req, res) => 
    
{
    console.log(req.body);
    var dados = req.body
    dados.senha = await bcrypt.hash(dados.senha, 8)
    console.log(dados.senha)
    await User.create(dados)

    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Usuario cadastrado com sucesso!"});
    }).catch(() =>{
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuario não foi cadastrado..."});
    });



});


app.post("/agendar", async (req, res) => 
{
    const {nome, telefone, email, servico, obs, sinal, valorTotal, faltaPagar, data, hora} = req.body;
    await Agendamento.create({
        NM_CLIENTE: nome,
        TELEFONE: telefone,
        EMAIL: email,
        SERVICO: servico,
        OBSERVACAO: obs,
        VL_SINAL: sinal,
        VL_TOTAL: valorTotal,
        VL_PENDENTE: faltaPagar,
        DT_AGENDADA: data,
        HR_AGENDADA: hora
        })
    
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Agendamento cadastrado com sucesso!"});
    }).catch((erro) =>{
        console.log(erro)
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: agendamento não cadastrado..."});
    });

});

app.get('/dia', async (req, res) => {


    let hj = moment().format('YYYY-MM-DD')
    console.log(hj)

    const day = await Agendamento.findAll({
        attributes: ['ID','NM_CLIENTE', 'TELEFONE', 'SERVICO', 'OBSERVACAO', 'VL_SINAL', 'VL_TOTAL','VL_PENDENTE','DT_AGENDADA', 'HR_AGENDADA'],
        where: {
            DT_AGENDADA: hj
        }})
    

    res.render('dia.ejs', {day})
    

})

app.get('/semana', async (req, res) => {

    const { Op } = require("sequelize");
    const semana = await Agendamento.findAll({
        attributes: ['ID','NM_CLIENTE', 'TELEFONE', 'SERVICO', 'OBSERVACAO', 'VL_SINAL', 'VL_TOTAL','VL_PENDENTE','DT_AGENDADA', 'HR_AGENDADA'],
        where: {
            DT_AGENDADA:{[Op.gte]:moment().subtract(7, 'days').toDate()}
        }})
    
    res.render('semana.ejs', {semana})
    
})

app.get('/mes', async (req, res) => {

    const { Op } = require("sequelize");
    const mes = await Agendamento.findAll({
        attributes: ['ID','NM_CLIENTE', 'TELEFONE', 'SERVICO', 'OBSERVACAO', 'VL_SINAL', 'VL_TOTAL','VL_PENDENTE','DT_AGENDADA', 'HR_AGENDADA'],
        where: {
            DT_AGENDADA:{[Op.gte]:moment().subtract(30, 'days').toDate()}
        }})
    
    res.render('mes.ejs', {mes})
    
})



app.post('/periodo', async(req, res) => {

    console.log(req.body)
    
    const { Op } = require("sequelize");
    const agendamentos = await Agendamento.findAll({
        attributes: ['ID','NM_CLIENTE', 'TELEFONE', 'SERVICO', 'OBSERVACAO', 'VL_SINAL', 'VL_TOTAL','VL_PENDENTE','DT_AGENDADA', 'HR_AGENDADA'],
        where: {
            DT_AGENDADA:{[Op.gte]:req.body.data_inicial, [Op.lte]:req.body.data_final}
        }})
    
    res.render('periodo.ejs', {agendamentos})
    
        // .then((dataPeriodo) => {
        //     return res.json({
        //         erro: false,
        //         mensagem: "Consulta recebida!",
        //         dataPeriodo
        //         });
        // }).catch((erro) =>{
        //     console.log(erro)
        //     return res.status(400).json({
        //         erro: true,
        //         mensagem: "Erro: Problema na consulta."});
        // });

})

app.get('/alterar/:id', async (req, res) => {

    const edit = await Agendamento.findAll({
        attributes: ['ID','NM_CLIENTE', 'TELEFONE', 'SERVICO', 'OBSERVACAO', 'VL_SINAL', 'VL_TOTAL','VL_PENDENTE','DT_AGENDADA', 'HR_AGENDADA'],
        where: {
            ID: req.params.id
        }})
    
    res.render('alterar.ejs', {edit: edit[0]})

    
    
})
app.post("/alterar/:id", async (req, res) => 
{
    const {nome, telefone, email, servico, obs, sinal, valorTotal, faltaPagar, data, hora} = req.body;
    await Agendamento.update({
        NM_CLIENTE: nome,
        TELEFONE: telefone,
        EMAIL: email,
        SERVICO: servico,
        OBSERVACAO: obs,
        VL_SINAL: sinal,
        VL_TOTAL: valorTotal,
        VL_PENDENTE: faltaPagar,
        DT_AGENDADA: data,
        HR_AGENDADA: hora
        },{ where: {
            ID: req.params.id
        }})
    
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Cliente alterado!"});
    }).catch((erro) =>{
        console.log(erro)
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: cliente não alterado..."});
    });

});

app.get("/delete/:id", async (req, res) =>{
    
    await Agendamento.destroy({
        where: {
            ID: req.params.id
        }
    })
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Agendamento cancelado!"});
    }).catch((erro) =>{
        console.log(erro)
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Problema no cancelamento..."});
    });
    
})

app.listen(8081,function(){
    console.log("Servidor rodando na porta 8081");
});