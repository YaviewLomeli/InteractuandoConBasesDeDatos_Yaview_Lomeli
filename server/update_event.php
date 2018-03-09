<?php
require('lib.php');
session_start();

if(isset($_SESSION['username'])){
  $con = new ConectorDB('localhost','YaviewLomeli','soyunhijodeDios');

  if($con->initConexion('agenda_db') == 'OK'){

    $datos['id'] = $_POST['id'];
    $datos['fecha_inicio'] = $_POST['start_date'];
    $datos['fecha_final'] = $_POST['end_date'];
    $datos['hora_inicio'] = $_POST['start_hour'];
    $datos['hora_final'] = $_POST['end_hour'];

    $resultado = $con->consultar(['usuarios'],['id'],'WHERE email="'.$_SESSION['username'].'"');
    $fila = $resultado->fetch_assoc();
    $resultado2 = $con->consultar(['eventos'],['id','titulo','fecha_inicio','fecha_final','hora_inicio','hora_final','todo_dia'],'WHERE fk_usuarios="'.$fila['id'].'"');

    while($fila = $resultado2->fetch_assoc()){

      if($con->updateData('eventos',$datos,$_POST['id'])){
        $response['msg'] = 'OK';
      }else{
        $response['msg'] = 'NO';
      }

    }

  }

}else{
$response['msg'] = 'No se ha iniciado una sesion';
}

echo json_encode($response);
?>
