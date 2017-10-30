<?php 

//获取文件夹中所有文件名称
$dir = "./lesson/";
$files = scandir($dir);

// echo '<pre>';
// print_r($files);//调试打印
// echo '<pre>';

foreach ($files as $key => $value) {
	//正则检测文件类型
	if (preg_match('/\.lrc/i', $value)){	
		//$dir.$value为文件url,打开文件通道
		$path = fopen($dir.$value,'r');
		// 打开文件,读取其内容
		$lrc = fread($path,filesize($dir.$value));
		//提取标题:  正则检测[ti:]和其后的字符串存入$temp_title
		$reg = '/(?:\[ti\:)(.*)(?:\])/i';
		if (preg_match($reg ,$lrc, $temp_title)) {
			// 去掉[ti:],将[ti:]内的字符串存为标题title
			// 文件名称
			$filename = $value;
			$title = $temp_title[1];
			// 生成超链接
			$title_link = '<li><a filename="'.$filename.'" onclick="toLessonText(this);" href="#lesson-page" >'.$title.'</a></li>';
			echo $title_link;
		} 
		fclose($path);
	}

}


 ?>