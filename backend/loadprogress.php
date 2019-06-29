<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
require 'rb-mysql.php';
R::setup('mysql:host=localhost;dbname=runnerhigh',
    'root', '');

$data = R::findOne('progresses', ' login = ? ORDER BY `datetime` DESC', array($_POST['login']));
echo $data['data'];