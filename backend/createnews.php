<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
require 'rb-mysql.php';


R::setup('mysql:host=localhost;dbname=runnerhigh',
    'root', '');


$news = R::dispense('news');
$news->newsheader = $_POST['newsheader'];
$news->newsmain = $_POST['newsmain'];
$news->language = $_POST['newslanguage'];
$news->newurl = $_POST['newsurl'];
$news->picture = $_POST['newspictureurl'];
$news->time = time();

    R::store($news);
