(function ($) {
    'use strict';
    
    var float_list = [], float_side = 5, left_top = 180, right_top = 180;
    
    //关闭右侧浮动效果
	var FloatClose = function (t) {
		$(t).parents('.TplFloatSet').hide();
	}

    /**
     * 回到顶部按钮初始化
     */
    var initFloatTop = function () {
    	if ('undefined' != typeof($)) {
    	    $(function() {
    	        var btnNum = $('#ele-float-top').children().length,
    	            wrap = $('#ele-float-top-wrap'),
    	            wrapHeight = (btnNum - 1) * (40 + 2),
    	            gotop = $('#ele-float-top-up'),
    	            speedSet = 300,
    	            thebox = $('.ele-float-box-wrap'),
    	            boxwrap = '';

    	        wrap.height(wrapHeight);
    	        if(wrap.height() == wrapHeight){
    	            $('#ele-float-top').show();
    	        }

    	        $('.ele-float-top-code').hover(function(){
    	            $(this).children(thebox).stop(true, true).fadeIn(speedSet);
    	        },function(){
    	            $(this).children(thebox).stop(true, true).fadeOut(speedSet);
    	        });

    	        $("#ele-float-top-up").click(function(){
    	            $('html,body').animate( {scrollTop:0}, 1000, 'easeOutExpo' );
    	        });
    	        $(window).scroll(function() {
    	            if(navigator.userAgent.indexOf("MSIE") != -1) {
    	                var fadeSec = 200;
    	            }else{
    	                var fadeSec = 300;
    	            }
    	            if ( $(this).scrollTop() > 300){
    	                $('#ele-float-top-up').fadeIn(fadeSec);
    	            } else {
    	                $('#ele-float-top-up').stop().fadeOut(fadeSec);
    	            }

    	        });
    	    });
    	}
    };

    // 右侧浮动层
    var initFloatRight = function() {
    	float_list['1'] = $('#TplFloatPic_1');
    	
    	for (var i in float_list) {
           var self = float_list[i],
           picfloat = (self.attr('picfloat') == 'right') ? 1 : 0;
           self.show().jqFloat({'floatRight' : picfloat, 'topSide' : ((picfloat == 1) ? right_top : left_top), side: float_side});
           var w = 0;
           $.each(self.find('img'), function(){
                var width = $(this).width();
                w = (width > w) ? width : w; //取图片最大宽度
                $(this).attr({
                    'width' : width,
                    'height': $(this).height()
                });
            });
            self.css('width', w);
            if (picfloat) {
                right_top = right_top + 10 + (self.height() || 250);
            } else {
                left_top = left_top + 10 + (self.height() || 250);
            }

            $('a', self).each(function(){
                $(this).css({'width' : $(this).find('img:first').width(),'height' : $(this).find('img:first').height()});
                $(this).hover(function() {
                    $(this).find('img:first').hide();
                    $(this).find('img:last').show();
                }, function() {
                    $(this).find('img:last').hide();
                    $(this).find('img:first').show();
                });
            });
        }
    };
    
    var initMenu = function() {
    	var time = null;
    	var list = $("#menulist");
    	var box = $("#menubox");
    	var listerji = list.find(".erji");	
    	for(var i=0,j=listerji.length;i<j;i++){
    		if(listerji[i].className == "now"){
    			var olda = i;
    		}
    	}	
    	var box_show = function(hei){
    		box.stop().animate({
    			height:hei,
    			opacity:1
    		},400);
    	};
    	var box_hide = function(){
    		box.stop().animate({
    			height:0,
    			opacity:0
    		},400);
    	};
    	listerji.hover(function(){
    		listerji.removeClass("now");
    		$(this).addClass("now");
    		clearTimeout(time);
    		var index = list.find(".erji").index($(this));
    		box.find(".cont").hide().eq(index).show();
    		var _height = box.find(".cont").eq(index).height();
    		box_show(_height)
    	},function(){
    		time = setTimeout(function(){	
    			box.find(".cont").hide();
    			box_hide();
    		},50);
    		listerji.removeClass("now");
    		listerji.eq(olda).addClass("now");
    	});
    	
    	box.find(".cont").hover(function(){
    		var _index = box.find(".cont").index($(this));
    		listerji.removeClass("now");
    		listerji.eq(_index).addClass("now");
    		clearTimeout(time);
    		$(this).show();
    		var _height = $(this).height();
    		box_show(_height);
    	},function(){
    		time = setTimeout(function(){		
    			$(this).hide();
    			box_hide();
    		},50);
    		listerji.removeClass("now");
    		listerji.eq(olda).addClass("now");
    	});
    };
    
    initFloatRight();
    initFloatTop();
    initMenu();
})(jQuery);