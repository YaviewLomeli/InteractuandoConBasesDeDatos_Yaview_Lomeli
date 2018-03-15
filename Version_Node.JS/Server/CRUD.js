const Models   = require('./model.js');
      //bcrypt = require('bcrypt');


module.exports.ingresarUsuario = function(nombre, email,pass){

  let usuario = new Models.User({
    id: Math.floor((Math.random() * 1000) + 1),
    nombre: nombre,
    email: email,
    pass: pass
  })

  usuario.save((err)=>{
    if(err)console.log(err)
    console.log('Registrado')
  })

}

module.exports.ingresarEventos = function(titulo,inicio,final,id_user){

  let evento = new Models.Eventos({
    id: Math.floor((Math.random() * 1000) + 1),
    title: titulo,
    id_user: id_user,
    start: inicio,
    end: final
  })

  evento.save((err)=>{
    if(err)console.log(err)
    console.log('Evento registrado')
  })

}

module.exports.encontrarYValidar = function(user, pass){
  User.findOne({email:user, pass:pass}).exec((err,res)=>{
    if(err){
      res.json(err)
      res.status(500)
    }
    if(res == null){
      res.end('Denegado')
    }
    if(res !== null){
      res.end('Validado')
    }
  })
}

/*
module.exports.crypto = function(pass){
  const saltRounds = 10;
        password   = pass;

  bcrypt.genSalt(saltRounds, (err,salt)=>{
    bcrypt.hash(password,salt,(err,hash)=>{
      if(err)return 'FAIL'
      return(hash);
    })
  })

}

module.exports.descrypto = function(pass,hash){
  const saltRounds = 10;
        password   = pass;

  bcrypt.compare(password,hash,(err,res)=>{
    if(err)console.log(err)
    if(res==true)console.log('OK')
    if(res==false)console.log('Denied')
  })

}

*/
