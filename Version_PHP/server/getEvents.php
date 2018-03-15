<?php

require('lib.php');

session_start();

if(isset($_SESSION['id'])){
  $con = new ConectorDB('localhost','YaviewLomeli','soyunhijodeDios');
  if($con->initConexion('agenda_db') == 'OK'){

    $resultado = $con->consultar(['usuarios'],['id'],'WHERE email="'.$_SESSION['username'].'"');
    $fila = $resultado->fetch_assoc();
    $resultado = $con->consultar(['eventos'],['id','titulo','fecha_inicio','fecha_final','hora_inicio','hora_final','todo_dia'],'WHERE fk_usuarios="'.$fila['id'].'"');
    $i = 0;
    while($fila = $resultado->fetch_assoc()){
      if($fila['todo_dia'] == 1){
        $todoDia = true;
      }else{
        $todoDia = false;
      }
      $response['eventos'][$i] = array(
        "id" => $fila['id'],
        "title" => $fila['titulo'],
        "start" => $fila['fecha_inicio']."T".$fila["hora_inicio"],
        "end" => $fila['fecha_final'].'T'.$fila["hora_final"],
        "allDay" => $todoDia
      );
      $i++;
    }
    $response['msg'] = 'OK';
  }else{
    $response['msg'] = 'No se pudo conectar a la base de datos';
  }
}else{
  $response['msg'] = 'No se ha iniciado una sesíon';
}

echo json_encode($response);

/*$consulta = $con->consultarDatos(['eventos'], ['eventos.*'], 'INNER JOIN usuarios ON usuarios.id=eventos.user_id AND usuarios.id='.$_SESSION['user_id']);*/

 ?>
