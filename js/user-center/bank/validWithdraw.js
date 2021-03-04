/**
 * Created by Zelei on 2017/5/26.
 */
(function ($) {
	$.extend({
		cashNext: function () {
			window.location.href="withdraw/form.html";
		},
		effectiveHide: function() {
			$("#effective_id").html("<a href='javascript:void(0)' class='btn btn-primary' onclick='jQuery.effectiveShow()'>显示实际有效投注额</a>");
			$('[data-id="effectiveamount"]').css('display', 'none');
		},
		effectiveShow: function() {
			$("#effective_id").html("<a href='javascript:void(0)' class='btn btn-primary' onclick='jQuery.effectiveHide()'>隐藏实际有效投注额</a>");
			$('[data-id="effectiveamount"]').css('display', 'table-cell');
		},
		rebateHide: function() {
			$("#rebate_id").html("<a href='javascript:void(0)' class='btn btn-primary' onclick='jQuery.rebateShow()'>显示优惠流水审核</a>");
			$('[data-id="rebate"]').css('display', 'none');
		},
		rebateShow: function() {
			$("#rebate_id").html("<a href='javascript:void(0)' class='btn btn-primary' onclick='jQuery.rebateHide()'>隐藏优惠流水审核</a>");
			$('[data-id="rebate"]').css('display', 'table-cell');
		}
	});
	$(function () {
		$.effectiveShow();
		$.rebateShow();
		$.ajax({
		    async: false,
		    url: $.toFullPath('/api/user/info'),
		    type: 'get',
		    dataType: 'json',
		    success: function (response) {
		      if (!response || !response.userInfo || !response.userInfo.type
		          || response.userInfo.type === 'TEST') {
		        $.confirm({
		          title: '试玩帐号无法提现',
		          content: '马上注册成为会员？',
		          onConfirmed: function (modal, event) {
		            var target = !window.parent === false && window.parent !== window
		                ? window.parent : windown;
		            target.location.href = $.toFullPath(
		                '/views/html/register.html');
		          },
		          onDenied: function (modal, event) {
		            window.location.href = $.toFullPath(
		                '/page/user-center/account/overviews.html');
		          }
		        });
		      }
		      $.extend({
		        userInfo: response.userInfo
		      });
		    },
		    error: $.errorHandler
		});
		// 验证是否有提现资格
        $.getJSON($.toFullPath('/api/userWithdraw/queryOutMoneyIndex'), null,
            function (response) {
                console.log(response);
                if (response) {
                    let allowDml = response.limit.allowDml || 0; //打码量不足是否允许提现 0 允许，1禁止
                    let dayMaxCountLimit = response.limit.dayMaxCountLimit || 0; //超过提现次数是否允许提现  0 允许 1 禁止
                    if((!response.allDmlPass) && allowDml == 1){
                    	$("#btn-primary").hide();
                        layer.alert("当前打码量不足，请在打码量足够后再申请提款！", {
                            icon: 5,
                            shade: 0
                        });
                        return false;
					}
					if(response.count >= response.limit.dayMaxCount && dayMaxCountLimit == 1) {
                        $("#btn-primary").hide();
                        layer.alert("今日提现次数已超限，请明日再申请提款！", {
                            icon: 5,
                            shade: 0
                        });
                        return false;
					}
                    $("#btn-primary").show();
                }
            }).error($.errorHandler);

		// 页面加载完成后执行的代码
		$.getJSON($.toFullPath('/api/userWithdraw/validWithdraw/queryAll'), null,
			function (response) {
				var html1 = "";
				var html2 = "";
				var html3 = "";
				if(response!=null&&response.rows!=null&&response.rows.length!=0) {
					var data = response.rows;
					if(data!=null&&data.length!=0) {
						for(var i=0; i<data.length; i++) {
							if(data[i].discountAdopt==true) {
								html2 = "<font color='#00cc00'>通过</font>";
							} else {
								html2 = "<font color='red'>不通过</font>";
							}
							if(data[i].mormAdopt==true) {
								html3 = "<font color='#00cc00'>通过</font>";
							} else {
								html3 = "<font color='red'>不通过</font>";
							}
							html1 = html1
								  + "<tr class='m_cen'>"
		                          + "<td style='width:160px;'>起始:"+data[i].beginTime+"</td>"
		                          + "<td rowspan='2'>"+$.toFixed(data[i].rechMoney,2)+"</td>"
		                          + "<td rowspan='2'>"+$.toFixed(data[i].discountMoney,2)+"</td>"
		                          + "<td class='hide1' rowspan='2' style='display:table-cell;' data-id='effectiveamount'>"+$.toFixed(data[i].cpDml,2)+"</td>"
		                          + "<td class='hide1' rowspan='2' style='display:table-cell;' data-id='effectiveamount'>"+$.toFixed(data[i].sportsDml,2)+"</td>"
		                          + "<td class='hide1' rowspan='2' style='display:table-cell;' data-id='effectiveamount'>"+$.toFixed(data[i].videoDml,2)+"</td>"
		                          + "<td class='hide2' rowspan='2' style='display:table-cell;' data-id='rebate'>"+$.toFixed(data[i].discountDml,2)+"</td>"
		                          + "<td class='hide2' rowspan='2' style='display:table-cell;' data-id='rebate'>"+html2+"</td>"
		                          + "<td class='hide2' rowspan='2' style='display:table-cell;' data-id='rebate'>"+$.toFixed(data[i].discountDeduct,2)+ "</td>"
		                          + "<td rowspan='2'>"+$.toFixed(data[i].mormDml,2)+"</td>"
		                          + "<td rowspan='2'>"+$.toFixed(data[i].relaxQuota,2)+"</td>"
		                          + "<td rowspan='2'>"+html3+"</td>"
		                          + "<td rowspan='2'>"+$.toFixed(data[i].mormDeduct,2)+"</td>"
		                          + "<td rowspan='2'>"+$.toFixed(data[i].allDeduct,2)+"</td>"
		                          + "</tr>"
		                          + "<tr class='m_cen'>"
		                     	  + "<td>结束:"+data[i].endTime+"</td>"
		                     	  + "</tr>";
						}
					}
				}
				$("#validBet").html($.toFixed(response.sumAllDml,2));
				$("#dmlList").html(html1);
				$("#sumDeduct").html($.toFixed(response.sumAllDeduct,2)+"元");
				$("#sumDeductMoney").val(response.sumAllDeduct);
				$('#cashTime').html($.dateformat(new Date(), 'yyyy-MM-dd HH:mm:ss'));
			}
		).error($.errorHandler);
	});
})(jQuery);