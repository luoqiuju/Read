	//图片数据
	var picData = [
	{'src':'1.jpg','picTitle':'没有开始','picDetail':'没有开始谈何输赢'},
	{'src':'2.jpg','picTitle':'命中注定','picDetail':'一切命中注定的事都终会来临'},
	{'src':'3.jpg','picTitle':'Abstention','picDetail':'n.弃权;放弃者;'},
	{'src':'4.jpg','picTitle':'Abatain','picDetail':'v.戒断(烟/酒等),戒掉'},
	{'src':'5.jpg','picTitle':'Cardinal','picDetail':'n. 红衣风头鸟'},
	{'src':'6.jpg','picTitle':'This is a title.','picDetail':'详细描述哈哈哈哈哈哈'},
	{'src':'7.jpg','picTitle':'This is a title.','picDetail':'详细描述哈哈哈哈哈哈'},
	{'src':'8.jpg','picTitle':'This is a title.','picDetail':'详细描述哈哈哈哈哈哈'},
	{'src':'9.jpg','picTitle':'This is a title.','picDetail':'详细描述哈哈哈哈哈哈'},
	{'src':'10.jpg','picTitle':'This is a title.','picDetail':'详细描述哈哈哈哈哈哈'}
	]


function loadPicList() {
	// console.log('图片在加载');

	for (i in picData) {

		$('#pictures-content').append('<li class="picbox"></li>');
		var $picbox = $('.picbox')[i];
		$($picbox).append('<a href="#bigpic" onclick="bigPic(this);"></a>');



		var $link = $($picbox).children('a');
		//给链接内添加图片
		var $img = document.createElement('img');
		$img.src = 'source/images/' + picData[i].src;
		$img.style.width = '100%';				
		// console.log($img);
		$($link).append($img);

		//给链接内添加标题
		var $title = document.createElement('h3');
		$($title).text(picData[i].picTitle);
		$($title).addClass('pic-title');		
		// console.log($title);
		$($link).append($title);

		//给链接内添加描述
		var $detail = document.createElement('p');
		$($detail).text(picData[i].picDetail);
		$($detail).addClass('pic-detail');		
		// console.log($detail);
		$($link).append($detail);

	}

};
/*
 * 查看大图
 * @param  picLink [obj] 传入被点击的图<a>
 * 提取<a>内的元素属性,改变#bigpic-content中元素属性
 * 图片/标题/描述
 */
function bigPic(picLink) {
	// console.log($(picLink).children('*'));
	var $picPath = $(picLink).children('img').attr('src');
	var $picTitle =  $(picLink).children('h3').text();
	var $picDetail =  $(picLink).children('p').text();
	// console.log($picPath);
	// console.log($picTitle);
	// console.log($picDetail);
	$('#bigpic-content').children('img').attr('src',$picPath);
	$('#bigpic-content').children('h3').text($picTitle);
	$('#bigpic-content').children('p').text($picDetail);
};



var picNotLoaded = true;//定义一个全局变量,图片页面是否加载

$(function(){
	$('[href="#pictures"]').click(function(event) {
		if (picNotLoaded) {
			loadPicList();
			// console.log('图片第一次加载成功');
			picNotLoaded = false;//以后不需要重新加载了
		} else {
			// console.log('图片不需要重新加载');
		}
	});
	
});