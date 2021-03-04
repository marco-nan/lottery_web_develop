(function ($) {
    var tableRender = template.compile('\
        <thead class="thead-default"> \
            <tr>\
                <th>日期</th> \
                <th>投注金额</th> \
                <th>返点金额</th> \
                <th>盈利金额</th> \
            </tr> \
        </thead>\
        <tbody> \
        {{each rows row}}\
        <tr>\
            <td><a href="cp-history-record.html?date={{row.statTime}}">{{row.statTime}}</a></td>\
            <td>{{row.bettingMoney}}</td>\
            <td>{{row.rebateMoney}}</td>\
            <td class="{{row.winOrcloseMoney > 0 ? \'text-danger\' : row.winOrcloseMoney < 0 ? \'text-success\' : \'text-muted\'}}">{{row.winOrcloseMoney | toFixed:2}}</td>\
        </tr>\
        {{/each}}\
        </tbody>');

    $(function () {
        $.loading();
        $.getJSON('/api/cp/records/historyDayReport', null, function (response) {
            $('#report-table').html(tableRender({rows: response}))
            $.loaded();
        }).error($.errorHandler);
    });
})(jQuery);