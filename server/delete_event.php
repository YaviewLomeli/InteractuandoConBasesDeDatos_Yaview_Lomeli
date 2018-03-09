<?php

  require('lib.php');

  $con = new ConectorDB('localhost','YaviewLomeli','soyunhijodeDios');

  if($con->initConexion('agenda_db') == 'OK'){
    $id = $_POST['id'];
    if($con->eliminarRegistro('eventos',$id)){
      $response['msg'] = 'OK';
    }$response['msg'] = 'Se elimino el registro';
    echo json_encode($response);
  }else echo 'Conexion fallida.';

 ?>
