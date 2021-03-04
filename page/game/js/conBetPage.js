//确认下注界面
var conBetPage = (function () {
    var isBeting = false;
    var show = function (betData) {
        if (!betData || betData.length < 1 || lotteryBlock) {
            return;
        }
        //console.log('++++++++++++',betData)
        var data = {content: betData};
        var html = template('conBetTemp', data);
        $("#betBody").html(html);
        totalShow();
        // 文本框事件
        $("#betBody input.data-conBet").on("change", function () {
            regNumber(this);
        });
        // 删除事件
        $("#betBody .bet-remove").on("click", function () {
            remove(this);
        });
        // 取消事件
        $("#butCancel").on("click", function () {
            cancel();
        });
        // 确认提交事件
        $("#butConBet").on("click", function () {
            bet();
        });
        $("input[type=text]").onlyNum();//所有文本框只能输入数字
        $("#conBet").css('display', 'block');
    }, regNumber = function (obj) {
        var kyodds = 0;
        var odds = $(obj).attr("data-odds");
        var money = Number($(obj).val());
        if (odds.indexOf(gameConstants.BET_SEPARATOR) > 0) {
            kyodds = Number(odds.split(gameConstants.BET_SEPARATOR)[0]);
        } else {
            kyodds = Number(odds);
        }
        var kyje = ((kyodds - 1) * money).toFixed(2);
        $(obj).attr("data-kyje", kyje);
        $(obj).parent().parent().find(".data-kyje").html(kyje);
        totalShow();
    }, totalShow = function () { // 更新汇总数据
        var totalMoney = 0;
        var totalNums = 0;
        var totalKyje = 0;
        $.each($("#betBody input.data-conBet"), function (n, o) {
            var obj = $(o);
            totalMoney += Number(obj.val());
            totalKyje += Number(obj.attr("data-kyje"));
            totalNums++;
        });
        $("#totalMoney").html(totalMoney.toFixed(2));
        $("#totalNums").html(totalNums);
        $("#totalKyje").html(totalKyje.toFixed(2));
    }, remove = function (obj) { // 删除下注行事件
        var trObj = $(obj).parent().parent();
        $(trObj).remove();
        totalShow();
    }, cancel = function () { // 关闭,取消事件
        $("#conBet").css('display', 'none');
    }, bet = function () { // 确认下注事件
        if (isBeting) {
            layer.msg('正在提交注单，请稍等');
            return;
        }
        isBeting = true;
        var betData = [];
        $.each($("#betBody input.data-conBet"), function (n, o) {
            var obj = $(o);
            var money = Number(obj.val());
            if(isNaN(money)){
                layer.alert('下注金额错误', {icon: 2});
                isBeting = false;
                cancel();
                return
            }
            if (money > 0) {
                var createOdds = function (odds, model) {
                    var oldOddsArry = [];
                    if (odds.indexOf(',') !== -1) {
                        oldOddsArry = odds.split(',')
                    } else {
                        oldOddsArry.push(odds)
                    }
                    var newOdds = '';
                    for (var i = 0; i < oldOddsArry.length; i++) {
                        if (model === 1) {
                            newOdds += (parseFloat(oldOddsArry[i]) / 10).oddFixed(4);
                            newOdds += ','
                        } else if (model === 2) {
                            newOdds += (parseFloat(oldOddsArry[i]) / 100).oddFixed(4);
                            newOdds += ','
                        } else if (model === 0) {
                            newOdds += (parseFloat(oldOddsArry[i])).oddFixed(4);
                            newOdds += ','
                        }
                    }
                    return newOdds.slice(0, newOdds.length - 1)
                };
                //判断角分
                var model = 0;
                money = parseFloat(money);
                if (money.toString().indexOf(".") !== -1) {
                    model = money.toString().split(".")[1].length;
                }
                var betMultiple;
                var betMoney;
                var betOdds;
                var odds = obj.attr("data-odds");
                if (model === 1) {
                    betMultiple = (money * 10).oddFixed(0);
                    betMoney = 0.1;
                    betOdds = createOdds(odds,1);
                } else if (model === 2) {
                    betMultiple = (money * 100).oddFixed(0);
                    betMoney = 0.01;
                    betOdds = createOdds(odds,2);
                } else if (model === 0) {
                    betMultiple = money.oddFixed(0);
                    betMoney = 1;
                    betOdds = createOdds(odds,0);
                } else {
                    layer.alert('下注金额错误,只支持元角分模式', {icon: 2});
                    cancel();
                    isBeting = false;
                    return
                }
                var betInfo = obj.attr("data-value");

                var betContent = {
                    "code": obj.attr("data-code"),
                    "betInfo": betInfo,
                    "odds": betOdds,
                    "money": betMoney,
                    "betModel": model,
                    "rebate": inputRebate,
                    "multiple": betMultiple,
                    "totalMoney": (betMultiple * betMoney).oddFixed(2),
                    "totalNums": 1,
                    "cateName": obj.attr("data-cateName")
                };
                betData.push(betContent);
            }
        });
        if (betData.length > 0) {
            var gameId = $("#gameId").val();
            var turnNum = $("#turnNum").val();
            var postData = {"gameId": gameId, "turnNum": turnNum, "content": betData};
            $.ajax({
                type: "post",
                url: "/api/bet",
                dataType: 'json',
                data: JSON.stringify(postData),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    layer.msg('下注成功');
                    cancel();
                    isBeting = false;
                    userInfoManager.load();
                    gameManager.loadLatelyBetInfo();
                }, error: function (xhr, type) {
                    isBeting = false;
                    cancel();
                }
            });
        }

    };
    return {show: show, cancel: cancel}
})();
