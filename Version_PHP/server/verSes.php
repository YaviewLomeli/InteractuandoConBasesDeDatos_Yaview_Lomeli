<?php

require('lib.php');

$con = new ConectorDB('localhost','YaviewLomeli','soyunhijodeDios');
if($con->verifySession() == 'OK'){
  $response['msg'] = 'OK';
}else{
  $response['msg'] = 'DENIEND';
}

echo json_encode($response);

?>
