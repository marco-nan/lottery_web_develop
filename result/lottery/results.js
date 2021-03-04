"use strict";
var search = function() {
	var params = {};
	params.gameId=$('#game_id').val();
	if(params.gameId==70 || params.gameId==10 || params.gameId==11 || params.gameId==21 ){
		$('#date').hide();
		params.openTime='';
	}else {
		$('#date').show();
		params.openTime = $('#date').val();
	}
	$('#LotteryList').html('');
	$.ajax({
		async : false,
		url : "/v/lottery/getResultsList",
		type : "get",
		data : params,
		dataType : 'json',
		success : function(data) {
			var foreach = function(){
				for(var i=0;i<data.length;i++){
					var openNum=data[i].openNum.split(",");
					bets.content[i].openNum = openNum;
				}
			}
			for(var i=0;i<data.length;i++){
				if (data[i].result) {
					data[i].result = JSON.parse(data[i].result);
				} else {
					data[i].result = {}
				}
			};
			var bets = {content : data};
			foreach();
			var html = template('temp_' + params.gameId, bets);
		   $("#LotteryList").html(html);
		}
	});
}
function init(){
	$.getJSON("/data/json/games.json",function(result){
		var fcOption = '';
		var iframeId = "layui-layer-iframe"+parent.layer.index;
		var gameId = HttpUtil.GetIframeUrlPara(iframeId)['gameId']; // 获取URL参数中的gameId
	    $.each(result, function(i, field){
	    	var isSelected = false;
	    	if((gameId && gameId == field.id) || (!gameId && i==0)){
	    		isSelected = true;
	    	}
	    	if(isSelected){
	    		fcOption += '<option selected="selected" value="'+field.id+'">'+field.name+'</option>';
	    	}else{
	    		fcOption += '<option value="'+field.id+'">'+field.name+'</option>';
	    	}
	    });
	    $("#game_id").html(fcOption);
	    search();
	  });
}
