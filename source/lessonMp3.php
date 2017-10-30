<?php 

header("Content-Type:text/html;charset=UTF-8");  

$name = $_GET['filename'];
$filename = urldecode($name);

$file = explode('.lrc',$filename)[0];
$audio_path = $file."".'.mp3';


if (is_readable('./lesson/'.$audio_path)==false ) {
	die('音频不存在或无法读取!');
} else {
	//输出路径
	echo "./source/lesson/".$audio_path;
}


 ?>