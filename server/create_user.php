<?php
require('lib.php');
$con = new ConectorDB('localhost','YaviewLomeli','soyunhijodeDios');

if($con->initConexion('agenda_db') == 'OK'){
  $datos['nombre'] = 'Jurgen Klaric';
  $datos['psw'] = password_hash(md5('Hola'),PASSWORD_DEFAULT);
  $datos['email'] = 'jurgen@biia.com';
  $datos['id'] = 'null';
  if($con->inserData('usuarios',$datos)){
    echo "Se registraron los datos.";
  }else echo "No se registraron los datos";


  $datos['nombre'] = 'Jennifer Lopez';
  $datos['psw'] = password_hash(md5('12345'),PASSWORD_DEFAULT);
  $datos['email'] = 'JL@mail.com';
  $datos['id'] = 'null';
  if($con->inserData('usuarios',$datos)){
    echo "Se registraron los datos.";
  }else echo "No se registraron los datos";


  $datos['nombre'] = 'Jaime Camil';
  $datos['psw'] = password_hash(md5('789987'),PASSWORD_DEFAULT);
  $datos['email'] = 'JC@tv.com';
  $datos['id'] = 'null';
  if($con->inserData('usuarios',$datos)){
    echo "Se registraron los datos.";
  }else echo "No se registraron los datos";
}else echo "Error en la conexion.";

$con->closeConexion();

 ?>
