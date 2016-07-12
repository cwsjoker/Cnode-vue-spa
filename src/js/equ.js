$(function(){
	$(window).resize(infinite);
	function infinite() {
		var htmlWidth = $('html').width();
		if (htmlWidth <= 320) {
			$("html").css({
				"font-size" : "12px"
			});
		}else if(htmlWidth >= 720) {
			$("html").css({
				"font-size" : "28.8px"
			});
		} else {
			$("html").css({
				"font-size" :  28.8 / 720 * htmlWidth + "px"
			});
		}
	}infinite();
});
