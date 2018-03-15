<?php

require('lib.php');
session_start();

$con = new ConectorDB('localhost','YaviewLomeli','soyunhijodeDios');
if($con->initConexion('agenda_db') == 'OK'){


  if(isset($_SESSION['id'])){

    $datos['fk_usuarios'] = $_SESSION['id'];
    $datos['id'] = 'null';
    $datos['titulo'] = $_POST['titulo'];
    $datos['fecha_final'] = $_POST['end_date'];
    $datos['fecha_inicio'] = $_POST['start_date'];
    $datos['hora_final'] = $_POST['end_hour'];
    $datos['hora_inicio'] = $_POST['start_hour'];

    if($_POST['allDay'] == ''){
      $datos['todo_dia'] = 'Todo el Dia';
    }
    if($_POST['allDay'] != ''){
      $datos['todo_dia'] = 'No todo el dia';
    }

    if($con->inserData('eventos', $datos)){
      $res['msg'] = 'OK';
    }else $res['msg'] = "Error al ingresar el evento.";

  }else $res['msg'] = 'No se ha iniciado session';

  $con->closeConexion();

}else $res['msg'] = 'No se pudo Conectar';

echo json_encode($res);

 ?>
