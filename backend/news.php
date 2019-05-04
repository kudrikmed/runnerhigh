<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
require 'rb-mysql.php';

R::setup('mysql:host=localhost;dbname=runnerhigh',
    'root', '');


$news = R::find('news', ' language = ? ORDER BY `time` DESC', array($_POST['newslanguage']));
// $news = R::findOne('news','language = ?', [ 'eng' ]);
foreach ( $news as $new)
{
   // $new->header = newsheader;
   // $new->body = newsmain;
   // $new->time = time;
  //  echo $new->newsheader . '^!^' . $new->newsmain . '%$%%$%';
    echo $new . '%$%';

}
//var_dump($news);
//echo $news;
