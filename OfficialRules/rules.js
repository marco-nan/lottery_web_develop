$('#rule_'+getUrlParam('gameCode')).addClass('curr');
changeGame(getUrlParam('gameCode'));
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r != null) return unescape(r[2]); return null; //返回参数值
}
function changeGame(element) {
	$('.gz_con').hide();
	$('#' + element).show();
	 $('#'+element).addClass('curr');
	$(function() {
		$("#rules li").click(function() {
			$(this).siblings('li').removeClass('curr'); // 删除其他兄弟元素的样式
			$(this).addClass('curr'); // 添加当前元素的样式
		});
	});
}
