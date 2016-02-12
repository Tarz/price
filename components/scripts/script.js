$(function() {

	// At least Safari 3+: "[object HTMLElementConstructor]"
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
	var colsH, midColH, startGradient = 201, endGradient;
	var mediumMaxWidth = 1073;
	
	function setVars() {
		
		colsH = $('#columns').height();
		midColH = colsH + 90;
		
		if(isSafari) { startGradient = 199; }
		
		endGradient = colsH +10;
	}

	function renderBackground() {

		if( window.innerWidth >=  mediumMaxWidth) {
			// IE9
			$('#columns').css({"filter": "progid:DXImageTransform.Microsoft.gradient( startColorstr='#17b0e7', endColorstr='#003e66',GradientType=0 )" });
			
			$('#columns').css({ 'background': '-webkit-linear-gradient( top, rgba(0,0,0,0) ' + startGradient +'px, #17b0e7 ' + startGradient + 'px, #17b0e7 ' +  endGradient + 'px, rgba(0,0,0,0) ' +  endGradient + 'px)'});
			$('#columns').css({ 'background': '-moz-linear-gradient( top, rgba(0,0,0,0) ' + startGradient + 'px, #17b0e7 ' + startGradient + 'px, #17b0e7 ' +  endGradient + 'px, rgba(0,0,0,0) ' +  endGradient + 'px)'});
			$('#columns').css({ 'background': '-ms-linear-gradient( top, rgba(0,0,0,0) ' + startGradient + 'px, #17b0e7 ' + startGradient + 'px, #17b0e7 ' +  endGradient + 'px, rgba(0,0,0,0) ' +  endGradient + 'px)'});
			$('#columns').css({ 'background': '-o-linear-gradient( top, rgba(0,0,0,0) '  + startGradient + 'px, #17b0e7 ' + startGradient + 'px, #17b0e7 ' +  endGradient + 'px, rgba(0,0,0,0) ' +  endGradient + 'px)'});
			$('#columns').css({ 'background': 'linear-gradient( to bottom, rgba(0,0,0,0) ' + startGradient + 'px, #17b0e7 ' + startGradient + 'px, #17b0e7 ' + endGradient + 'px, rgba(0,0,0,0) ' +  endGradient + 'px)'});

		} else {
			
			$('#columns').css({ 'background': 'none' });
			$('#columns').css({ 'filter': 'none' });
		}
	} // renderBackground

	function renderButtons() {
		if( window.innerWidth >=  mediumMaxWidth) {


			$('.btns-1').css('top',  colsH );
			$('.btns-2').css('top',  colsH );
			$('.btns-3').css('top',  colsH );

			$('.col-2').height(midColH);
		
		}else {
			$('.btns-1').css('top',  0 );
			$('.btns-2').css('top',  0 );
			$('.btns-3').css('top',  0 );
			
			$('.col-2').height('auto');
		}
	} // renderButtons


	$(window).resize(function() {
		
		if( window.innerWidth >=  mediumMaxWidth) {
			if( !colsH ) {
				setVars();
			}
		}
		renderButtons();
		renderBackground();
	});
	
	if( window.innerWidth >=  mediumMaxWidth) {
		setVars();
	}

	renderButtons();
	renderBackground();

	$('.btns').css({display: "block"});
});