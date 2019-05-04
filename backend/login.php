<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
require 'rb-mysql.php';

R::setup('mysql:host=localhost;dbname=runnerhigh',
    'root', '');
$username = $_POST['username'];
$password = $_POST['password'];

$user = R::findOne('users', 'login = ?', array($_POST['login']));

if ( $user )
{
   if ( password_verify($_POST['password'], $user->password))
   {
    //   echo 'success';
       echo $user;
       // echo $user;
   }
   else {
       echo 'invalidpassword';
   }
}
else
    {
        echo 'usernotfound';
    }