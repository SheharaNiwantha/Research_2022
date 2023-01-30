<?php

class db
{

//  private $host="localhost";
//  private $db_name="ayolanla_land_loan";
//  private $username="ayolanla_root";
//  private $password="963580398Vj*";

  private $host="127.0.0.1";
  private $db_name="Bin";
  private $username="root";
  private $password="Optimize@4321";

  private  $connection;

  public  function getConnection(){
    $this->connection=null;
    try {

      $this->connection=new PDO("mysql:host=".$this->host.";dbname=".$this->db_name,$this->username,$this->password);
      $this->connection->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      $this->connection->setAttribute(PDO::ATTR_EMULATE_PREPARES,false);
      $this->connection->exec("set names UTF8");

    } catch (PDOException $exception){
      echo "Contact Admin !".$exception->getMessage();
    }
    return $this->connection;
  }

  public function IUD($sql){
    if ($this->connection==null){
      $this->getConnection();
    }
    $stamnet =$this->connection->prepare($sql);
    $stamnet->execute();
  }

  public function  Search($sql){
    if ($this->connection==null){
      $this->getConnection();
    }
    $stamnet = $this->connection->prepare($sql);
    $stamnet->execute();
    return $stamnet;
  }
}
