$(document).ready(function(){
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
	}	
	var box_hide = function(){
		box.stop().animate({
			height:0,
			opacity:0
		},400);
	}	
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

})