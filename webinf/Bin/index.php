<?php
include_once 'pages/Bin/db.php';

  $database=new db();


  session_start();

  $username_pass_alert="";

  if (isset($_POST['login'])){
    if ($_POST['username']==''){
      $username_pass_alert="<div class='alert'>
                            <span class='closebtn' onclick=\"this.parentElement.style.display='none';\">&times;</span>
                            <strong>Warning !</strong> Please enter Username !
                          </div>";
    }

    else if ($_POST['password']==''){
      $username_pass_alert="<div class='alert'>
                            <span class='closebtn' onclick=\"this.parentElement.style.display='none';\">&times;</span>
                            <strong>Warning !</strong> Please enter Password !
                          </div>";
    }

    else{
      $username=$_POST['username'];
      $pass=$_POST['password'];


      $rs=$database->Search("select * from user where username='$username' and password='$pass'");

      if ($row = $rs->fetch(PDO::FETCH_ASSOC)){
        if(!empty($_POST["remember"])) {
          setcookie ("username",$_POST["username"],time()+ 3600);
          setcookie ("password",$_POST["password"],time()+ 3600);
        }

        $id = $row['iduser'];
        $username = $row['username'];
        $password = $row['password'];

        $_SESSION['id'] = $id;
        $_SESSION['username'] = $username;
        $_SESSION['password'] = $password;

        header("location:pages/Bin/components/home.php");
      }else{
          $username_pass_alert="<div class='alert'>
                                <span class='closebtn' onclick=\"this.parentElement.style.display='none';\">&times;</span>
                                <center><strong>Warning !</strong></center>
                                 <center>Username or password incorrect !</center>
                              </div>";
      }
    }
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Garbage Bin | Log in</title>
  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="plugins/fontawesome-free/css/all.min.css">
  <!-- icheck bootstrap -->
  <link rel="stylesheet" href="plugins/icheck-bootstrap/icheck-bootstrap.min.css">
    <link rel="shortcut icon" type="image/jpg" href="dist/img/logo.jpeg"/>
  <!-- Theme style -->
  <link rel="stylesheet" href="dist/css/adminlte.min.css">
  <style>
    .alert {
      padding: 20px;
      background-color: #f44336;
      color: white;
    }

    .closebtn {
      margin-left: 15px;
      color: white;
      font-weight: bold;
      float: right;
      font-size: 22px;
      line-height: 20px;
      cursor: pointer;
      transition: 0.3s;
    }

    .closebtn:hover {
      color: black;
    }
  </style>
</head>
<body class="hold-transition login-page">
<div class="login-box">
  <!-- /.login-logo -->
  <div class="card card-outline card-info">
    <div class="card-header text-center">
      <a href="#" class="h1"><b>Garbage Bin</b></a>
    </div>
    <div class="card-body">
      <p class="login-box-msg">Sign in from Here</p>
      <?php
      echo $username_pass_alert;
      ?>

      <form action="index.php" method="post">
        <div class="input-group mb-3">
          <input type="text" class="form-control" id="username" name="username" value="<?php if(isset($_COOKIE["username"])) { echo $_COOKIE["username"]; } ?>"  placeholder="Enter Email">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-user"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" class="form-control" id="password" name="password" value="<?php if(isset($_COOKIE["password"])) { echo $_COOKIE["password"]; } ?>"  placeholder="Enter Password">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            <div class="icheck-primary">
              <input type="checkbox" id="remember" <?php if(isset($_COOKIE["username"])) { ?> checked <?php } ?> />
              <label for="remember">
                Remember Me
              </label>
            </div>
          </div>
          <!-- /.col -->
          <div class="col-4">
            <button type="submit" name="login" class="btn btn-info btn-block">Sign In</button>
          </div>
          <!-- /.col -->
        </div>
      </form>
      <p class="mb-1">
        <a href="pages/forgot_password.php">I forgot my password</a>
      </p>

    </div>
    <!-- /.card-body -->
  </div>
  <!-- /.card -->
</div>
<!-- /.login-box -->

<!-- jQuery -->
<script src="plugins/jquery/jquery.min.js"></script>
<!-- Bootstrap 4 -->
<script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- AdminLTE App -->
<script src="dist/js/adminlte.min.js"></script>
</body>
</html>
