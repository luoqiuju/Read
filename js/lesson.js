
function loadList() {
	var lis = $("#lesson section ul").find("li").length;
	// console.log(lis);
	//Ajax请求课程列表数据
	if ( lis == 0) {
		$("#lesson-content").load("./source/lessonList.php",null,function (){
			// console.log("列表加载");
			$('#lesson-content').listview("refresh");
			// $("#lesson").trigger('create');	
		});
	} else {
		// 停止播放音频
		$("#audio").get(0).currentTime = 0;
		audioPause();
		//console.log('There is no need to reload');
	}
}


/*
 * 查看课程文章
 * 传入: lessonLink [obj] 传入被点击的
 * 提取<a>内的元素属性,改变元素属性
 */
function toLessonText(link){
	//从链接中提取文件名称
	$filename = (encodeURI($(link).attr("filename")));
	// console.log("文本==="+$filename);
	$lessonTitle = $(link).text();
	// console.log("标题==="+$lessonTitle);
	//请求相对应的音频
	$.get("./source/lessonMp3.php?filename="+$filename+"",
		function(data,status){
			var audioHtml = '<source src="'+ data +'" type="audio/mpeg">';
			// console.log(data);
			// console.log(audioHtml);
			$("#audio").html(audioHtml);
			//重新加载音频
			$("#audio").load();
			//加载文章时显示音频时长,设置音频(开始)播放位置
			$("#audio").get(0).currentTime = 0.01;

		});
	// //Ajax请求课程列表数据
	$.get("./source/lessonText.php?filename="+$filename+"",
		function(data,status){
			// console.log(data);
			var html = textToHtml(data,$lessonTitle);
			$('#lesson-page-content').html(html);
		});
}


function textToHtml(textData,title) {
	var lrcArr = textData.split("[");
	var html = "";
	var title = title;
	html += "<h3>"+title+"</h3>";
	//正则拆分中英文, 中文取第一个中文文字之后所有字符串
	var reg = /([\u4e00-\u9fa5]).*/g;
	for( i in lrcArr ) {
		var arr = lrcArr[i].split("]");
		//获取时间
		var timer = arr[0].split(".");
		//分隔分和秒
		var timeSplit = timer[0].split(":");
		//转成秒数
		var sec = timeSplit[0]*60 + timeSplit[1]/1;
		if (!isNaN(sec)) {
			//获取文本信息
			var message = arr[1];
			if (message) {
				var Chinese = message.match(reg);
				var English = message.replace(reg, "");
				if (English) {
					html += "<p class='page-text english sec"+sec+"'>"+English+"</p>";
				}
				if (Chinese) {
					html += "<p class='page-text chinese sec"+sec+"'>"+Chinese+"</p>";
				}			
			}
		}
	}
	return html;
}


//默认不播放
var playerPause= true;
//音频暂停
function audioPause(){
	$("#player-btn").removeClass('player-pause').addClass('player-play');
	$("#audio").get(0).pause();
	// console.log('暂停');
	playerPause = true;	
}
//音频播放
function audioPlay(){
	$("#player-btn").removeClass('player-play').addClass('player-pause');
	$("#audio").get(0).play();
	// console.log('播放');
	playerPause= false;	
}



// 播放的时候, 更改高亮的文字
function playing(){
	// 获取当前音频时长/当前播放进度
	var sec = parseInt( $("#audio").get(0).currentTime) || 0 ;
	var duration = parseInt($("#audio").get(0).duration) || 0;
	var progress = parseInt(sec*100/duration);
	// 播放到结束时
	if (progress==100) {
		$("#player-btn").removeClass('player-pause').addClass('player-play');
		playerPause = true;	
		progress = 0;
		sec = 0;
	}
	$("#player-span").css("width", progress+"%");
	var timeshow = formatTime(sec)+"/"+formatTime(duration);
	$("#time-show").html(timeshow);

	//检测是否含有此类
	if ($(".sec"+sec).length > 0) {
		$('.text-hover').removeClass('text-hover');
		$(".sec"+sec).addClass('text-hover');
	}
}

/*
 * 格式化时间
 * 传入秒数 sec[num]
 * 返回时间格式 00:00[字符串]
 */
function formatTime(sec) {
	var ms = parseInt(sec/60);
	var ss = parseInt(sec%60);
	ms = ms<10? "0"+ms:ms;
	ss = ss<10? "0"+ss:ss;
	return ms + ":" + ss;
}



$(function(){

	loadList();

	$('[href="#lesson"]').on("click",loadList);

	//页面加载后刷新界面样式
	$("#lesson").trigger('create');
	// 播放的时候，timeupdate,时间发生变化的时候会一直调用事件
	$("#audio").get(0).addEventListener("timeupdate",playing,false);

	///暂停与播放
	$("#player-btn").on("click",function(){
		if(playerPause==false){
			audioPause();
		}else{
			audioPlay();
		}
	});

	//点击进度条时,设置播放位置
	$("#player-progress").click(function(e){
		//判断是否含有文本,以防加载不到文字时点击陷入循环
		var lis = $("#lesson-page section").find(".page-text").length;
		// console.log(lis);
		if ( lis > 0 ) {
			var proWidth = parseInt($("#player-progress").css("width"));
			//pot应在位置的百分比
		  	var pot = ((e.offsetX)*100/proWidth);
			var dur = parseInt($("#audio").get(0).duration) || 1;
			var current = dur*pot/100;
			// 设置进度条长度
		  	$("#player-span").css("width",pot+"%"); 
		  	//将播放位置设置为
		  	$("#audio").get(0).currentTime = current;

		  	//点击进度条时设置高亮的文字
			var cur = parseInt(current);
			while ((cur < dur) && !($(".sec"+cur).length > 0)) {
				cur ++;
			}
			$('.text-hover').removeClass('text-hover');
			//点击末尾的处理
			while (!($(".sec"+cur).length > 0)) { 
				cur --;
			}
			$(".sec"+cur).addClass('text-hover');
		} else {
			console.log("no!!!");
		}

	});

	// // 句子点读
	$('#lesson-page-content').on('click','p', function(event) {
		//获取被点击的元素的类名
		var className = $(this).attr('class');
		//从类名中提取含有sec的类名
		var sec = className.match(/(sec)(\d){1,3}/ig);
		//去掉sec,获取数字,即当前播放的位置
		var current = parseInt(sec[0].replace("sec",""));
		// console.log(sec);
		// console.log(current);
	  	$("#audio").get(0).currentTime = current;
	});
});
