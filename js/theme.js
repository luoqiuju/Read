$(function(){
		
	/*
	 *页面加载时的主题
	 */
	function startTheme() {
		var staTheme = localStorage.getItem("localTheme");
		if (staTheme) {
		setTheme(staTheme);
		console.log("加载主题" + staTheme );
		} else {
			setTheme("a");
		}
	}

	/*
	 * 设置主题的函数
	 */
	function setTheme(theme) {

		$( '[ data-role="page"]' )
		.removeClass( "ui-page-theme-a ui-page-theme-b" )
		.addClass( "ui-page-theme-" + theme);
		if (theme == "a") {
			$('#b').removeAttr("checked");
			$('#a').attr("checked","checked");
			$(".ui-grid-c").css("background","#fff");		
		} else {
			$('#a').removeAttr("checked");
			$('#b').attr("checked","checked");
			$(".ui-grid-c").css("background","#333");
		}	

		// 检查浏览器是否支持
		if (typeof(Storage) !== "undefined") {
		    // Store
		    localStorage.setItem("localTheme", theme);
		    // Retrieve
		    // console.log(localStorage.getItem("localTheme"));
		} else {
		    console.log("抱歉！您的浏览器不支持 Web Storage ...");
		}
	}


	//加载时的主题
	startTheme();
	//更改主题时
	$( "#theme-selector input" ).on( "change", function( event ) {
		// 
		var theme = $( "#theme-selector input:checked" ).attr( "id" );
		// console.log("更改主题" + theme);
		setTheme(theme);
	});


	/***********主题重置************/
	$('#setting-clear').click(function(){
	    // 
	    setTheme("a");
	    //刷新页面
		// history.go(0);
		location.reload();
	    // console.log("重置成功");
	    alert("已重置");
	    
	});
	$("body").load();

});


