<?php
    session_start();

    if (isset($_SESSION['username'])){
      $username=$_SESSION['username'];
    } else{
      header("location:../../../index.php");
    }
?>

<!-- Navbar -->
<nav class="main-header navbar navbar-expand navbar-white navbar-dark" style="background-color: black">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
            <a href="../components/home.php" class="nav-link"></a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
            <div class="row">
                <b><h3 id='ct6' style="color: white"></h3></b>
                <b><h3 style="color: white">-</h3></b>
                <b><h3 id='ct7' style="color: white"></h3></b>
            </div>
        </li>
    </ul>



    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">

      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-bell"></i>
          <span class="badge badge-warning navbar-badge"></span>
        </a>

        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">

          <div class="dropdown-divider"></div>
          <a href="../logout.php" class="dropdown-item dropdown-footer">Log Out</a>
        </div>
      </li>
        <li class="nav-item">
            <a class="nav-link" data-widget="fullscreen" href="#" role="button" title="Full Screen">
                <i class="fas fa-expand-arrows-alt"></i>
            </a>
        </li>
    </ul>
</nav>
<!-- /.navbar -->

<!-- Main Sidebar Container -->
<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="../components/home.php" class="brand-link">
        <img src="../../../dist/img/AdminLTELogo.png" alt="AdminLTE Logo"
            class="brand-image img-circle elevation-3" style="opacity: .8">
        <span class="brand-text font-weight-light">Dashboard</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
        <!-- Sidebar user (optional) -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
              <img src='../../../dist/img/user1-128x128.jpg' class='img-circle elevation-2' alt='User Image'>
            </div>
            <div class="info">
                <a href="#" class="d-block">
                    <?php
                        if (strlen($username) > 17) {
                           echo substr($username, 0, 17);
                        }
                        else {
                            echo $username;
                        }
                    ?>
                </a>
            </div>
        </div>

        <!-- Sidebar Menu -->
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                data-accordion="false">
              <li class="nav-item">
                <a href="../../Bin/components/Driver.php" class="nav-link">
                  <i class="nav-icon fas fa-copy"></i>
                  <p>
                    Driver Details
                  </p>
                </a>

              </li>
            </ul>
          <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
              data-accordion="false">
            <li class="nav-item">
              <a href="../../Bin/components/Bin.php" class="nav-link">
                <i class="nav-icon fas fa-user"></i>
                <p>
                  Bin Details
                </p>
              </a>
            </li>
          </ul>
          <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
              data-accordion="false">
            <li class="nav-item">
              <a href="../../Bin/Report/report.php" class="nav-link">
                <i class="nav-icon fas fa-book"></i>
                <p>
                  Reports
                </p>
              </a>
            </li>
          </ul>
        </nav>
        <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
</aside>

<!-- jQuery -->
<script src="../../../plugins/jquery/jquery.min.js"></script>
<script>
    $( document ).ready(function() {
        display_ct7();
    });


    function display_ct7() {
        var x = new Date()
        var ampm = x.getHours( ) >= 12 ? ' PM' : ' AM';
        hours = x.getHours( ) % 12;
        hours = hours ? hours : 12;
        hours=hours.toString().length==1? 0+hours.toString() : hours;

        var minutes=x.getMinutes().toString()
        minutes=minutes.length==1 ? 0+minutes : minutes;

        var seconds=x.getSeconds().toString()
        seconds=seconds.length==1 ? 0+seconds : seconds;

        var month=(x.getMonth() +1).toString();
        month=month.length==1 ? 0+month : month;

        var dt=x.getDate().toString();
        dt=dt.length==1 ? 0+dt : dt;

        var x1=month + "/" + dt + "/" + x.getFullYear();
        document.getElementById('ct6').innerHTML = x1;
        x1 = hours + ":" +  minutes + ":" +  seconds + " " + ampm;
        document.getElementById('ct7').innerHTML = x1;
        display_c7();
    }
    function display_c7(){
        var refresh=1000; // Refresh rate in milli seconds
        mytime=setTimeout('display_ct7()',refresh)
    }
    display_c7()
</script>


