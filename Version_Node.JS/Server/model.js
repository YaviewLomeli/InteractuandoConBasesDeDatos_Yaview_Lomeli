mongoose = require('mongoose'),
Schema   = mongoose.Schema;

var userSchema = new Schema({
  id: {type: Number, required:true, unique:true},
  nombre: {type: String, required:true},
  email: {type: String, required:true},
  pass: {type: String, required:true}
})

var eventSchema = new Schema({
  id:{type:Number,required:true,unique:true},
  title:{type:String,required:true},
  id_user:{type:Number,required:true},
  start:{type:String,required:true},
  end:{type:String,required:true}
})

var User = mongoose.model('User',userSchema)
var Eventos = mongoose.model('Eventos',eventSchema);

module.exports = {
  User:User,
  Eventos:Eventos
}
