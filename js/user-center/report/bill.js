(function ($) {
	var subUserId = $.getUrlParam('subUserId');
	var hisArr = $.getUrlParam('hisArr');
	var queryMap = $.getUrlParam('queryMap');
	var transMap;

    function getStr(string,str){
        var str_before = string.split(str)[0];
        var str_after = string.split(str)[1];
        return str_before;
    }

	$(function () {

	    //设置时间控件默认值
	    $('#dateFrom').val(getCurrDate());
	    $('#dateTo').val(getCurrDate());
	    $('#dateFromPicker').datepicker({el: 'dateFrom'});
	    $('#dateToPicker').datepicker({el: 'dateTo'});
	
	    //查询列表
	    $('#queryBtn').on('click', function (e) {
	      $('#page').val(1);
	      $('#rows').val(10)
	      loadData()
	    });
	
	    //初始隐藏域
	    if(subUserId!=null){
	    	$('#userId').val(subUserId);
	    }
	    
	    //初始账变下拉列表
	    loadTranTypes();
	    
	    //初始加载
	    loadData();
	
	    //判断代理  增加是否包含下级按钮
	    $.getJSON($.toFullPath('/api/user/info'), null, function (response) {
	      if (response.userInfo.isDl) {
	          $(
	                  '<div class="form-group m-r-md m-b-xs">' +
	                  '<label for="account">帐号：</label>' +
	                  '<input id="account" name="account" class="form-control input-sm field-sm">'
	                  +
	                  '</div>').insertBefore($('#queryBtn'));
	      }
	    }).error($.errorHandler);

  });
	
	//初始账变下拉
	function loadTranTypes(){
		$.getJSON($.toFullPath('/api/reportMag/getTransList'),null,function(response){
			$.each(response,function(index,tranType){
 					if(tranType.reportType ==1){
 						if(!common_config.isDP && !common_config.isWzry){
 							if(tranType.desc!='真人返点'&&tranType.desc!='体育结算'&&tranType.desc!='额度转入'&&tranType.desc!='违规退还本金'&&tranType.desc!='电竞王者荣耀结算'&&tranType.desc!='电竞王者荣耀取消订单'){
 	  				            $('#incomeType').append("<option value='"+tranType.type+"' >"+tranType.desc+"</option>");
 	  				        }
 						}else if(!common_config.isDP && common_config.isWzry ){
 							if(tranType.desc!='真人返点'&&tranType.desc!='体育结算'&&tranType.desc!='额度转入'&&tranType.desc!='违规退还本金'){
 								$('#incomeType').append("<option value='"+tranType.type+"' >"+tranType.desc+"</option>");
 							}
 						}else if(common_config.isDP && !common_config.isWzry){
 							if(tranType.desc!='电竞王者荣耀结算'&&tranType.desc!='电竞王者荣耀取消订单'){
 								$('#incomeType').append("<option value='"+tranType.type+"' >"+tranType.desc+"</option>");
 							}
 						}else{
 							$('#incomeType').append("<option value='"+tranType.type+"' >"+tranType.desc+"</option>");
 						}
 				        
 				    }else if(tranType.reportType ==2){
 				    	if(!common_config.isDP && !common_config.isWzry){
 							if(tranType.desc!='真人返点回收'&&tranType.desc!='体育下注'&&tranType.desc!='额度转出'&&tranType.desc!='电竞王者荣耀下注'&&tranType.desc!='电竞王者荣耀重新结算'){
 	  				            $('#payType').append("<option value='"+tranType.type+"' >"+tranType.desc+"</option>");
 	  				        }
 						}else if(!common_config.isDP && common_config.isWzry ){
 							if(tranType.desc!='真人返点回收'&&tranType.desc!='体育下注'&&tranType.desc!='额度转出'){
 								$('#payType').append("<option value='"+tranType.type+"' >"+tranType.desc+"</option>");
 							}
 						}else if(common_config.isDP && !common_config.isWzry){
 							if(tranType.desc!='电竞王者荣耀下注'&&tranType.desc!='电竞王者荣耀重新结算'){
 								$('#payType').append("<option value='"+tranType.type+"' >"+tranType.desc+"</option>");
 							}
 						}else{
 							$('#payType').append("<option value='"+tranType.type+"' >"+tranType.desc+"</option>");
 						}
 				        
 				    }
 				    
			});
		}).error($.errorHandler);
		
		//获取账变类型Map
		$.getJSON($.toFullPath('/api/reportMag/getTransMap'),null,function(response){
			transMap = response;
		}).error($.errorHandler);
	}
	
  function loadData() {
	  
	  $.loading();
	  $.getJSON($.toFullPath('/api/reportMag/queryPageBill'),
      
	  $('#queryForm').serializeObject(), function (response) {
	  	  var dataList=response.data;
	  	  dataList.forEach((item,index)=>{
	  	  	item.content=getStr(item.content,'第三方接口');
		  })
          var items = dataList,
              moneyInPage = 0,
              moneyOutPage = 0,
              pageCount = 0,
              keys = ['account', 'addTime', 'tranType', 'moneyOut', 'moneyIn',
                'balance', 'content'],
              tbodyOptions = {
                preHandler: function (item) {
                  
                 //支出，收入
                 if (item.money >= 0) {
                    item.moneyIn = $.toFixed(item.money);
                    item.moneyOut = "-";
                    moneyInPage = moneyInPage + parseFloat(item.moneyIn);
                  } else {
                    item.moneyOut = $.toFixed(-item.money);
                    item.moneyIn = "-";
                    moneyOutPage = moneyOutPage + parseFloat(item.moneyOut);
                  }

                  //余额
                  item.balance = $.toFixed(item.balance+item.money);
                  
                  //账变类型
                  item.tranType = transMap[item.tranType];
                  //小计
                  pageCount++;
                }
              },
              totalRecords = response.totalCount,
              paginationOptions = {
                pageNo: parseInt($('#page').val()),
                pageSize: parseInt($('#rows').val()),
                callback: function (pageNo) {
                  $('#page').val(pageNo);
                  loadData();
                }
              };
          $('#table>tbody').renderTbody(items, keys, tbodyOptions).setColWidth(6,500);
          loadTfoot(response, moneyInPage, moneyOutPage, pageCount);
          loadBackBtn();
          $('#pagination').pagination(totalRecords, paginationOptions);
          $.loaded();
        }).error($.errorHandler(function (response) {
        	  $('#table>tbody').renderEmptyTbody('加载失败', 12);
		      loadEmptyTfoot();
		      $('#pagination').pagination();
		      $.loaded();
        }));
  }
  
  function loadBackBtn(){
	    if(subUserId!=null&&$('#backBtn').length<=0){
            $('<button type="button" id="backBtn" class="btn btn-sm btn-primary m-l-md m-b-xs">返回</button>').insertAfter($('#queryBtn'))
    	    //返回按钮事件
    		$('#backBtn').on('click',function(){
    			window.location.href='/page/user-center/agent/user_list.html?' + new Date().getTime()+'&hisArr='+hisArr+'&queryMap='+queryMap;
    		});
	    }
  }
  

  //装载tfoot数据
  function loadTfoot(response, moneyInPage, moneyOutPage, pageCount) {
    //装载账变统计数据
    $("tfoot tr").remove();
    var footStr = "";
    footStr = footStr
        + "<tr style='font-weight:bold'>"
        + "<td colspan='3'>小计" + pageCount + "笔</td>"
        + "<td><font color='red'>总支出:" + $.toFixed(moneyOutPage)
        + "</font></td>"
        + "<td> 总收入:" + $.toFixed(moneyInPage) + "</td>"
        + "<td colspan='2'></td>"
        + "</tr>"
        + "<tr style='font-weight:bold'>"
        + "<td colspan='3'>总计" + response.totalCount + "笔</td>"
        + "<td><font color='red'>总支出:" + $.toFixed(response.otherData==null?0:response.otherData.paySum)
        + "</font></td>"
        + "<td> 总收入:" + $.toFixed(response.otherData==null?0:response.otherData.incomeSum) + "</td>"
        + "<td colspan='2'></td>"
        + "</tr>";
    $("tfoot").append(footStr);
  }
  
  function loadEmptyTfoot() {
	    //装载账变统计数据
	    $("tfoot tr").remove();
	    var footStr = "";
	    footStr = footStr
	        + "<tr style='font-weight:bold'>"
	        + "<td colspan='3'>小计0笔</td>"
	        + "<td><font color='red'>总支出:0.00"
	        + "</font></td>"
	        + "<td> 总收入:0.00</td>"
	        + "<td colspan='2'></td>"
	        + "</tr>"
	        + "<tr style='font-weight:bold'>"
	        + "<td colspan='3'>总计0笔</td>"
	        + "<td><font color='red'>总支出:0.00"
	        + "</font></td>"
	        + "<td> 总收入:0.00</td>"
	        + "<td colspan='2'></td>"
	        + "</tr>";
	    $("tfoot").append(footStr);
	  }

  //获取当天日期
  function getCurrDate() {
    var d = new Date();
    var s = d.getFullYear().toString()
        + '-' + addzero(d.getMonth() + 1)
        + '-' + addzero(d.getDate());
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