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

        $.getJSON($.toFullPath('/api/userWithdraw/queryPage'),
            $('#queryForm').serializeObject(),
            function(response) {
                var items = response.data,
                    keys = ['addTime', 'cashOrderNo', 'cashMoney', 'counterFee', 'approveMoney', 'bankName', 'bankCard', 'operatorTime','cashStatus'
                    ],
                    tbodyOptions = {
                        preHandler: function(item) {

                            //订单状态转换文字
                        	var status = item.cashStatus;
                        	//1" 未受理     "2" 受理中     "3" 已入款  "4" 已取消
                        	if (status == 1 || status == 2) {
                                item.cashStatus = "<span class='text-primary'>受理中</span>";
                            } else if (status == 3) {
                           	    item.cashStatus = "<span class='text-success'>已出款</span>";
                            } else if (status == 4) {
                            	item.cashStatus = "<span class='text-warning'>已取消</span>";
                            }else if (status == 5) {
                                item.cashStatus = "<span class='text-warning'>拒绝出款</span>";
                            }else if (status == 6) {
                                item.cashStatus = "<span class='text-warning'>撤销出款</span>";
                            }

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