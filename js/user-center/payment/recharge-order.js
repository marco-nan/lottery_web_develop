/**
 * Created by Zelei on 2017/11/11.
 */
(function($) {
    $(function() {
        $('#dateFromPicker').datepicker({ el: 'dateFrom' }).children('#dateFrom').val(
            $.dateformat(new Date(), 'yyyy-MM-dd'));
        $('#dateToPicker').datepicker({ el: 'dateTo' }).children('#dateTo').val(
            $.dateformat(new Date(), 'yyyy-MM-dd'));
        $('#queryBtn').on('click', function(e) {
            $('#page').val(1);
            $('#rows').val(10)
            loadData();
        });
        loadData();
    });

    function loadData() {
        $.loading();
        var discountTypeMap = {};
        $.getJSON($.toFullPath('/api/recharge/queryDiscountTypeList'),
            function(response) {
        	$.each(response, function(index, item) { 
        	     discountTypeMap[item.value]  = item.name;
            });
        });


        $.getJSON($.toFullPath('/api/recharge/personalRechargeOrder'),
            $('#queryForm').serializeObject(),
            function(response) {
                var items = response.data,
                    keys = ['addTime', 'orderNo', 'amount', 'discountAmount', 'discountType', 'totalAmount', 'mode', 'payTypeName','auditTime','status'
                    ],
                    tbodyOptions = {
                        preHandler: function(item) {
                        	//充值模式转换文字
                        	var mode = item.mode;
                        	//"1" 转账汇款  "2" 在线支付  "3" 人工充值
                        	if (mode == 1) {
                                 item.mode = "转账汇款";
                             } else if (mode == 2) {
                                 item.mode = "在线支付";
                             } else if (mode == 3){
                            	 item.mode = "人工充值";
                            }
                        	
                        	//订单状态转换文字
                        	var status = item.status;
                        	//1" 未受理     "2" 受理中     "3" 已入款  "4" 已取消
                        	if (status == 1 || status == 2) {
                                item.status = "<span class='text-primary'>受理中</span>";
                            } else if (status == 3) {
                           	    item.status = "<span class='text-success'>已入款</span>";
                            } else if (status == 4) {
                            	item.status = "<span class='text-warning'>已取消</span>";
                            }
                        	//优惠类型转换文字
                        	item.discountType = discountTypeMap[item.discountType];
                        	item.payTypeName = item.payTypeName + " " + item.subPayTypeName;
                        }
                    },
                    totalRecords = response.totalCount,
                    paginationOptions = {
                        pageNo: parseInt($('#page').val()),
                        pageSize: parseInt($('#rows').val()),
                        callback: function(pageNo) {
                            $('#page').val(pageNo);
                            loadData();
                        }
                    };
                var tbody = $('#table>tbody').renderTbody(items, keys, tbodyOptions);
                $('#pagination').pagination(totalRecords, paginationOptions);
                $.loaded();
            }).error(function(xhr, errorText, errorType) {
            $.errorHandler(xhr, errorText, errorType);
            $('#table>tbody').renderEmptyTbody('加载失败', 9);
            $('#pagination').pagination();
        });
    }
})(jQuery);