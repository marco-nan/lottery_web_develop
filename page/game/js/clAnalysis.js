var clAnalysis = function(){
	var load = function(){
		var gameId = $("#gameId").val();
		$.ajax({
			url:'/v/lottery/todayCl?gameId=' + gameId,
			type:'get',
			dataType:'json',
			success:function(data){
				render(data);
				initListener();
			}
		});
	}, render = function(data){
		$('tr[nanlysis=trend]').each(function(){
			var dataCode = $(this).attr('data-code');
			var trendData = data[dataCode] || [];
			var tds = "";
			for (var i = 0; i < 30; i++) {
				var dataIndex = i - 30 + trendData.length;
				if (dataIndex >= 0) {
					var v = '';
					if(trendData[dataIndex]){
						v = trendData[dataIndex].replace(/,/g, '<br/>');
					}
					tds += "<td>" + v + "</td>"
				} else {
					tds += "<td>&nbsp;</td>"
				}
			}
			$(this).html(tds);
		});
		$('tr[nanlysis=repeatNum]').each(function(){
			var dataCode = $(this).attr('data-code');
			var ballIndex = parseInt($(this).attr('ball-index'));
			var nums
			if (data[dataCode]) {
				var repeatData = data[dataCode][ballIndex - 1];
				nums = repeatData.split(',');
			} else {
				nums = [0,0,0,0,0,0,0,0,0,0]
			}
			var tds = "";
			for (var i = 0; i < 10; i++) {
				tds += "<td>" + nums[i] + "</td>"
			}
			$(this).html(tds);
		});
	}, initListener = function(){
		$('.tab-item').on('mouseenter', function(){
			var dataCode = $(this).attr('data-code');
			var ballIndex = parseInt($(this).attr('ball-index'));
			var table = $(this).parents('table');
			var type = table.attr('id');
			if (type == 'repeatTable') {
				$('#trendTable .tab-item[data-code-template]:first').html("第" + numToChinses(ballIndex) + "球")
				$('#trendTable .tab-item[data-code-template]').each(function(){
					var dataCodeTemplate = $(this).attr('data-code-template');
					$(this).attr('data-code', dataCodeTemplate.replace('X', ballIndex + 1));
				}); 
				// 联动切换
				var scDataCode = $('#trendTable .tab-item.active').attr('data-code');
				$('#trendTable tr[nanlysis=trend]').hide();
				$('#trendTable tr[data-code=' + scDataCode + ']').show();
				
				table.find('tr[nanlysis=repeatNum]').hide();
				table.find('tr[nanlysis=repeatNum][ball-index=' + ballIndex + ']').show();
			} else {
				table.find('tr[nanlysis=trend]').hide();
				table.find('tr[data-code=' + dataCode +']').show();
			}
			
			table.find('.tab-item').removeClass('active');
			$(this).addClass('active');
		});
	}, numToChinses = function(num){
        if (num == '1') {
            return "一";
        } else if (num == '2') {
            return "二";
        } else if (num == '3') {
            return "三";
        } else if (num == '4') {
            return "四";
        } else if (num == '5') {
            return "五";
        } else {
            return "undefine";
        }
    };
	return {
		load:load,
	}
}();

