const express     = require('express'),
      Router      = express.Router(),
      Models      = require('./model.js'),
      Operaciones = require('./CRUD.js')

//-------------Verifica Usuario
Router.post('/login',(req,res)=>{
  var user = req.body.user;
  var pass = req.body.pass;

  Models.User.findOne({email:user, pass:pass}).exec((err,doc)=>{
    if(err){
      var response = {
        msg:'Denegado',
        estate: err
      }
    }

    if(doc == null){
      var response = {
        msg:'Denegado',
        state: err
      }
    }else{
      var response = {
        msg:'Validado',
        state: doc
      }
    }

    res.send(response)
  })

})

//-------------Obtener Eventos
Router.get('/events/all/:id',(req,res)=>{
  let idi = req.params.id;
  let id = Number(idi)
  Models.Eventos.find({id_user: id}).exec((err,doc)=>{
    if(err){
      res.status(500)
    }
    res.json(doc)
  })
})

//-------------Eliminar Eventos
Router.post('/events/delete/:id', (req,res)=>{
  let id = req.body.id;
  Models.Eventos.remove({id:id},(err)=>{
    if(err)res.send(`Error al eliminar lo datos: ${err}`)
    res.send('Se elimino el registro correctamente. Desaparecera la proxima vez que ingrese.')
  })
})

//-------------Ingresar Nuevo Evento
Router.post('/events/new',(req,res) => {

  let titulo = req.body.title
  let inicio = req.body.start
  let final = req.body.end
  let id_user = req.body.id

  Operaciones.ingresarEventos(titulo,inicio,final,id_user)
    res.send('Evento Registrado')


})

//-------------Actializar Evento
Router.post('/events/update',(req,res)=>{
  var id = req.body.id;
  var start = req.body.fechaInicio;
  var end = req.body.fechaFin

  Models.Eventos.update({id:id},{start:start,end:end},(err,doc)=>{
    if(err){
      var respuesta = {
        exito: true
      }
    }else{
      var respuesta = {
        exito: true
      }
    }
  res.send(respuesta)
  })

})

module.exports = Router;
