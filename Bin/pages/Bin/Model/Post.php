<?php

require_once '../db.php';
$database=new db();

if ($_POST['id']=="save_driver"){
  $full_name=$_POST['full_name'];
  $con=$_POST['con'];
  $nic=$_POST['nic'];
  $Username=$_POST['Username'];
  $password=$_POST['password'];


//  iddriver, full_name, nic, contact, username, password
  $database->IUD("insert into driver (full_name, nic, contact, username, password) values('$full_name','$nic','$con','$Username','$password')");

}


if ($_POST['id']=="change_password"){
  $password=$_POST['password'];
  $c_id=$_POST['c_id'];
  $database->IUD("update driver set password='$password' where iddriver='$c_id'");
}

if($_POST['id']=="delete_driver"){
  $driver_id=$_POST['driver_id'];
  $database->IUD("delete from driver where iddriver='$driver_id'");
}

if ($_POST['id']=="save_bin"){
  $bin_name=$_POST['bin_name'];
  $location=$_POST['location'];
  $bin_type=$_POST['bin_type'];
  $max_load=$_POST['max_load'];
  $address=$_POST['address'];

//  binID, binName, binLocation, binStatus, binType, maxLoad, currentLoad, binAddress
  $database->IUD("insert into bin_details (binName, binLocation, binStatus, binType, maxLoad, currentLoad, binAddress) values('$bin_name','$location','-','$bin_type','$max_load','-','$address')");

}
if($_POST['id']=="delete_bin"){
  $bin_id=$_POST['bin_id'];
  $database->IUD("delete from bin_details where binID='$bin_id'");
}



