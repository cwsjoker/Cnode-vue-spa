(function() {
	window.onresize = infinite;
	var html = document.documentElement;
	function infinite() {
		var htmlWidth = html.clientWidth;
		if (htmlWidth <= 320) {
			html.style.fontSize = 12 + 'px';
		} else if(htmlWidth >= 720) {
			html.style.fontSize = 28.8 + 'px';
		} else {
			html.style.fontSize = 28.8 / 720 * htmlWidth + "px";
		}
	}
	infinite();
})();

