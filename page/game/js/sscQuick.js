
var sscQuickManager = { // 时时彩快捷
	event : function(){ // 页面事件
		$(".betarea2 .li0").mouseover(function () { // 快捷键
		    $(this).find("table").show();
		});
		$(".betarea2 .li0").mouseout(function () {// 快捷键
		    $(".betarea2 .li0 table").hide();
		});
		$(".betarea2 .ball_list li:not(.li0)").unbind('click').bind("click", function () {
		    $(this).toggleClass("danger"); // 快捷键
		});
	},
	quicklycheck : function (no, obj) { // 快捷事件
		var objectUl = $(obj).parent().parent().parent().parent().parent().parent();
	    objectUl.find("li").removeClass("danger");
	    switch (no) {
	        case 1:
	            objectUl.find("li").addClass("danger");
	            break;
	        case 2:
	            objectUl.find("li").each(function () {
	                var tempIndex = $(this).find("span").html();
	                if (tempIndex % 2) {
	                    $(this).addClass("danger");
	                }
	            });
	            break;
	        case 3:
	            objectUl.find("li").each(function () {
	                var tempIndex = $(this).find("span").html();
	                if (tempIndex % 2 != 1) {
	                    $(this).addClass("danger");
	                }
	            });
	            break;
	        case 4:
	            for (i = 0; i < 7; i++) {
	                var tempIndex = i * 3 + 2;
	                $(objectUl.find("li")[tempIndex]).addClass("danger")
	            }
	            break;
	        case 5:
	            for (i = 0; i < 8; i++) {
	                var tempIndex = i * 3;
	                $(objectUl.find("li")[tempIndex]).addClass("danger")
	            }
	            break;
	        case 6:
	            for (i = 0; i < 6; i++) {
	                var tempIndex = i * 3 + 1;
	                $(objectUl.find("li")[tempIndex]).addClass("danger")
	            }
	            break;
	        case 7:
	        	//最后一个li为筛选 
	        	var sumNum=(objectUl.find("li").length-1)/2;
	            objectUl.find("li").each(function () {
	            	//大
	                if ($(this).index() > sumNum-1) {
	                    $(this).addClass("danger");
	                }
	            });
	            break;
	        case 8:
	        	//最后一个li为筛选 
	        	var sumNum=(objectUl.find("li").length-1)/2;
	            objectUl.find("li").each(function () {
	                if ($(this).index() < sumNum) {
	                    $(this).addClass("danger");
	                }
	            });
	            break;
	        case 9:
	            objectUl.find("li").removeClass("danger");
	            break;
	    }
	    objectUl.find(".li0").removeClass("danger");
	}
}
$(function(){
	sscQuickManager.event();
});