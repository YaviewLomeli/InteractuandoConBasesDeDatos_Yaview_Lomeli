<?php

class ConectorDB
{
  private $user;
  private $password;
  private $host;
  private $conexion;

  function __construct($host,$user,$password){
    $this->host = $host;
    $this->password = $password;
    $this->user = $user;
  }

  function initConexion($dataBase){
    $this->conexion = new mysqli($this->host,$this->user,$this->password, $dataBase);
    if($this->conexion->connect_error){
      return 'Error: '.$this->conexion->connect_error;
    }else{
      return 'OK';
    }
  }

  function execQuery($query){
    return $this->conexion->query($query);
  }

  function inserData($tabla, $data){
    $sql = 'INSERT INTO '.$tabla.' (';
    $i = 1;
    $da_k = array_keys($data);
    $lastKey = end($da_k);
    foreach($data as $key => $val){
      $sql .= $key;
      if($lastKey != $key){
        $sql .= ', ';
      }else $sql .= ') VALUES (';
    }

    $da_k = array_keys($data);
    $lastKey = end($da_k);
    foreach($data as $key => $val){
      $sql .= "'".$val."'";
      if($lastKey != $key){
        $sql .= ', ';
      }else $sql .= ');';
    }

    return $this->execQuery($sql);
  }

  function consultar($tablas, $campos, $condicion = ''){
    $sql = 'SELECT ';
    $campos_key = array_keys($campos);
    $ultKey = end($campos_key);
    foreach ($campos as $key => $value) {
      $sql .= $value;
      if($ultKey != $key){
        $sql .= ', ';
      }else $sql .= ' ';
    }
    $sql .= 'FROM ';
    $table_key = array_keys($tablas);
    $ultmKey = end($table_key);
    foreach ($tablas as $key => $value) {
      $sql .= $value;
      if($ultmKey != $key){
        $sql .= ', ';
      }else $sql .= ' ';
    }
    if($condicion == ''){
      $sql .= ';';
    }else $sql .= $condicion.';';
    return $this->execQuery($sql);
  }

  function verifySession(){
    session_start();
    if(isset($_SESSION['id'])){
      return 'OK';
    }return 'DENIEND';
  }

  function verifyPassword($inputPasword,$DBpassword){
    $passDB = $DBpassword;
    $passInput = $inputPasword;

    $passConv = md5($passInput);

    if(password_verify($passConv,$passDB)){
      return "OK";
    }else return "No coincide";

  }

  function eliminarRegistro($tabla,$id){
    $sql = 'DELETE FROM '.$tabla;
    $sql .= ' WHERE '.$tabla.'.id="'.$id.'";';
    return $this->execQuery($sql);
  }

  function updateData($tabla,$data,$id){
    $sql = 'UPDATE '.$tabla;
    $sql .= ' SET ';
    $key_data = array_keys($data);
    $ultKey = end($key_data);
    foreach ($data as $key => $value) {
      $sql .= $key.'='.'"'.$value.'"';
      if($ultKey != $key){
        $sql .= ', ';
      }else $sql .= ' ';
    }
    $sql .= ' WHERE id="'.$id.'";';
    return $this->execQuery($sql);
  }

  function closeConexion(){
    $this->conexion->close();
  }
}


?>
