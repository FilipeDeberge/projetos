const jwt = require('jsonwebtoken')
const { promisify } = require('util')

module.exports = {
    eAdmin: async function (req, res, next){
        const authHeader = req.headers.authorization;
        console.log(authHeader)
        if(!authHeader){
            return res.status(400).json({erro: true, mensagem: "Erro. Token não informado."});
        }
        const[, token ]= authHeader.split(' ');
        console.log("token: " + token);

        if(!token){
            return res.status(400).json({erro: true, mensagem: "Erro. Token não informado b."});
        }

        try{
            const decode = await promisify(jwt.verify)(token, )
            return next();
        }catch(err){
            return res.status(400).json({erro: true, mensagem: "Erro. Token não informado c."});
        }
        
    }
}