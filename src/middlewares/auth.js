// const jwt = require('jsonwebtoken')
require("dotenv-safe").config()

//midlleware para verificar autenticacao
const verificacao = (req, res, next) => {

    const token = req.headers['authorization'] || req.headers['x-access-token']

    if (!token) return res.status(401).send({ auth: false, erros: "token nao fornecido" })

    if (token != process.env.SECRET)
        res.status(500).send({ auth: false, erros: "falha ao autenticar token" })
    else
        next()
}

module.exports = verificacao