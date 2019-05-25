<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
require 'rb-mysql.php';


R::setup('mysql:host=localhost;dbname=runnerhigh',
    'root', '');
$progress = R::dispense('progresses');
$progress->login = $_POST['login'];
$progress->data = $_POST['data'];
$progress->datetime = time();

R::store($progress);
echo 'success';