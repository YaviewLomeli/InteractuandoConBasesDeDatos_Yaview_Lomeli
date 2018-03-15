const http     = require('http'),
      express  = require('express'),
      mongoose = require('mongoose'),
      Operaciones = require('./CRUD.js')


const app  = express(),
      PORT = 8080;

Server = http.createServer(app)
mongoose.connect('mongodb://localhost/AgendaDB')

Server.listen(PORT,()=>{
  console.log(`Server listening on port: ${PORT}`)
  Operaciones.ingresarUsuario('Ignacio Centeno','IC@mail.com','Hola3')
})
