<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
require 'rb-mysql.php';


R::setup('mysql:host=localhost;dbname=runnerhigh',
    'root', '');

$errors = array();

$user = R::dispense('users');
$user->firstname = $_POST['firstname'];
$user->secondname = $_POST['secondname'];
$user->gender = $_POST['gender'];
$user->birthday = $_POST['birthday'];
$user->bodymass = $_POST['bodymass'];
$user->height = $_POST['height'];
$user->email = $_POST['email'];
$user->login = $_POST['login'];
$user->password = password_hash($_POST['password'], PASSWORD_DEFAULT);

if (R::count('users', 'login = ?', array($_POST['login'])))
{
    $errors[] = 'samelogin';
    echo 'samelogin';
}
if (R::count('users', 'email = ?', array($_POST['email'])))
{
    $errors[] = 'sameemail';
    echo 'sameemail';
}
if (empty($errors)) {
    R::store($user);
    echo 'success';
}