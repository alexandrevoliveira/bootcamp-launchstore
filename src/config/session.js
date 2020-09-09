const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const db = require('./db')

module.exports = session({
    // store: conexao com o banco de dados
    store: new pgSession({
        pool: db
    }),
    secret: "iabadabadu", // chave secreta
    resave: false, // toda vez que fizer o load, não será salvo a sessão
    saveUninitialized: false, //salva sem dado algum caso setar true, nesse caso nao quero salvar sem dado algum do usuario
    cookie: {
        maxAge: 30*24*60*60*1000 // quanto tempo a sessão ficará ativa no banco de dados, nesse caso 30 dias. Cálculo feito em milissegundos.
    }
})