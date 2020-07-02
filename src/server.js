/* IMPORTANDO MODULOS */ 
const express = require('express')  // importamos o modulo express (servidor) na variavel express
const nunjucks = require('nunjucks') 
const routes = require('./routes') 
const methodOverride = require('method-override')

const server = express() // criação do servidor na variável server

server.use(express.urlencoded({ extended: true })) // urlencoded é um parser das informações vindas no corpo da requisição
server.use(express.static('public')) // serve arquivos estáticos da pasta public
server.use(methodOverride('_method')) // método para que possamos utilizar PUT e DELETE nos forms
server.use(routes) // rotas

server.set("view engine", "njk") // setamos aqui a view engine (motor de visualização) para arquivos .njk

//configuramos o nunjucks. primeiro argumento: caminho da pasta, segundo: configurações.
nunjucks.configure("src/app/views", {
    express: server,
    autoescape: false,
    noCache: true
})

// escutando o servidor na porta 5000
server.listen(5000, function() {
    console.log("server is running")
})

