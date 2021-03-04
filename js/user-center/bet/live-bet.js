/**
 * Created by Zelei on 2017/10/28.
 */
(function ($) {

    var gameKindMap, params;


    function toUnionKey(code, kind) {
        return code + '__' + kind;
    }

    function renderTable(pageData, pageNo) {
        $('#pagination').pagination(pageData.totalCount, {
            pageNo: pageNo,
            pageSize: 10,
            callback: function (p) {
                loadPage(p);
            }
        });
        var pageCount = 0, winAmountSum = 0,
            validMoneySum = 0,
            totalSum = pageData.otherData == null ? 0 : pageData.otherData.totalData;
        var gameCode = $('#gameCode').val();

        var keys = ['gmtBetTime', 'billNo', 'gameKind', 'betContent', 'betAmount', 'winAmount',
            'settle'], tbodyOptions = {
            preHandler: function (item) {
                pageCount += 1;

                item.betAmount = $.toFixed(Number(item.betAmount));//有效投注金额
                validMoneySum += item.betAmount;

                item.winAmount = $.toFixed(Number(item.winAmount));
                winAmountSum += item.winAmount;


                switch (item.settle) {
                    case -1:
                        item.settle = '<span class="text-muted">撤单</span>';
                        break;
                    case 0:
                        item.settle = '<span class="text-danger">未结算</span>';
                        break;
                    case 1:
                        item.settle = '<span class="text-success">已结算</span>';
                        break;
                    default:
                        item.settle = '';
                        break;
                }

                if (item.winAmount < 0) {
                  item.winAmount = '<span class="text-success">' + (-item.winAmount)
                      + '</span>';
                } else{
                    item.winAmount = '<span class="text-danger">' + item.winAmount
                        + '</span>';
                }
                if(gameCode=="wzry"){
                    gameCode = "dj";
                    item.gmtBetTime = item.betTime;
                }
                if(gameCode=="dj"){
                    item.gmtBetTime = item.betTime;
                }
                item.gameKind = (gameKindMap[toUnionKey(params.gameCode, item.gameType)] || item.gameType);
                item.betContent = item.betContent == '' || item.betContent == null || tem.betContent === undefined ? item.gameKind : item.betContent ;
            }
        };

        var tBody =  $('#table>tbody').renderTbody(pageData.data, keys, tbodyOptions);
        if (!pageData.data === false && pageData.data.length !== 0) {
            tBody.append(
              '<tr>' +
              '<td colspan="4">小计' + pageCount + '笔</td>' +
              '<td>' + $.toFixed(validMoneySum) + '</td>' +
              '<td>' + $.toFixed(-winAmountSum) + '</td>' +
              '<td></td>' +
              '<td></td>' +
              '</tr>'
            ).append(
              '<tr>' +
              '<td colspan="4">总计' + pageData.totalCount + '笔</td>' +
              '<td>' + $.toFixed(Number(totalSum.betAmount)) + '</td>' +
              '<td>' + $.toFixed(Number(-totalSum.winAmount)) + '</td>' +
              '<td></td>' +
              '<td></td>' +
              '</tr>'
            );
        }
    }

    function loadPage(pageNo) {
        $.loading();
        $.getJSON('/api/live/br', $.extend({
            page: pageNo,
            rows: 10
        }, params), function (response) {
            renderTable(response, pageNo);
            $.loaded();
        }).error(function () {
            $.loaded();
            $.errorHandler.apply($, arguments)
        });
    }

    function search() {
        params.betStartDate= $('#startDate').val() + ' 00:00:00';
        params.betEndDate= $('#endDate').val() + ' 23:59:59';
        params.gameCode= $('#gameCode').val();
        loadPage(1);
    }

    function getGames() {
        $.loading();

        $.ajax({
            url: '/api/live/qst',
            data:{
                page: 1,
                rows: 5000
            },
            dataType: 'json',
            method: 'get',
            async: false,
            success: function (response) {
                var map = {}, gameKind;
                for (var i = 0; i < response.data.length; i++) {
                    gameKind = response.data[i];
                    map[toUnionKey(gameKind.liveCode,gameKind.gameType)] = gameKind.chineseName;
                }
                gameKindMap = map;
            }
        });
        loadGameNav(function () {
            $.loaded();
        }, search).error(function () {
            $.loaded();
            $.errorHandler.apply($, arguments)
        });
    }

    $(function () {
        params = {timeType: 0,
            betStartDate:null,
            betEndDate:null,
            gameCode:null}

        $('#queryBtn').on('click', function () {
            search();
        });

        $('#timeType').change(function(){
            params.timeType = $(this).children('option:selected').val();
        });

        getGames();
    })


})(jQuery);