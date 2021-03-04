(function ($) {
    'use strict';
    
    var initSlideBanner = function() {
    	$(".indexbanner").slide({
			mainCell: ".bd ul",
			effect: "fold",
			autoPlay: true,
			trigger: "click",
			delayTime: 800,
			interTime: 3500
		});
        $(".lunbo").slide({
        	titCell: ".hd ul",
        	mainCell: ".bd ul",
        	autoPage: true, 
        	effect: "leftLoop", 
        	autoPlay: true,
        	vis: 5,
        	trigger: "click"
        });
    };
    
    initSlideBanner();

})(jQuery);