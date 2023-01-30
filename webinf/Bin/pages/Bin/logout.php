<?php

    session_start();
    $user=$_SESSION['id'];



    unset($_SESSION['id']);
    unset($_SESSION['username']);
    unset($_SESSION['password']);

    session_destroy();
    header('location:../../index.php');
