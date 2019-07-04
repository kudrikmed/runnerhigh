<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
require 'rb-mysql.php';


R::setup('mysql:host=localhost;dbname=runnerhigh',
    'root', '');
$training = R::dispense('trainings');
$training->login = $_POST['login'];
$training->data = $_POST['data'];
$training->program = $_POST['program'];
$training->datetime = time();

R::store($training);
echo 'success';