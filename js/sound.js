$(function(){
		$('[href="#sound"]').click(function(event) {
			$("#sound section").load('./sound.html',null,function() {
				$("#sound").trigger('create');
			});
			console.log("音标加载完毕")
		});
	$('#sound-content').on('click','button', function(event) {
	$(this).siblings('audio')[0].play();
	});
})
