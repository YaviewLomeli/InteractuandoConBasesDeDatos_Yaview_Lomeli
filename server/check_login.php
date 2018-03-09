<?php
require('lib.php');
session_start();
$con = new ConectorDB('localhost','YaviewLomeli','soyunhijodeDios');

$user = $_POST['username'];
$password = $_POST['password'];

if($con->initConexion('agenda_db') == 'OK'){
  $resul = $con->consultar(['usuarios'],['email','psw','id'],'WHERE email="'.$user.'"');

  while($filas = $resul->fetch_array()){

    if($con->verifyPassword($password,$filas['psw']) == 'OK'){
      $_SESSION['id'] = $filas['id'];
      $_SESSION['username'] = $filas['email'];

      $response['msg'] = 'OK';

    }else{
      $response['msg'] = 'La contraseña es incorrecta.';
    }

  }

 echo json_encode($response);

}else $response['msg'] = "Error en la conexion.";



$con->closeConexion();

?>
