<?php

require_once '../db.php';
$database=new db();

if($_SERVER["REQUEST_METHOD"] == "POST"){
  $username = $_POST['email'];
  $pass = $_POST['password'];

  //echo $username;

  $result = $database->Search("SELECT * FROM Bin.driver where username='$username' and password='$pass';");
  $list = array();
  $response["status"] = true;

  if ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $full_name=$row['full_name'];
    $iddriver=$row['iddriver'];
    $list[] = array('full_name' => $full_name,'iddriver' => $iddriver);
    $response["code"] = 200;
    $response["data"] = $list;
    $response["message"] = "Successfully auth as driver";
  }else{
    $response["code"] = 205;
    $response["data"] = [];
    $response["message"] = "Unable to find your account, please check your email and password";
  }
  echo json_encode($response);


}else{
  $response["status"] = false;
  $response["message"] = "Unsupported function, cannot get auth";
  $response["code"] = 408;
  $response["data"] = [];

  echo json_encode($response);
}
