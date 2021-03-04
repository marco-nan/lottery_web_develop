(function ($) {
	var subUserId = $.getUrlParam('subUserId');
	var hisArr = $.getUrlParam('hisArr');
	var queryMap = $.getUrlParam('queryMap');
	$(function () {
	    
		//设置时间控件默认值
	    $('#dateFrom').val(getCurrDate());
	    $('#dateTo').val(getCurrDate())
	    $('#dateFromPicker').datepicker({el: 'dateFrom'});
	    $('#dateToPicker').datepicker({el: 'dateTo'});
	    
	    //查询按钮
	    $('#queryBtn').click(function () {
	    	loadUserInfo();
	    });
	    
	    //加载个人信息数据
	    loadUserInfo();
	

	  });

	  //加载个人信息
	  function loadUserInfo() {
	    $.loading();
	    loadPersonalData(function(data){
	    	//团队数据 rwReport
	    	$('#teamCount').text(data.teamCount+"人");    //团队人数
				$('#registCount').text(data.registCount+"人");  //总注册人数
        $('#rechargeCount').text(data.rechargeCount+"人");  //充值人数
        $('#firstRechargeCount').text(data.firstRechargeCount+"人");  //首充人数
				$('#withdrawUserCount').text(data.rwReport.withdrawUserCount+"人");  // 提现人数:
				$('#rechUserCount').text(data.rwReport.rechUserCount+"人");    //充值人数:
			
			//彩票 cpBetReport
	    	$('#cpBettingMoney').text(addUnit($.toFixed(data.cpBetReport.bettingMoney==null?0:data.cpBetReport.bettingMoney)));
	    	$('#cpRebateMoney').text(addUnit($.toFixed(data.cpBetReport.rebateMoney==null?0:data.cpBetReport.rebateMoney)));
	    	$('#cpWinOrcloseMoney').text(addUnit($.toFixed((-data.cpBetReport.winOrcloseMoney)==null?0:(-data.cpBetReport.winOrcloseMoney))));  //取相反数
	    	
	    	//体育 ftBetReport
	    	$('#ftBettingMoney').text(addUnit($.toFixed(data.ftBetReport.bettingMoney==null?0:data.ftBetReport.bettingMoney)));
	    	$('#ftRebateMoney').text(addUnit($.toFixed(data.ftBetReport.rebateMoney==null?0:data.ftBetReport.rebateMoney)));
	    	$('#ftWinOrcloseMoney').text(addUnit($.toFixed((-data.ftBetReport.winOrcloseMoney)==null?0:(-data.ftBetReport.winOrcloseMoney))));
	    	
	    	//真人 liveBetReport
	    	$('#liveBettingMoney').text(addUnit($.toFixed(data.liveBetReport.bettingMoney==null?0:data.liveBetReport.bettingMoney)));
	    	$('#liveRebateMoney').text(addUnit($.toFixed(data.liveBetReport.rebateMoney==null?0:data.liveBetReport.rebateMoney)));
        var liveWinOrCloseMoney = (data.liveBetReport.winOrcloseMoney == null ? 0 : -data.liveBetReport.winOrcloseMoney) + (data.liveBetReport.rebateMoney == null ? 0 : data.liveBetReport.rebateMoney)
	    	$('#liveWinOrcloseMoney').text(addUnit($.toFixed(liveWinOrCloseMoney)));
			
			
	    	$('#withdrawMoney').text(addUnit($.toFixed(data.rwReport.withdrawMoney==null?0:data.rwReport.withdrawMoney)));  //提现
	        $('#rechMoney').text(addUnit($.toFixed(data.rwReport.rechMoney==null?0:data.rwReport.rechMoney)));  //充值
	        $('#balance').text(addUnit($.toFixed(data.money==null?0:data.money)));        //余额
	        /*$('#dlRebate').text(addUnit($.toFixed(data.dlRebate==null?0:data.dlRebate)));   //代理返点*/
	        $('#discountMoney').text(addUnit($.toFixed(data.rwReport.discountMoney==null?0:data.rwReport.discountMoney)));   //优惠金额
	        $('#rechDiscount').text(addUnit($.toFixed(data.rwReport.rechDiscount==null?0:data.rwReport.rechDiscount)));   //充值优惠
	        $('#otherDiscount').text(addUnit($.toFixed(data.rwReport.otherDiscount==null?0:data.rwReport.otherDiscount)));   //其他优惠
	        
	        $('#netProfit').text(addUnit($.toFixed(
              (- data.cpBetReport.winOrcloseMoney - data.ftBetReport.winOrcloseMoney - data.liveBetReport.winOrcloseMoney)
              + data.liveBetReport.rebateMoney
              + data.dlRebate + data.dlBonuus + data.dlDayWage
              + (data.rwReport.rechDiscount + data.rwReport.otherDiscount))));// 净盈利 = 游戏输赢 + 真人返点 + 代理总计 + 优惠总额
            //代理总计
            $('#dlRebate').text(addUnit($.toFixed(data.dlRebate==null?0:data.dlRebate)));
            $('#dlBonuus').text(addUnit($.toFixed(data.dlBonuus==null?0:data.dlBonuus)));
            $('#dlDayWage').text(addUnit($.toFixed(data.dlDayWage==null?0:data.dlDayWage)));

            $.loaded();
	    })
	    
	    if(subUserId!=null&&$('#backBtn').length<=0){
            $('<button type="button" id="backBtn" class="btn btn-sm btn-primary m-l-md">返回</button>').insertAfter($('#queryBtn'))
	    }
	    
	    //返回按钮事件
		$('#backBtn').on('click',function(){
			window.location.href='/page/user-center/agent/user_list.html?' + new Date().getTime()+'&hisArr='+hisArr+'&queryMap='+queryMap;
		});
	  }
	
	  //数据加载
	  function loadPersonalData(callback){
		  var beginDate = $('#dateFrom').val();
		  var endDate = $('#dateTo').val();
		  $.get($.toFullPath('/api/dl/queryTeamRws'),
		        {beginDate: beginDate, endDate: endDate,userId:$.getUrlParam('subUserId')}, callback,'json');
	  }
	  
	  //增加现金单位
	  function addUnit(money) {
	    return money + "元";
	  }
	
	  //获取当天日期
	  function getCurrDate() {
	    var d = new Date();
	    var s = d.getFullYear().toString()
	        + '-' + addzero(d.getMonth() + 1)
	        + '-' + addzero(d.getDate());
	    return s;
	  }
	
	  //获取隔天日期
	  function getNextDate() {
	    var d = new Date();
	    var s = d.getFullYear().toString()
	        + '-' + addzero(d.getMonth() + 1)
	        + '-' + addzero(d.getDate() + 1);
	    return s;
	  }
	
	  //月份 日期 填充0
	  function addzero(v) {
	    if (v < 10) {
	      return '0' + v;
	    }
	    return v.toString();
	  }
})(jQuery);