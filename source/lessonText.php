<?php 
header("Content-Type:text/html;charset=UTF-8");  

$name = $_GET['filename'];
$filename = urldecode($name);
//文件路径
$lrc_url = './lesson/'.$filename;
// $lrc_url = './lesson/'.$name;


// $lrc_url = './lesson/123.lrc';//调试,模拟文件不存在

if (is_readable($lrc_url)==false ) {
	die('文章不存在或无法读取!');
} else {
	//打开文件
	$Lesson = fopen($lrc_url,'r');
	//读取文件内容赋给$lrc
	$lrc = fread($Lesson,filesize($lrc_url));
	//关闭文件
	fclose($Lesson);
	//输出文件内容
	echo $lrc;
}



 ?>