var butBetClick = undefined; // 按钮提交事件
var rebateChange = undefined;
var betMaxCount = 150; // 下注最大注数
// 游戏常量
var gameConstants = {BET_SEPARATOR: ",", DAN_TUO_SEPARATOR: "&"};
var currentEvent = undefined;
var eventManager = (function () {
    var getEvent = function () {
        return currentEvent;
    }
    return {getEvent: getEvent}
})()
//  提交  注单
$(document).keyup(function (event) {
    var eventObj = event || e;
    var keyCode = eventObj.keyCode || eventObj.which;


    if (keyCode == 13) {
        if(!$('#conBet').is(":hidden")){
            $('#butConBet').click();
            return
        }
        betContent();
    }
    if(keyCode == 27) {
        $('#conBet').hide();
    }
});
var oddManager = (function () {
    function getOdds(play) {
        //console.log("------play=" + play);
        if(play.code=='70200110001'){
            return parseFloat((play.maxOdds).oddFixed(4));
        }
        return parseFloat((play.minOdds + (play.maxOdds - play.minOdds) / play.rebate * (userRebate - inputRebate) / 100).oddFixed(4));
    }

    var text = function () {
        // 文本框方式
        $.each($(".data-block"), function (n, o) {
            var obj = $(o);
            var playId = obj.attr("data-playId");
            var play = playMap[playId];
            // console.log();('playId',play)
            if (!play) {
                return;
            }
            //特码B
            // if(play.code=='70200110001'||play.code=='70200110002'||play.code=='70200110003'||play.code=='70200110004'||play.code=='70200110005'||play.code=='70200110006'){
            //     return
            // }

            var odds = getOdds(play);
            obj.attr("data-odds", odds);
            if (!lotteryBlock) {
                obj.html(odds);
            }
            $("#" + playId).attr("data-odds", odds); // 下注文本框
        });
    }, cateCode = function () {
        $.each($('[name="rtype"]'), function (n, o) {
            var obj = $(o);
            var cateCode = obj.attr("data-code");
            var playList = playByCodeMap[cateCode];
            if (!playList) {
                return;
            }
            var odds = "";
            $.each(playList, function (n, play) {
                var value = getOdds(play);
                odds += value + ",";
                var playObj = $("#" + play.id);
                playObj.attr("data-odds", value);
                if (!lotteryBlock) {
                    playObj.html(value);
                }
            });
            odds = odds.substring(0, odds.length - 1);
            obj.attr("data-odds", odds);
        });
    }, heXiao = function () {
        $.each($('.data-chbox'), function (n, o) {
            var obj = $(o);
            var playId = obj.attr("data-playId");
            var play = playMap[playId];
            if (!play) {
                return;
            }
            var odds = getOdds(play);
            obj.attr("data-odds", odds);
        });
        var showOdds = dataHandle.heXiao_odds();
        $(".lm_pl").html(showOdds);
    }, ZX1 = function () {
        $.each($('[name="rtype"]'), function (n, o) {
            var obj = $(o);
            var cateCode = obj.attr("data-code");
            var playList = playByCodeMap[cateCode];
            if (!playList) {
                return;
            }
            var odds = "";
            $.each(playList, function (n, play) {
                var value = getOdds(play);
                odds += value + ",";

            });
            odds = odds.substring(0, odds.length - 1);
            obj.attr("data-odds", odds);
        });
    }, RX1_5 = function () {
        $.each($('[name="rtype"]'), function (n, o) {
            var obj = $(o);
            var cateCode = obj.attr("data-code");
            var playList = playByCodeMap[cateCode];
            if (!playList) {
                return;
            }
            var odds = "";
            var cateName = "";
            $.each(playList, function (n, play) {
                var value = getOdds(play);
                odds += value + ",";
                cateName += play.alias + ",";
            });
            odds = odds.substring(0, odds.length - 1);
            cateName = cateName.substring(0, cateName.length - 1);
            obj.attr("data-odds", odds);
            obj.attr("data-showName", cateName);
        });

    }, cateCode1 = function () {
        var odds = "";
        var cateName = "";
        var obj = $("#playCate");
        var cateCode = obj.attr("data-code");
        var playList = playByCodeMap[cateCode];
        if (!playList) {
            return;
        }
        $.each(playList, function (n, play) {
            var value = getOdds(play);
            odds += value + ",";
            cateName += play.alias + ",";
        });
        odds = odds.substring(0, odds.length - 1);
        cateName = cateName.substring(0, cateName.length - 1);
        obj.attr("data-odds", odds);
        //obj.attr("data-cateName", cateName);
        $(".lm_pl").html(odds);
        $(".lm_name").html(cateName);

    };
    return {text: text, cateCode: cateCode, heXiao: heXiao, ZX1: ZX1, RX1_5: RX1_5, cateCode1: cateCode1};
})();

var pcdd = (function () {
    var init = function () { // 默认文本框模式页面事件
        currentEvent = pcdd;
        //text 模式
        $('.data-focus').on("click", function () { // 选中事件
            if (lotteryBlock) {
                return;
            }
            var playId = $(this).attr("data-playId");
            if ($(this).hasClass("danger")) {
                $('.data-focus-' + playId).removeClass("danger"); // 删除选中样式
                $('#' + playId).val(''); // 设置金额
            } else {
                $('.data-focus-' + playId).addClass("danger");// 添加选中样式
                var money = $('#quickMoney').val();
                $('#' + playId).val(money); // 设置金额
            }
        });
        $('.bet-input').on('change', function () {
            // console.log();($(this).val())
        })
        $('.t_lh_border3').on('click', function () {
            if (lotteryBlock) {
                return
            }
            if ($(this).hasClass('data-focus')) {
                return;
            }
            var playId = $(this).attr('data-playId')
            if ($(this).hasClass("danger")) {
                $('.data-focus-' + playId).removeClass("danger"); // 删除选中样式
                $('#' + playId).val(''); // 设置金额
            } else {
                $('.data-focus-' + playId).addClass("danger");// 添加选中样式
                var money = $('#quickMoney').val();
                $('#' + playId).val(money); // 设置金额
            }
        })
        $('.t_border3').on('click', function () {
            if (lotteryBlock) {
                return
            }
            var playId = $(this).attr('data-playId')
            if ($(this).hasClass('data-focus')) {
                return;
            }
            if ($(this).hasClass("danger")) {
                $('.data-focus-' + playId).removeClass("danger"); // 删除选中样式
                $('#' + playId).val(''); // 设置金额
            } else {
                $('.data-focus-' + playId).addClass("danger");// 添加选中样式
                var money = $('#quickMoney').val();
                $('#' + playId).val(money); // 设置金额
            }
        })
        $(".bet-input").on("change", function () {
        })
        $('.t_lh_border3').find("input[type=text]").keypress(function (event) {
            if (lotteryBlock) {
                return
            }
            var playId = $(this).attr('data-playId');
            var eventObj = event || e;
            var keyCode = eventObj.keyCode || eventObj.which;
            if ((keyCode >= 48 && keyCode <= 57)) {
                $('.data-focus-' + playId).addClass('danger')
            }
        })
        $('.t_border3').find("input[type=text]").keypress(function (event) {
            if (lotteryBlock) {
                return
            }
            var palyId = $(this).attr('data-playId');
            var eventObj = event || e;
            var keyCode = eventObj.keyCode || eventObj.which;
            if ((keyCode >= 48 && keyCode <= 57)) {
                $('.data-focus-' + palyId).addClass('danger')
            }
        })
        $("input[type=text]").onlyNum();//所有文本框只能输入数字


        var playCate = $('#playCate');
        $('#data-ZX1 .data-focus').on("click", function () { // tab切换焦点
            if (lotteryBlock) {
                return;
            }
            var maxNums = playCate.attr('data-maxNumber');
            if (maxNums) {
                if ($('#data-ZX1 .danger').length + $('#data-ZX2 .danger').length + $('#data-ZX3 .danger').length >= maxNums) {
                    return;
                }
            }
            var value = $(this).attr("data-value");
            if ($('#data-ZX2 .data-focus-' + value).hasClass("danger")
                || $('#data-ZX3 .data-focus-' + value).hasClass("danger")) {
                return;
            }
            if ($(this).hasClass("danger")) {
                $('#data-ZX2 .data-focus-' + value).find("span").removeClass("vis_hid"); // 隐藏
                $('#data-ZX3 .data-focus-' + value).find("span").removeClass("vis_hid"); // 隐藏
                $('#data-ZX1 .data-focus-' + value).removeClass("danger"); // 删除选中样式
            } else {
                $('#data-ZX2 .data-focus-' + value).find("span").addClass("vis_hid"); // 隐藏
                $('#data-ZX3 .data-focus-' + value).find("span").addClass("vis_hid"); // 隐藏
                $('#data-ZX1 .data-focus-' + value).addClass("danger"); // 删除选中样式
            }
        });
        $('#data-ZX2 .data-focus').on("click", function () { // tab切换焦点
            if (lotteryBlock) {
                return;
            }
            var maxNums = playCate.attr('data-maxNumber');
            if (maxNums) {
                if ($('#data-ZX1 .danger').length + $('#data-ZX2 .danger').length + $('#data-ZX3 .danger').length >= maxNums) {
                    return;
                }
            }
            var value = $(this).attr("data-value");
            if ($('#data-ZX1 .data-focus-' + value).hasClass("danger")
                || $('#data-ZX3 .data-focus-' + value).hasClass("danger")) {
                return;
            }
            if ($(this).hasClass("danger")) {
                $('#data-ZX1 .data-focus-' + value).find("span").removeClass("vis_hid"); // 隐藏
                $('#data-ZX3 .data-focus-' + value).find("span").removeClass("vis_hid"); // 隐藏
                $('#data-ZX2 .data-focus-' + value).removeClass("danger"); // 删除选中样式
            } else {
                $('#data-ZX1 .data-focus-' + value).find("span").addClass("vis_hid"); // 隐藏
                $('#data-ZX3 .data-focus-' + value).find("span").addClass("vis_hid"); // 隐藏
                $('#data-ZX2 .data-focus-' + value).addClass("danger"); // 删除选中样式
            }
        });
        $('#data-ZX3 .data-focus').on("click", function () { // tab切换焦点
            if (lotteryBlock) {
                return;
            }
            var maxNums = playCate.attr('data-maxNumber');
            if (maxNums) {
                if ($('#data-ZX1 .danger').length + $('#data-ZX2 .danger').length + $('#data-ZX3 .danger').length >= maxNums) {
                    return;
                }
            }
            var value = $(this).attr("data-value");
            if ($('#data-ZX2 .data-focus-' + value).hasClass("danger")
                || $('#data-ZX1 .data-focus-' + value).hasClass("danger")) {
                return;
            }
            if ($(this).hasClass("danger")) {
                $('#data-ZX2 .data-focus-' + value).find("span").removeClass("vis_hid"); // 隐藏
                $('#data-ZX1 .data-focus-' + value).find("span").removeClass("vis_hid"); // 隐藏
                $('#data-ZX3 .data-focus-' + value).removeClass("danger"); // 删除选中样式
            } else {
                $('#data-ZX2 .data-focus-' + value).find("span").addClass("vis_hid"); // 隐藏
                $('#data-ZX1 .data-focus-' + value).find("span").addClass("vis_hid"); // 隐藏
                $('#data-ZX3 .data-focus-' + value).addClass("danger"); // 删除选中样式
            }
        });

        //menu.cateTab();
        funBetBut = getBetContent;
        focusEvent();
        oddManager.text();
        rebateChange = oddManager.text;


        var tm3bobj = $("#tm3bPlayCate");
        var cateCode = tm3bobj.attr("data-code");
        var playList = playByCodeMap[cateCode];
        if (!playList) {
            return;
        }
        $.each(playList, function (n, play) {
            var value = parseFloat((play.maxOdds).oddFixed(4));
            tm3bobj.attr("data-odds", value);
        });


    }, focusEvent = function () { // 焦点事件
        $('.table-bet tbody td').each(function () {
            var id = $(this).attr('data-playId');
            $(this).hover(function () {
                if (lotteryBlock) {
                    return;
                }
                $('.data-focus-' + id).addClass('waring');
            }, function () {
                $('.data-focus-' + id).removeClass('waring');
            });
        });
        $('#data-ZX1 tbody td').each(function () {
            var id = $(this).attr('data-playId');
            $(this).hover(function () {
                if (lotteryBlock) {
                    return;
                }
                $('#data-ZX1 .data-focus-' + id).addClass('waring');
            }, function () {
                $('#data-ZX1 .data-focus-' + id).removeClass('waring');
            });
        });
        $('#data-ZX2 tbody td').each(function () {
            var id = $(this).attr('data-playId');
            $(this).hover(function () {
                if (lotteryBlock) {
                    return;
                }
                $('#data-ZX2 .data-focus-' + id).addClass('waring');
            }, function () {
                $('#data-ZX2 .data-focus-' + id).removeClass('waring');
            });
        });
        $('#data-ZX3 tbody td').each(function () {
            var id = $(this).attr('data-playId');
            $(this).hover(function () {
                if (lotteryBlock) {
                    return;
                }
                $('#data-ZX3 .data-focus-' + id).addClass('waring');
            }, function () {
                $('#data-ZX3 .data-focus-' + id).removeClass('waring');
            });
        });
    }, cancel = function () {
        $(".data-bet").val('');
        $(".danger").removeClass('danger');
        $('.vis_hid').removeClass("vis_hid"); // 删除隐藏,胆拖
        $.each($('.Nav_content_Fr_table').find('td'), function (_, item) {
            $(item).attr('data-chose', 0);
            $(item).css('background-color', '')
            $(item).removeClass('text-danger')
        })
    }, block = function () { // 封盘操作
        $(".data-block").html('--');
        $(".data-bet").val('');
        $(".danger").removeClass('danger');
        $(".data-bet").attr("readonly", "readonly");
        $('.vis_hid').removeClass("vis_hid"); // 删除隐藏,胆拖
        $(".data-bet").attr("disabled", true);

    }, unBlock = function () { // 开盘操作
        $.each($(".data-block"), function (n, o) {
            var obj = $(o);
            var odds = obj.attr("data-odds");
            obj.html(odds);
        });
        $(".data-bet").attr("disabled", false);
        $(".data-bet").removeAttr("readonly");
    }, getBetContent = function () {

        var betData = [];
        var n1 = [];
        $.each($('#data-ZX1 .danger'), function (n, o) {
            var li = $(o);
            n1.push(li.attr("data-value"));
        });
        var n2 = [];
        $.each($('#data-ZX2 .danger'), function (n, o) {
            var li = $(o);
            n2.push(li.attr("data-value"));
        });
        var n3 = [];
        $.each($('#data-ZX3 .danger'), function (n, o) {
            var li = $(o);
            n3.push(li.attr("data-value"));
        });
        var params = [n1, n2, n3];

        if (n1.length > 0 && n2.length > 0 && n3.length > 0) {
            var money = $('#quickMoney').val();
            if (money > 0) {
                var tm3bPlayCate = $('#tm3bPlayCate');
                n1.forEach(function (num1) {
                    n2.forEach(function (num2) {
                        n3.forEach(function (num3) {
                            var betInfo = num1 + gameConstants.BET_SEPARATOR + num2 + gameConstants.BET_SEPARATOR + num3;
                            var odds = tm3bPlayCate.attr("data-odds"); // 默认为固定赔率

                            if (odds) {
                                var kyje = (odds - 1) * money;
                                betData.push({
                                    code: tm3bPlayCate.attr("data-code"),
                                    betInfo: betInfo,
                                    odds: tm3bPlayCate.attr("data-odds"),
                                    money: money,
                                    cateName: tm3bPlayCate.attr("data-cateName"),
                                    kyje: kyje.toFixed(2)
                                });
                            }
                        })
                    })
                });
            }
        }
        $.each($("input.bet-input"), function (n, o) {
            var obj = $(o);
            var money = Number(obj.val());
            if (money > 0) {
                var betInfo = obj.attr("data-value");
                var odds = Number(obj.attr("data-odds"));
                var kyje = (odds - 1) * money;
                var betContent = {
                    "code": obj.attr("data-code"),
                    "betInfo": betInfo,
                    "odds": odds,
                    "money": money,
                    "kyje": kyje.toFixed(2),
                    "cateName": obj.attr("data-cateName")
                };
                betData.push(betContent);
            }
        });
        if (betData.length == 0) {
            layer.alert('请输入下注内容', {icon: 2});
        }
        if (betData.length > 0) {
            conBetPage.show(betData);
            cancel();
        }
    };
    return {init: init, block: block, unBlock: unBlock, cancel: cancel};
})();

var text = (function () {
    var init = function () { // 默认文本框模式页面事件
        currentEvent = text;
        $('.data-focus').on("click", function () { // 选中事件
            if (lotteryBlock) {
                return;
            }
            var playId = $(this).attr("data-playId");
            if ($(this).hasClass("danger")) {
                $('.data-focus-' + playId).removeClass("danger"); // 删除选中样式
                $('#' + playId).val(''); // 设置金额
            } else {
                $('.data-focus-' + playId).addClass("danger");// 添加选中样式
                var money = $('#quickMoney').val();
                $('#' + playId).val(money); // 设置金额
            }
        });
        $('.bet-input').on('change', function () {
            // console.log();($(this).val())
        })
        $('.t_lh_border3').on('click', function () {
            if (lotteryBlock) {
                return
            }
            if ($(this).hasClass('data-focus')) {
                return;
            }
            var playId = $(this).attr('data-playId')
            if ($(this).hasClass("danger")) {
                $('.data-focus-' + playId).removeClass("danger"); // 删除选中样式
                $('#' + playId).val(''); // 设置金额
            } else {
                $('.data-focus-' + playId).addClass("danger");// 添加选中样式
                var money = $('#quickMoney').val();
                $('#' + playId).val(money); // 设置金额
            }
        })
        $('.t_border3').on('click', function () {
            if (lotteryBlock) {
                return
            }
            var playId = $(this).attr('data-playId')
            if ($(this).hasClass('data-focus')) {
                return;
            }
            if ($(this).hasClass("danger")) {
                $('.data-focus-' + playId).removeClass("danger"); // 删除选中样式
                $('#' + playId).val(''); // 设置金额
            } else {
                $('.data-focus-' + playId).addClass("danger");// 添加选中样式
                var money = $('#quickMoney').val();
                $('#' + playId).val(money); // 设置金额
            }
        })
        $(".bet-input").on("change", function () {
            // var val = $("input[name=nQuickMoney]").val();
            // if (val == "" || val == null) {
            //     $("input[name=nQuickMoney]").val($(this).val());
            //     quickMoneyChange( $("input[name=nQuickMoney]"));
            //     }
            // ;

        })

        $('.t_lh_border3').find("input[type=text]").keypress(function (event) {
            if (lotteryBlock) {
                return
            }
            var playId = $(this).attr('data-playId');
            var eventObj = event || e;
            var keyCode = eventObj.keyCode || eventObj.which;
            if ((keyCode >= 48 && keyCode <= 57)) {
                $('.data-focus-' + playId).addClass('danger')
            }
        })
        $('.t_border3').find("input[type=text]").keypress(function (event) {
            if (lotteryBlock) {
                return
            }
            var palyId = $(this).attr('data-playId');
            var eventObj = event || e;
            var keyCode = eventObj.keyCode || eventObj.which;
            if ((keyCode >= 48 && keyCode <= 57)) {
                $('.data-focus-' + palyId).addClass('danger')
            }
        })
        //menu.cateTab();
        $("input[type=text]").onlyNum();//所有文本框只能输入数字
        funBetBut = getBetContent;
        focusEvent();
        oddManager.text();
        rebateChange = oddManager.text;
    }, focusEvent = function () { // 焦点事件
        $('.table-bet tbody td').each(function () {
            var id = $(this).attr('data-playId');
            $(this).hover(function () {
                if (lotteryBlock) {
                    return;
                }
                $('.data-focus-' + id).addClass('waring');
            }, function () {
                $('.data-focus-' + id).removeClass('waring');
            });
        });
    }, cancel = function () {
        $(".data-bet").val('');
        $(".danger").removeClass('danger');
        $.each($('.Nav_content_Fr_table').find('td'), function (_, item) {
            $(item).attr('data-chose', 0);
            $(item).css('background-color', '')
            $(item).removeClass('text-danger')
        })
    }, block = function () { // 封盘操作
        $(".data-block").html('--');
        $(".data-bet").val('');
        $(".danger").removeClass('danger');
        $(".data-bet").attr("readonly", "readonly");
        $(".data-bet").attr("disabled", true);

    }, unBlock = function () { // 开盘操作
        $.each($(".data-block"), function (n, o) {
            var obj = $(o);
            var odds = obj.attr("data-odds");
            obj.html(odds);
        });
        $(".data-bet").attr("disabled", false);
        $(".data-bet").removeAttr("readonly");
    }, getBetContent = function () {
        var betData = [];
        $.each($("input.bet-input"), function (n, o) {
            var obj = $(o);
            var money = Number(obj.val());
            if (money > 0) {
                var betInfo = obj.attr("data-value");
                var odds = Number(obj.attr("data-odds"));
                var kyje = (odds - 1) * money;
                var betContent = {
                    "code": obj.attr("data-code"),
                    "betInfo": betInfo,
                    "odds": odds,
                    "money": money,
                    "kyje": kyje.toFixed(2),
                    "cateName": obj.attr("data-cateName")
                };
                betData.push(betContent);
            }
        });
        if (betData.length == 0) {
          //  layer.alert('请输入下注金额', {icon: 2});
            layer.alert('请输入下注内容', {icon: 2});
        }
        if (betData.length > 0) {
            conBetPage.show(betData);
            cancel();
        }
    };
    return {init: init, block: block, unBlock: unBlock, cancel: cancel};
})();
// 0-9 三行,可重复
var DW3 = (function () {
    var init = function () {
        currentEvent = DW3;
        $(".betarea2 .ball_list li:not(.li0)").unbind('click').bind("click", function () {
            if (lotteryBlock) {
                return;
            }
            $(this).toggleClass("danger"); // 快捷键
        });
        funBetBut = getBetContent;
        oddManager.cateCode();
        rebateChange = oddManager.cateCode;
    }, cancel = function () {

    }, block = function () {
        $(".betarea2 .ball_list li").removeClass("danger");
    }, unBlock = function () {

    }, getBetContent = function (money) {
        var n1 = [];
        $.each($('.ball_row1 .ball_list .danger'), function (n, o) {
            var li = $(o);
            n1.push(li.attr("data-value"));
        });
        var n2 = [];
        $.each($('.ball_row2 .ball_list .danger'), function (n, o) {
            var li = $(o);
            n2.push(li.attr("data-value"));
        });
        var n3 = [];
        $.each($('.ball_row3 .ball_list .danger'), function (n, o) {
            var li = $(o);
            n3.push(li.attr("data-value"));
        });
        var params = [n1, n2, n3];
        if (n1.length < 1 || n2.length < 1 || n3.length < 1) {
            layer.alert('请选择号码', {icon: 2});
            return;
        }
        var betData = dataHandle.DW3(params, money);
        if (betData.length > 0) {
            conBetPage.show(betData);
            block();
        }
    };
    return {init: init, block: block, unBlock: unBlock, cancel: cancel};
})();
//界面0-9两行选择,可重复
var DW2 = (function () {
    var init = function () {
        currentEvent = DW2;
        $(".betarea2 .ball_list li:not(.li0)").unbind('click').bind("click", function () {
            if (lotteryBlock) {
                return;
            }
            $(this).toggleClass("danger"); // 快捷键
        });
        funBetBut = getBetContent;
        oddManager.cateCode();
        rebateChange = oddManager.cateCode;
    }, cancel = function () {

    }, block = function () {
        $(".betarea2 .ball_list li").removeClass("danger");
    }, unBlock = function () {

    }, getBetContent = function (money) {
        var n1 = [];
        $.each($('.ball_row1 .ball_list .danger'), function (n, o) {
            var li = $(o);
            n1.push(li.attr("data-value"));
        });
        var n2 = [];
        $.each($('.ball_row2 .ball_list .danger'), function (n, o) {
            var li = $(o);
            n2.push(li.attr("data-value"));
        });

        var params = [n1, n2];
        if (n1.length < 1 || n2.length < 1) {
            layer.alert('请选择号码', {icon: 2});
            return;
        }
        var betData = dataHandle.DW2(params, money);
        if (betData.length > 0) {
            conBetPage.show(betData);
            block();
        }
    };
    return {init: init, block: block, unBlock: unBlock, cancel: cancel};
})();

var ZX = (function () {
    var init = function () {
        currentEvent = ZX;
        $('#data-ZX1 .data-focus').on("click", function () { // tab切换焦点
            var value = $(this).attr("data-value");
            if ($('#data-ZX2 .data-focus-' + value).hasClass("danger")
                || $('#data-ZX3 .data-focus-' + value).hasClass("danger")) {
                return;
            }
            if ($(this).hasClass("danger")) {
                $('#data-ZX2 .data-focus-' + value).find("span").removeClass("vis_hid"); // 隐藏
                $('#data-ZX3 .data-focus-' + value).find("span").removeClass("vis_hid"); // 隐藏
                $('#data-ZX1 .data-focus-' + value).removeClass("danger"); // 删除选中样式
            } else {
                $('#data-ZX2 .data-focus-' + value).find("span").addClass("vis_hid"); // 隐藏
                $('#data-ZX3 .data-focus-' + value).find("span").addClass("vis_hid"); // 隐藏
                $('#data-ZX1 .data-focus-' + value).addClass("danger"); // 删除选中样式
            }
        });
        $('#data-ZX1 tbody td').each(function () {
            var id = $(this).attr('data-playId');
            $(this).hover(function () {
                $('#data-ZX1 .data-focus-' + id).addClass('waring');
            }, function () {
                $('#data-ZX1 .data-focus-' + id).removeClass('waring');
            });
        });
        $('#data-ZX2 .data-focus').on("click", function () { // tab切换焦点
            var value = $(this).attr("data-value");
            if ($('#data-ZX1 .data-focus-' + value).hasClass("danger")
                || $('#data-ZX3 .data-focus-' + value).hasClass("danger")) {
                return;
            }
            if ($(this).hasClass("danger")) {
                $('#data-ZX1 .data-focus-' + value).find("span").removeClass("vis_hid"); // 隐藏
                $('#data-ZX3 .data-focus-' + value).find("span").removeClass("vis_hid"); // 隐藏
                $('#data-ZX2 .data-focus-' + value).removeClass("danger"); // 删除选中样式
            } else {
                $('#data-ZX1 .data-focus-' + value).find("span").addClass("vis_hid"); // 隐藏
                $('#data-ZX3 .data-focus-' + value).find("span").addClass("vis_hid"); // 隐藏
                $('#data-ZX2 .data-focus-' + value).addClass("danger"); // 删除选中样式
            }
        });
        $('#data-ZX2 tbody td').each(function () {
            var id = $(this).attr('data-playId');
            $(this).hover(function () {
                $('#data-ZX2 .data-focus-' + id).addClass('waring');
            }, function () {
                $('#data-ZX2 .data-focus-' + id).removeClass('waring');
            });
        });
        $('#data-ZX3 .data-focus').on("click", function () { // tab切换焦点
            var value = $(this).attr("data-value");
            if ($('#data-ZX2 .data-focus-' + value).hasClass("danger")
                || $('#data-ZX1 .data-focus-' + value).hasClass("danger")) {
                return;
            }
            if ($(this).hasClass("danger")) {
                $('#data-ZX2 .data-focus-' + value).find("span").removeClass("vis_hid"); // 隐藏
                $('#data-ZX1 .data-focus-' + value).find("span").removeClass("vis_hid"); // 隐藏
                $('#data-ZX3 .data-focus-' + value).removeClass("danger"); // 删除选中样式
            } else {
                $('#data-ZX2 .data-focus-' + value).find("span").addClass("vis_hid"); // 隐藏
                $('#data-ZX1 .data-focus-' + value).find("span").addClass("vis_hid"); // 隐藏
                $('#data-ZX3 .data-focus-' + value).addClass("danger"); // 删除选中样式
            }
        });
        $('#data-ZX3 tbody td').each(function () {
            var id = $(this).attr('data-playId');
            $(this).hover(function () {
                $('#data-ZX3 .data-focus-' + id).addClass('waring');
            }, function () {
                $('#data-ZX3 .data-focus-' + id).removeClass('waring');
            });
        });
        funBetBut = getBetContent;
    }, cancel = function () {

    }, block = function () {
        $(".betarea2 .ball_list li").removeClass("danger");
        $('.data-odds').html("0");
    }, unBlock = function () {

    }, getBetContent = function (money) {
        var n1 = [];
        $.each($('.ball_row1 .ball_list .danger'), function (n, o) {
            var li = $(o);
            n1.push(li.attr("data-value"));
        });
        var data = dataHandle.ZX1(n1, money);
        if (data && data.length > 0) {
            conBetPage.show(data);
            block();
        }

    };
    return {init: init, block: block, unBlock: unBlock, cancel: cancel};
})();
// 0-9一行跟据位数定赔率
var ZX1 = (function () {
    var init = function () {
        currentEvent = ZX1;
        function click() {
            var betNumber = $('.ball_list .danger').length;
            var playCate = $('#playCate');
            var minNumber = playCate.attr('data-minNumber');
            var number = playCate.attr('data-number');
            var odds = parseFloat(playCate.attr('data-odds'));
            if (betNumber < minNumber) {
                odds = 0;
            } else {
                odds = parseFloat((odds / cNxN(betNumber, number)).oddFixed(4));
            }
            if (!lotteryBlock) {
                $('.data-odds').html(odds);
            }
        }

        $('.ball_list li ').on("click", function () { // tab切换焦点
            if (lotteryBlock) {
                return;
            }
            $(this).toggleClass("danger"); // 快捷键
            click();
        });
        funBetBut = getBetContent;
        function onRebateChange() {
            oddManager.cateCode();
            click();
        }

        onRebateChange();
        rebateChange = onRebateChange;
    }, cancel = function () {

    }, block = function () {
        $(".betarea2 .ball_list li").removeClass("danger");
        $('.data-odds').html("0");
    }, unBlock = function () {

    }, getBetContent = function (money) {
        var n1 = [];
        $.each($('.ball_row1 .ball_list .danger'), function (n, o) {
            var li = $(o);
            n1.push(li.attr("data-value"));
        });
        var data = dataHandle.ZX1(n1, money);
        if (data && data.length > 0) {
            conBetPage.show(data);
            block();
        }

    };
    return {init: init, block: block, unBlock: unBlock, cancel: cancel};
})();
//直选2
var ZX2 = (function () {
    var init = function () { // 默认文本框模式页面事件
        currentEvent = ZX2;
        var playCate = $('#playCate');
        $('#data-ZX1 .data-focus').on("click", function () { // tab切换焦点
            if (lotteryBlock) {
                return;
            }
            var maxNums = playCate.attr('data-maxNumber');
            if (maxNums) {
                if ($('#data-ZX1 .danger').length + $('#data-ZX2 .danger').length >= maxNums) {
                    return;
                }
            }
            var value = $(this).attr("data-value");
            if ($('#data-ZX2 .data-focus-' + value).hasClass("danger")
                || $('#data-ZX3 .data-focus-' + value).hasClass("danger")) {
                return;
            }
            if ($(this).hasClass("danger")) {
                $('#data-ZX2 .data-focus-' + value).find("span").removeClass("vis_hid"); // 隐藏
                $('#data-ZX1 .data-focus-' + value).removeClass("danger"); // 删除选中样式
            } else {
                $('#data-ZX2 .data-focus-' + value).find("span").addClass("vis_hid"); // 隐藏
                $('#data-ZX1 .data-focus-' + value).addClass("danger"); // 删除选中样式
            }
        });
        $('#data-ZX2 .data-focus').on("click", function () { // tab切换焦点
            if (lotteryBlock) {
                return;
            }
            var maxNums = playCate.attr('data-maxNumber');
            if (maxNums) {
                if ($('#data-ZX1 .danger').length + $('#data-ZX2 .danger').length >= maxNums) {
                    return;
                }
            }

            var value = $(this).attr("data-value");
            if ($('#data-ZX1 .data-focus-' + value).hasClass("danger")
                || $('#data-ZX3 .data-focus-' + value).hasClass("danger")) {
                return;
            }
            if ($(this).hasClass("danger")) {
                $('#data-ZX1 .data-focus-' + value).find("span").removeClass("vis_hid"); // 隐藏
                $('#data-ZX2 .data-focus-' + value).removeClass("danger"); // 删除选中样式
            } else {
                $('#data-ZX1 .data-focus-' + value).find("span").addClass("vis_hid"); // 隐藏
                $('#data-ZX2 .data-focus-' + value).addClass("danger"); // 删除选中样式
            }
        });
        //menu.cateTab();
        funBetBut = getBetContent;
        focusEvent();
        oddManager.cateCode();
        rebateChange = oddManager.cateCode;
    }, focusEvent = function () { // 焦点事件
        $('#data-ZX1 tbody td').each(function () {
            var id = $(this).attr('data-playId');
            $(this).hover(function () {
                if (lotteryBlock) {
                    return;
                }
                $('#data-ZX1 .data-focus-' + id).addClass('waring');
            }, function () {
                $('#data-ZX1 .data-focus-' + id).removeClass('waring');
            });
        });
        $('#data-ZX2 tbody td').each(function () {
            var id = $(this).attr('data-playId');
            $(this).hover(function () {
                if (lotteryBlock) {
                    return;
                }
                $('#data-ZX2 .data-focus-' + id).addClass('waring');
            }, function () {
                $('#data-ZX2 .data-focus-' + id).removeClass('waring');
            });
        });
    }, cancel = function () {
        $('.danger').removeClass("danger");
        $('.bet-input').val('');
        $('.vis_hid').removeClass("vis_hid"); // 删除隐藏,胆拖
    }, block = function () { // 封盘操作
        $(".lm_name").html('--');
        $(".lm_pl").html('--');
        $(".danger").removeClass('danger');
        $('.vis_hid').removeClass("vis_hid"); // 删除隐藏,胆拖
        $(".data-bet").attr("readonly", "readonly");
    }, unBlock = function () { // 开盘操作
        $('.vis_hid').removeClass("vis_hid"); // 删除隐藏,胆拖
        $('.lm_name').html($('#playCate').attr('data-catename'));
        $('.lm_pl').html($('#playCate').attr('data-odds'));
    }, getBetContent = function (money) {
        var betData = [];
        var n1 = [];
        $.each($('#data-ZX1 .danger'), function (n, o) {
            var li = $(o);
            n1.push(li.attr("data-value"));
        });
        var n2 = [];
        $.each($('#data-ZX2 .danger'), function (n, o) {
            var li = $(o);
            n2.push(li.attr("data-value"));
        });
        var params = [n1, n2];
        if (n1.length < 1 || n2.length < 1) {
            layer.alert('请选择号码', {icon: 2});
            return;
        }
        if ((n1.length * n2.length) > betMaxCount) {
            layer.alert('组合注数不能超过' + betMaxCount + '注', {icon: 2});
            return false;
        }
        betData = dataHandle.DW2(params, money);
        if (betData.length > 0) {
            conBetPage.show(betData);
            cancel();
        }
    };
    return {init: init, block: block, unBlock: unBlock, cancel: cancel};
})();
//直选3
var ZX3 = (function () {
    var init = function () { // 默认文本框模式页面事件
        currentEvent = ZX3;
        var playCate = $('#playCate');
        $('#data-ZX1 .data-focus').on("click", function () { // tab切换焦点
            if (lotteryBlock) {
                return;
            }
            var maxNums = playCate.attr('data-maxNumber');
            if (maxNums) {
                if ($('#data-ZX1 .danger').length + $('#data-ZX2 .danger').length + $('#data-ZX3 .danger').length >= maxNums) {
                    return;
                }
            }
            var value = $(this).attr("data-value");
            if ($('#data-ZX2 .data-focus-' + value).hasClass("danger")
                || $('#data-ZX3 .data-focus-' + value).hasClass("danger")) {
                return;
            }
            if ($(this).hasClass("danger")) {
                $('#data-ZX2 .data-focus-' + value).find("span").removeClass("vis_hid"); // 隐藏
                $('#data-ZX3 .data-focus-' + value).find("span").removeClass("vis_hid"); // 隐藏
                $('#data-ZX1 .data-focus-' + value).removeClass("danger"); // 删除选中样式
            } else {
                $('#data-ZX2 .data-focus-' + value).find("span").addClass("vis_hid"); // 隐藏
                $('#data-ZX3 .data-focus-' + value).find("span").addClass("vis_hid"); // 隐藏
                $('#data-ZX1 .data-focus-' + value).addClass("danger"); // 删除选中样式
            }
        });
        $('#data-ZX2 .data-focus').on("click", function () { // tab切换焦点
            if (lotteryBlock) {
                return;
            }
            var maxNums = playCate.attr('data-maxNumber');
            if (maxNums) {
                if ($('#data-ZX1 .danger').length + $('#data-ZX2 .danger').length + $('#data-ZX3 .danger').length >= maxNums) {
                    return;
                }
            }
            var value = $(this).attr("data-value");
            if ($('#data-ZX1 .data-focus-' + value).hasClass("danger")
                || $('#data-ZX3 .data-focus-' + value).hasClass("danger")) {
                return;
            }
            if ($(this).hasClass("danger")) {
                $('#data-ZX1 .data-focus-' + value).find("span").removeClass("vis_hid"); // 隐藏
                $('#data-ZX3 .data-focus-' + value).find("span").removeClass("vis_hid"); // 隐藏
                $('#data-ZX2 .data-focus-' + value).removeClass("danger"); // 删除选中样式
            } else {
                $('#data-ZX1 .data-focus-' + value).find("span").addClass("vis_hid"); // 隐藏
                $('#data-ZX3 .data-focus-' + value).find("span").addClass("vis_hid"); // 隐藏
                $('#data-ZX2 .data-focus-' + value).addClass("danger"); // 删除选中样式
            }
        });
        $('#data-ZX3 .data-focus').on("click", function () { // tab切换焦点
            if (lotteryBlock) {
                return;
            }
            var maxNums = playCate.attr('data-maxNumber');
            if (maxNums) {
                if ($('#data-ZX1 .danger').length + $('#data-ZX2 .danger').length + $('#data-ZX3 .danger').length >= maxNums) {
                    return;
                }
            }
            var value = $(this).attr("data-value");
            if ($('#data-ZX2 .data-focus-' + value).hasClass("danger")
                || $('#data-ZX1 .data-focus-' + value).hasClass("danger")) {
                return;
            }
            if ($(this).hasClass("danger")) {
                $('#data-ZX2 .data-focus-' + value).find("span").removeClass("vis_hid"); // 隐藏
                $('#data-ZX1 .data-focus-' + value).find("span").removeClass("vis_hid"); // 隐藏
                $('#data-ZX3 .data-focus-' + value).removeClass("danger"); // 删除选中样式
            } else {
                $('#data-ZX2 .data-focus-' + value).find("span").addClass("vis_hid"); // 隐藏
                $('#data-ZX1 .data-focus-' + value).find("span").addClass("vis_hid"); // 隐藏
                $('#data-ZX3 .data-focus-' + value).addClass("danger"); // 删除选中样式
            }
        });

        //menu.cateTab();
        funBetBut = getBetContent;
        focusEvent();
        oddManager.cateCode();
        rebateChange = oddManager.cateCode;
    }, focusEvent = function () { // 焦点事件
        $('#data-ZX1 tbody td').each(function () {
            var id = $(this).attr('data-playId');
            $(this).hover(function () {
                if (lotteryBlock) {
                    return;
                }
                $('#data-ZX1 .data-focus-' + id).addClass('waring');
            }, function () {
                $('#data-ZX1 .data-focus-' + id).removeClass('waring');
            });
        });
        $('#data-ZX2 tbody td').each(function () {
            var id = $(this).attr('data-playId');
            $(this).hover(function () {
                if (lotteryBlock) {
                    return;
                }
                $('#data-ZX2 .data-focus-' + id).addClass('waring');
            }, function () {
                $('#data-ZX2 .data-focus-' + id).removeClass('waring');
            });
        });
        $('#data-ZX3 tbody td').each(function () {
            var id = $(this).attr('data-playId');
            $(this).hover(function () {
                if (lotteryBlock) {
                    return;
                }
                $('#data-ZX3 .data-focus-' + id).addClass('waring');
            }, function () {
                $('#data-ZX3 .data-focus-' + id).removeClass('waring');
            });
        });
    }, cancel = function () {
        $('.danger').removeClass("danger");
        $('.bet-input').val('');
        $('.vis_hid').removeClass("vis_hid"); // 删除隐藏,胆拖
    }, block = function () { // 封盘操作
        $(".lm_name").html('--');
        $(".lm_pl").html('--');
        $(".danger").removeClass('danger');
        // $(".data-bet").attr("readonly","readonly");
    }, unBlock = function () { // 开盘操作
        $('.lm_name').html($('#playCate').attr('data-catename'));
        $('.lm_pl').html($('#playCate').attr('data-odds'));
    }, getBetContent = function (money) {
        var betData = [];
        var n1 = [];
        $.each($('#data-ZX1 .danger'), function (n, o) {
            var li = $(o);
            n1.push(li.attr("data-value"));
        });
        var n2 = [];
        $.each($('#data-ZX2 .danger'), function (n, o) {
            var li = $(o);
            n2.push(li.attr("data-value"));
        });
        var n3 = [];
        $.each($('#data-ZX3 .danger'), function (n, o) {
            var li = $(o);
            n3.push(li.attr("data-value"));
        });
        var params = [n1, n2, n3];
        if (n1.length < 1 || n2.length < 1 || n3.length < 1) {
            layer.alert('请选择号码', {icon: 2});
            return;
        }
        if ((n1.length * n2.length * n3.length) > betMaxCount) {
            layer.alert('组合注数不能超过' + betMaxCount + '注', {icon: 2});
            return false;
        }
        betData = dataHandle.DW3(params, money);
        if (betData.length > 0) {
            conBetPage.show(betData);
            cancel();
        }
    };
    return {init: init, block: block, unBlock: unBlock, cancel: cancel};
})();
//
var cNxNTable = (function () {
    var init = function () { // 默认文本框模式页面事件
        currentEvent = cNxNTable;
        $('.data-focus').on("click", function () { // 选中事件
            if (lotteryBlock) {
                return;
            }
            var playId = $(this).attr("data-playId");
            if ($(this).hasClass("danger")) {
                $('.data-focus-' + playId).removeClass("danger"); // 删除选中样式
                $('#' + playId).val(''); // 设置金额
            } else {

                var playCate = $('#playCate');
                var maxNumber = Number(playCate.attr("data-maxNumber"));
                if (($(".danger.data-focus").length) >= maxNumber) {
                    layer.msg('最多只能选择' + maxNumber + "位");
                    return;
                }
                $('.data-focus-' + playId).addClass("danger");// 添加选中样式
                var money = $('#quickMoney').val();
                $('#' + playId).val(money); // 设置金额
            }
        });
        //menu.cateTab();
        funBetBut = getBetContent;
        focusEvent();
        oddManager.cateCode();
        rebateChange = oddManager.cateCode;
    }, focusEvent = function () { // 焦点事件
        $('.table-bet tbody td').each(function () {
            var id = $(this).attr('data-playId');
            $(this).hover(function () {
                if (lotteryBlock) {
                    return;
                }
                $('.data-focus-' + id).addClass('waring');
            }, function () {
                $('.data-focus-' + id).removeClass('waring');
            });
        });
    }, cancel = function () {
        $(".data-bet").val('');
        $(".danger").removeClass('danger');
    }, block = function () { // 封盘操作
        $(".lm_name").html('--');
        $(".lm_pl").html('--');
        $(".danger").removeClass('danger');
    }, unBlock = function () { // 开盘操作
        $('.lm_name').html($('#playCate').attr('data-catename'));
        $('.lm_pl').html($('#playCate').attr('data-odds'));
    }, getBetContent = function (money) {
        var betData = [];
        $.each($('.data-focus.danger'), function (n, o) {
            var li = $(o);
            betData.push(li.attr("data-value"));
        });
        var betData = dataHandle.cNxN(betData, money);
        if (betData.length > 0) {
            conBetPage.show(betData);
            cancel();
        }
    };
    return {init: init, block: block, unBlock: unBlock, cancel: cancel};
})();

//连肖
var LX = (function () {
    var init = function () { // 默认文本框模式页面事件
        currentEvent = LX;
        $('.data-focus').on("click", function () { // 选中事件
            if (lotteryBlock) {
                return
            }
            var value = $(this).attr("data-playid");
            if ($(this).hasClass("danger")) {
                $('.data-focus-' + value).removeClass("danger"); // 删除选中样式
            } else {
                var playCate = $('#playCate');
                var maxNumber = Number(playCate.attr("data-maxNumber"));
                if (($(".danger.data-chbox").length) >= maxNumber) {
                    layer.msg('最多只能选择' + maxNumber + "位");
                    return;
                }
                $('.data-focus-' + value).addClass("danger");// 添加选中样式
            }
        });
        //menu.cateTab();
        funBetBut = getBetContent;
        focusEvent();
        oddManager.text();
        rebateChange = oddManager.text;
    }, focusEvent = function () { // 焦点事件
        $('.table-bet tbody td').each(function () {
            var id = $(this).attr('data-playId');
            $(this).hover(function () {
                if (lotteryBlock) {
                    return;
                }
                $('.data-focus-' + id).addClass('waring');
            }, function () {
                $('.data-focus-' + id).removeClass('waring');
            });
        });
    }, cancel = function () {
        $(".data-bet").val('');
        $(".danger").removeClass('danger');
    }, block = function () { // 封盘操作
        $(".data-block").html('--');
        $(".data-bet").val('');
        $(".danger").removeClass('danger');
        $(".data-bet").attr("readonly", "readonly");
    }, unBlock = function () { // 开盘操作
        $.each($(".data-block"), function (n, o) {
            var obj = $(o);
            var odds = obj.attr("data-odds");
            obj.html(odds);
        });
        $(".data-bet").removeAttr("readonly");
    }, getBetContent = function (money) {
        var chboxs = $(".danger.data-chbox");
        var numArray = [];
        var oddsArray = [];
        $.each(chboxs, function (n, o) {
            numArray.push($(o).attr("data-value"));
            oddsArray.push($(o).attr("data-odds"));
        });
        var playCate = $("#playCate");
        var isMaxVaue = playCate.attr("data-oddMax");
        var cateName = playCate.attr("data-cateName");
        var cateCode = playCate.attr("data-code");
        var number = Number(playCate.attr("data-number"));
        var maxNumber = Number(playCate.attr("data-maxNumber"));
        var minNumber = Number(playCate.attr("data-minNumber"));
        if (numArray.length < minNumber) {
            layer.alert('选择个数不能少于' + minNumber + '位', {icon: 2});
            return;
        }
        if (numArray.length > maxNumber) {
            layer.alert('选择个数不能大于' + maxNumber + '位', {icon: 2});
            return;
        }
        var betData = [];
        var len = numArray.length;
        var arrayIndexs = combine(len, number); // 获取组合数组下标
        for (var i = 0; i < arrayIndexs.length; i++) {
            var betInfo = getArrayByIndexsToStr(numArray, arrayIndexs[i]);
            var odds = "";
            var rateArr = getArrayByIndexs(oddsArray, arrayIndexs[i]);
            if (isMaxVaue == 1) {
                odds = getMaxValue(rateArr);
            } else {
                odds = getMinValue(rateArr);
            }
            var kyje = (Number(odds) - 1) * money;
            var list = {
                "code": cateCode,
                "betInfo": betInfo,
                "odds": odds,
                "money": money,
                "kyje": kyje.toFixed(2),
                "cateName": cateName
            };
            betData.push(list);
        }
        if (betData.length > 0) {
            conBetPage.show(betData);
            cancel();
        }
    };
    return {init: init, block: block, unBlock: unBlock, cancel: cancel};
})();

//合肖
var HX = (function () {
    var init = function () { // 默认文本框模式页面事件
        currentEvent = HX;
        $(".data-focus").click(function () { // 选择事件
            if (lotteryBlock) {
                return
            }
            var value = $(this).attr("data-playId");
            if ($(this).hasClass("danger")) {
                $('.data-focus-' + value).removeClass("danger"); // 删除选中样式
            } else {
                var playCate = $('#playCate');
                var maxNumber = Number(playCate.attr("data-maxNumber"));
                if (($(".danger.data-chbox").length) >= maxNumber) {
                    layer.msg('最多只能选择' + maxNumber + "位");
                    return;
                }

                $('.data-focus-' + value).addClass("danger");// 添加选中样式
            }

            var showOdds = dataHandle.heXiao_odds();
            $(".lm_pl").html(showOdds);

        });
        //menu.cateTab();
        funBetBut = getBetContent;
        focusEvent();
        oddManager.heXiao();
        rebateChange = oddManager.heXiao;
    }, focusEvent = function () { // 焦点事件
        $('.table-bet tbody td').each(function () {
            var id = $(this).attr('data-playId');
            $(this).hover(function () {
                if (lotteryBlock) {
                    return;
                }
                $('.data-focus-' + id).addClass('waring');
            }, function () {
                $('.data-focus-' + id).removeClass('waring');
            });
        });
    }, cancel = function () {
        $(".lm_pl").html("0");
        $(".danger").removeClass('danger');
    }, block = function () { // 封盘操作
        $(".lm_name").html('--');
        $(".lm_pl").html('--');
        $(".danger").removeClass('danger');
    }, unBlock = function () { // 开盘操作
        $('.lm_name').html($('#playCate').attr('data-catename'));
        $('.lm_pl').html($('#playCate').attr('data-odds'));
    }, getBetContent = function (money) {
        var count = 0;
        var betInfo = '';
        $.each($(".table-bet .danger.data-chbox"), function (n, o) {
            var obj = $(o);
            betInfo += obj.attr("data-value") + gameConstants.BET_SEPARATOR;
            count++;
        });
        if (betInfo == "") {
            layer.alert('请选择生肖', {icon: 2});
            return;
        }
        betInfo = betInfo.substring(0, betInfo.length - 1);
        var playCate = $("#playCate");
        var rate = parseFloat(dataHandle.heXiao_odds());
        var kyje = (rate - 1) * money;
        var list = {
            "code": playCate.attr("data-code"),
            "betInfo": betInfo,
            "odds": rate,
            "money": money,
            "kyje": kyje.toFixed(2),
            "cateName": playCate.attr("data-cateName")
        };
        var betData = [];
        betData.push(list);
        if (betData.length > 0) {
            conBetPage.show(betData);
            cancel();
        }
    };
    return {init: init, block: block, unBlock: unBlock, cancel: cancel};
})();

//连码直选
var LMZX = (function () {
    var init = function () { // 默认文本框模式页面事件
        currentEvent = LX;
        $('.data-focus').on("click", function () { // 选中事件
            if (lotteryBlock) {
                return
            }
            var value = $(this).attr("data-playid");
            if ($(this).hasClass("danger")) {
                $('.data-focus-' + value).removeClass("danger"); // 删除选中样式
            } else {
                var playCate = $('#playCate');
                var maxNumber = Number(playCate.attr("data-maxNumber"));
                if (($(".danger.data-chbox").length) >= maxNumber) {
                    layer.msg('最多只能选择' + maxNumber + "位");
                    return;
                }
                var playCate2 = $('input:radio[name="rtype"]:checked');
                maxNumber = Number(playCate2.attr('data-maxNumber'));
                if (($(".danger.data-chbox").length) >= maxNumber) {
                    layer.msg('最多只能选择' + maxNumber + "位");
                    return;
                }
                $('.data-focus-' + value).addClass("danger");// 添加选中样式
            }
        });
        //menu.cateTab();
        funBetBut = getBetContent;
        focusEvent();
        oddManager.cateCode();
        rebateChange = oddManager.cateCode;
    }, focusEvent = function () { // 焦点事件
        $('.table-bet tbody td').each(function () {
            var id = $(this).attr('data-playId');
            $(this).hover(function () {
                if (lotteryBlock) {
                    return;
                }
                $('.data-focus-' + id).addClass('waring');
            }, function () {
                $('.data-focus-' + id).removeClass('waring');
            });
        });
    }, cancel = function () {
        $(".data-bet").val('');
        $(".danger").removeClass('danger');
    }, block = function () { // 封盘操作
        $(".data-block").html('--');
        $(".data-bet").val('');
        $(".danger").removeClass('danger');
        $(".data-bet").attr("readonly", "readonly");
    }, unBlock = function () { // 开盘操作
        $.each($(".data-block"), function (n, o) {
            var obj = $(o);
            var odds = obj.attr("data-odds");
            obj.html(odds);
        });
        $(".data-bet").removeAttr("readonly");
    }, getBetContent = function (money) {
        var betNums = [];
        $.each($(".table-bet .danger.data-chbox"), function (n, o) {
            var obj = $(o);
            betNums.push(obj.attr("data-value"));
        });
        var playCate = $('input:radio[name="rtype"]:checked');
        var number = playCate.attr("data-number");
        var odds = playCate.attr("data-odds");
        if (betNums.length < number) {
            layer.alert('号码个数不能少于' + number + '位', {icon: 2});
            return false;
        }

        var arrayIndexs = combine(betNums.length, number); // 获取组合数组下标
        if (arrayIndexs.length > betMaxCount) {
            layer.alert('组合注数不能超过' + betMaxCount + '注', {icon: 2});
            return false;
        }
        var kyodds = 0;
        if (odds.indexOf(gameConstants.BET_SEPARATOR) > 0) {
            kyodds = Number(odds.split(gameConstants.BET_SEPARATOR)[0]);
        } else {
            kyodds = Number(odds);
        }
        var kyje = (kyodds - 1) * money;
        var betData = [];
        for (var i = 0; i < arrayIndexs.length; i++) {
            // 加上胆码
            var betInfo = getArrayByIndexsToStr(betNums, arrayIndexs[i]);
            var list = {
                "code": playCate.attr("data-code"),
                "betInfo": betInfo,
                "odds": odds,
                "money": money,
                "kyje": kyje.toFixed(2),
                "cateName": playCate.attr("data-cateName")
            };
            betData.push(list);
        }
        if (betData.length > 0) {
            conBetPage.show(betData);
            cancel();
        }
    };
    return {init: init, block: block, unBlock: unBlock, cancel: cancel};
})();

//肖尾串号
var SXWS = (function () {
    var init = function () { // 默认文本框模式页面事件
        currentEvent = SXWS;
        $('.data-SX').on("click", function () { // 选中事件
            if (lotteryBlock) {
                return
            }
            $('.data-SX td').each(function () {
                var value = $(this).attr("data-value");
                $(this).removeClass("danger");
                $(this).find("span").removeAttr('class');

                var wsTd = $('.data-WS .data-focus-' + value);
                var span = wsTd.find("span");
                if (span.hasClass("vis_hid")) {
                    wsTd.addClass("danger");
                    span.removeAttr('class');
                    span.addClass(span.attr("data-css"));
                }
            });
            $(this).find('.data-focus').each(function () {
                var value = $(this).attr("data-value");
                $(this).addClass("danger");
                var span = $(this).find("span");
                span.addClass(span.attr("data-css"));
                var wsTd = $('.data-WS .data-focus-' + value);
                if (wsTd.hasClass("danger")) {
                    wsTd.removeClass("danger");
                    wsTd.find("span").addClass("vis_hid");
                }
            });

        });
        $('.data-WS').on("click", function () { // 选中事件
            if (lotteryBlock) {
                return
            }
            $('.data-WS td').each(function () {
                var value = $(this).attr("data-value");
                $(this).removeClass("danger");
                $(this).find("span").removeAttr('class');

                var wsTd = $('.data-SX .data-focus-' + value);
                var span = wsTd.find("span");
                if (span.hasClass("vis_hid")) {
                    wsTd.addClass("danger");
                    span.removeAttr('class');
                    span.addClass(span.attr("data-css"));
                }
            });
            $(this).find('.data-focus').each(function () {
                var value = $(this).attr("data-value");
                $(this).addClass("danger");
                var span = $(this).find("span");
                span.addClass(span.attr("data-css"));
                var wsTd = $('.data-SX .data-focus-' + value);
                if (wsTd.hasClass("danger")) {
                    wsTd.removeClass("danger");
                    wsTd.find("span").addClass("vis_hid");
                }
            });

        });
        //menu.cateTab();
        funBetBut = getBetContent;
        focusEvent();
    }, focusEvent = function () { // 焦点事件
    }, cancel = function () {
        $('.vis_hid').removeClass('vis_hid');
        $('.danger').removeClass("danger");
        $('.data-SX').attr('data-c', 0); // 胆拖生肖事件
        $('.data-SX td').find("span").each(function () {// 胆拖生肖事件
            $(this).removeClass($(this).attr("data-css"));
        });
        $('.data-WS td').find("span").each(function () {// 胆拖生肖事件
            $(this).removeClass($(this).attr("data-css"));
        });
    }, block = function () { // 封盘操作
        $(".data-block").html('--');
        $(".data-bet").val('');
        $(".danger").removeClass('danger');
        $(".data-bet").attr("readonly", "readonly");
    }, unBlock = function () { // 开盘操作
        $.each($(".data-block"), function (n, o) {
            var obj = $(o);
            var odds = obj.attr("data-odds");
            obj.html(odds);
        });
        $(".data-bet").removeAttr("readonly");
    }, getBetContent = function (money) {
        var betData = [];
        var dms = []; // 胆码
        var tms = []; // 拖码
        var playCate = $('input:radio[name="rtype"]:checked');
        var number = playCate.attr("data-number");
        $.each($("#data-DM .danger"), function (n, o) { //
            dms.push($(o).attr('data-value'));
        });
        $.each($("#data-TM .danger"), function (n, o) { //
            tms.push($(o).attr('data-value'));
        });
        if (dms.length < 1) {
            layer.alert('请选择主肖', {icon: 2});
            return false;
        }
        if (tms.length < 1) {
            layer.alert('请选择尾数', {icon: 2});
            return false;
        }
        tms = inANotInB(tms, dms); // 去掉重复
        var cateName = playCate.attr("data-cateName");
        var cateCode = playCate.attr("data-code");
        var number = Number(playCate.attr("data-number"));//个数
        var odds = playCate.attr("data-odds"); // 赔率

        var kyodds = 0;
        if (odds.indexOf(gameConstants.BET_SEPARATOR) > 0) {
            kyodds = Number(odds.split(gameConstants.BET_SEPARATOR)[0]);
        } else {
            kyodds = Number(odds);
        }
        var kyje = (kyodds - 1) * money;

        var arrayIndexs = combine(tms.length, number - 1); // 获取组合数组下标
        for (var i = 0; i < arrayIndexs.length; i++) {
            var dns = getArrayByIndexsToStr(tms, arrayIndexs[i]);
            for (var j = 0; j < dms.length; j++) {
                // 加上串1值
                var betInfo = dms[j] + gameConstants.BET_SEPARATOR + dns;
                var list = {
                    "code": cateCode,
                    "betInfo": betInfo,
                    "odds": odds,
                    "money": money,
                    "kyje": kyje.toFixed(2),
                    "cateName": cateName
                };
                betData.push(list);
            }
        }
        if (betData.length > 0) {
            conBetPage.show(betData);
            cancel();
        }
    };
    return {init: init, block: block, unBlock: unBlock, cancel: cancel};
})();

//胆拖色波
var DTSB = (function () {
    var init = function () { // 默认文本框模式页面事件
        currentEvent = DTSB;
        $('#data-DM .data-focus').on("click", function () { // 胆码选中事件
            if (lotteryBlock) {
                return
            }
            var value = $(this).attr("data-value");
            var playCate = $('input:radio[name="rtype"]:checked');
            var number = playCate.attr('data-number');
            if ($(this).hasClass("danger")) {
                var span = $('#data-TM .data-focus-' + value).find("span");
                if (span.hasClass("vis_hid")) {
                    span.removeClass("vis_hid"); // 隐藏
                    var css = $('#data-TM .data-checked').attr("data-css");
                    if (span.hasClass(css)) {
                        span.parent().addClass("danger");
                    }
                }
                $('#data-DM .data-focus-' + value).removeClass("danger"); // 删除选中样式
            } else {
                var dmNum = $('#data-DM .danger').length;
                if (dmNum < (number - 1)) { // 胆码个数要小于number-1
                    var span = $('#data-TM .data-focus-' + value).find("span");
                    span.addClass("vis_hid"); // 隐藏
                    span.parent().removeClass("danger");
                    $('#data-DM .data-focus-' + value).addClass("danger");// 添加选中样式
                }
            }
        });
        $('#data-TM .data-SB td').on("click", function () {
            if (lotteryBlock) {
                return
            }
            $('#data-TM .data-SB td').removeClass("data-checked"); // 删除所有选中
            $(this).addClass("data-checked");
            $('#data-TM .data-focus').removeClass("danger");
            var cla = $(this).attr("data-css");
            $('#data-TM .data-focus .' + cla).each(function () {
                if (!$(this).hasClass("vis_hid")) {
                    $(this).parent().addClass("danger");
                }
            });

        });
        //menu.cateTab();
        funBetBut = getBetContent;
        focusEvent();
    }, focusEvent = function () { // 焦点事件
    }, cancel = function () {
        $('.vis_hid').removeClass('vis_hid');
        $('.danger').removeClass("danger");
        $('.data-SX').attr('data-c', 0); // 胆拖生肖事件
        $('.data-SX td').find("span").each(function () {// 胆拖生肖事件
            $(this).removeClass($(this).attr("data-css"));
        });
        $('.data-WS td').find("span").each(function () {// 胆拖生肖事件
            $(this).removeClass($(this).attr("data-css"));
        });
    }, block = function () { // 封盘操作
        $(".data-block").html('--');
        $(".data-bet").val('');
        $(".danger").removeClass('danger');
        $(".data-bet").attr("readonly", "readonly");
    }, unBlock = function () { // 开盘操作
        $.each($(".data-block"), function (n, o) {
            var obj = $(o);
            var odds = obj.attr("data-odds");
            obj.html(odds);
        });
        $(".data-bet").removeAttr("readonly");
    }, getBetContent = function (money) {
        var betData = [];
        betData = dataHandle.ZX(money)
        if (betData.length > 0) {
            conBetPage.show(betData);
            cancel();
        }
    };
    return {init: init, block: block, unBlock: unBlock, cancel: cancel};
})();

//胆拖
var DTM = (function () {
    var init = function () { // 默认文本框模式页面事件
        currentEvent = DTM;
        $('#data-DM .data-focus').on("click", function () { // 胆码选中事件
            if (lotteryBlock) {
                return
            }
            var value = $(this).attr("data-value");
            var playCate = $('input:radio[name="rtype"]:checked');
            var number = playCate.attr('data-number');
            if ($('#data-TM .data-focus-' + value).hasClass("danger")) {// 拖码是否已选
                return;
            }
            if ($(this).hasClass("danger")) {
                $('#data-TM .data-focus-' + value).find("span").removeClass("vis_hid"); // 隐藏
                $('#data-DM .data-focus-' + value).removeClass("danger"); // 删除选中样式
            } else {
                var dmNum = $('#data-DM .danger').length;
                if (dmNum < (number - 1)) { // 胆码个数要小于number-1
                    $('#data-TM .data-focus-' + value).find("span").addClass("vis_hid"); // 隐藏
                    $('#data-DM .data-focus-' + value).addClass("danger");// 添加选中样式
                }
            }
        });
        $('#data-TM .data-focus').on("click", function () { // 拖码选中事件
            if (lotteryBlock) {
                return
            }
            var value = $(this).attr("data-value");
            if ($('#data-DM .data-focus-' + value).hasClass("danger")) { // 胆码是否已选
                return;
            }
            var value = $(this).attr("data-value");
            if ($(this).hasClass("danger")) {
                $('#data-DM .data-focus-' + value).find("span").removeClass("vis_hid"); // 隐藏
                $('#data-TM .data-focus-' + value).removeClass("danger"); // 删除选中样式
            } else {
                $('#data-DM .data-focus-' + value).find("span").addClass("vis_hid"); // 隐藏
                $('#data-TM .data-focus-' + value).addClass("danger");// 添加选中样式

            }
        });
        //menu.cateTab();
        funBetBut = getBetContent;
        focusEvent();
    }, focusEvent = function () { // 焦点事件
    }, cancel = function () {
        $('.danger').removeClass("danger");
        $('.data-SX').attr('data-c', 0); // 胆拖生肖事件
        $('.data-SX td').find("span").each(function () {// 胆拖生肖事件
            $(this).removeClass($(this).attr("data-css"));
        });
        $('.data-WS td').find("span").each(function () {// 胆拖生肖事件
            $(this).removeClass($(this).attr("data-css"));
        });
        $('.vis_hid').removeClass("vis_hid"); // 删除隐藏,胆拖
    }, block = function () { // 封盘操作
        $(".data-block").html('--');
        $(".data-bet").val('');
        $(".danger").removeClass('danger');
        $(".data-bet").attr("readonly", "readonly");
    }, unBlock = function () { // 开盘操作
        $.each($(".data-block"), function (n, o) {
            var obj = $(o);
            var odds = obj.attr("data-odds");
            obj.html(odds);
        });
        $(".data-bet").removeAttr("readonly");
    }, getBetContent = function (money) {
        var betData = [];
        var dms = []; // 胆码
        var tms = []; // 拖码
        var playCate = $('input:radio[name="rtype"]:checked');
        var number = playCate.attr("data-number");
        $.each($("#data-DM .danger"), function (n, o) { //
            dms.push($(o).attr('data-value'));
        });
        $.each($("#data-TM .danger"), function (n, o) { //
            tms.push($(o).attr('data-value'));
        });
        if (dms.length < 1) {
            layer.alert('请选择胆码', {icon: 2});
            return false;
        }
        if (dms.length >= number) {
            layer.alert('胆码个数不能超过' + (number - 1) + '位', {icon: 2});
            return false;
        }
        tms = inANotInB(tms, dms); // 去掉重复
        if (tms.length < 1) {
            layer.alert('请选择拖码', {icon: 2});
            return false;
        }
        if ((dms.length + tms.length) < number) {
            layer.alert('至少选择' + number + '位', {icon: 2});
            return false;
        }
        var cateName = playCate.attr("data-cateName");
        var cateCode = playCate.attr("data-code");
        var odds = playCate.attr("data-odds"); // 赔率
        var dmstr = dms.join(gameConstants.BET_SEPARATOR) + gameConstants.BET_SEPARATOR;
        betData = [];
        var len = tms.length;
        var arrayIndexs = combine(len, number - dms.length); // 获取组合数组下标
        if (arrayIndexs.length > betMaxCount) {
            layer.alert('组合注数不能超过' + betMaxCount + '注', {icon: 2});
            return false;
        }
        var kyodds = 0;
        if (odds.indexOf(gameConstants.BET_SEPARATOR) > 0) {
            kyodds = Number(odds.split(gameConstants.BET_SEPARATOR)[0]);
        } else {
            kyodds = Number(odds);
        }
        var kyje = (kyodds - 1) * money;
        for (var i = 0; i < arrayIndexs.length; i++) {
            // 加上胆码
            var betInfo = dmstr + getArrayByIndexsToStr(tms, arrayIndexs[i]);
            var list = {
                "code": cateCode,
                "betInfo": betInfo,
                "odds": odds,
                "money": money,
                "kyje": kyje.toFixed(2),
                "cateName": cateName
            };
            betData.push(list);
        }
        if (betData.length > 0) {
            conBetPage.show(betData);
            cancel();
        }
    };
    return {init: init, block: block, unBlock: unBlock, cancel: cancel};
})();

//
var DTSX = (function () {
    var init = function () { // 默认文本框模式页面事件
        currentEvent = DTSX;
        $('#data-DM .data-focus').on("click", function () { // 胆码选中事件
            if (lotteryBlock) {
                return;
            }
            var value = $(this).attr("data-value");
            var playCate = $('input:radio[name="rtype"]:checked');
            var number = playCate.attr('data-number');
            if ($('#data-TM .data-focus-' + value).hasClass("danger")) {// 拖码是否已选
                return;
            }
            if ($(this).hasClass("danger")) {
                $('#data-TM .data-focus-' + value).find("span").removeClass("vis_hid"); // 隐藏
                $('#data-DM .data-focus-' + value).removeClass("danger"); // 删除选中样式
            } else {
                var dmNum = $('#data-DM .danger').length;
                if (dmNum < (number - 1)) { // 胆码个数要小于number-1
                    $('#data-TM .data-focus-' + value).find("span").addClass("vis_hid"); // 隐藏
                    $('#data-DM .data-focus-' + value).addClass("danger");// 添加选中样式
                }
            }
        });
        $('#data-TM .data-focus').on("click", function () { // 拖码选中事件
            if (lotteryBlock) {
                return;
            }
            var value = $(this).attr("data-value");
            if ($('#data-DM .data-focus-' + value).hasClass("danger")) { // 胆码是否已选
                return;
            }
            var value = $(this).attr("data-value");
            if ($(this).hasClass("danger")) {
                $('#data-DM .data-focus-' + value).find("span").removeClass("vis_hid"); // 隐藏
                $('#data-TM .data-focus-' + value).removeClass("danger"); // 删除选中样式
            } else {
                $('#data-DM .data-focus-' + value).find("span").addClass("vis_hid"); // 隐藏
                $('#data-TM .data-focus-' + value).addClass("danger");// 添加选中样式

            }
        });
        //menu.cateTab();
        funBetBut = getBetContent;
        focusEvent();
    }, focusEvent = function () { // 焦点事件

    }, cancel = function () {
        $('.vis_hid').removeClass('vis_hid')
        $(".data-bet").val('');
        $(".danger").removeClass('danger');
    }, block = function () { // 封盘操作
        $(".data-block").html('--');
        $(".data-bet").val('');
        $(".danger").removeClass('danger');
        $(".data-bet").attr("readonly", "readonly");
    }, unBlock = function () { // 开盘操作
        $.each($(".data-block"), function (n, o) {
            var obj = $(o);
            var odds = obj.attr("data-odds");
            obj.html(odds);
        });
        $(".data-bet").removeAttr("readonly");
    }, getBetContent = function (money) {
        var betData = [];
        var dms = []; // 胆码
        var tms = []; // 拖码
        var playCate = $('input:radio[name="rtype"]:checked');
        var number = playCate.attr("data-number");
        $.each($("#data-DM .danger"), function (n, o) { //
            dms.push($(o).attr('data-value'));
        });
        $.each($("#data-TM .danger"), function (n, o) { //
            tms.push($(o).attr('data-value'));
        });
        if (dms.length < 1) {
            layer.alert('请选择胆码', {icon: 2});
            return false;
        }
        if (dms.length >= number) {
            layer.alert('胆码个数不能超过' + (number - 1) + '位', {icon: 2});
            return false;
        }
        tms = inANotInB(tms, dms); // 去掉重复
        if (tms.length < 1) {
            layer.alert('请选择拖码', {icon: 2});
            return false;
        }
        if (tms.length + dms.length < number) {
            layer.alert("至少选择" + number + "位", {icon: 2})
            return false;
        }


        var cateName = playCate.attr("data-cateName");
        var cateCode = playCate.attr("data-code");
        var odds = playCate.attr("data-odds"); // 赔率
        var dmstr = dms.join(gameConstants.BET_SEPARATOR) + gameConstants.BET_SEPARATOR;
        betData = [];
        var len = tms.length;
        var arrayIndexs = combine(len, number - dms.length); // 获取组合数组下标
        if (arrayIndexs.length > betMaxCount) {
            layer.alert('组合注数不能超过' + betMaxCount + '注', {icon: 2});
            return false;
        }
        var kyodds = 0;
        if (odds.indexOf(gameConstants.BET_SEPARATOR) > 0) {
            kyodds = Number(odds.split(gameConstants.BET_SEPARATOR)[0]);
        } else {
            kyodds = Number(odds);
        }
        var kyje = (kyodds - 1) * money;
        for (var i = 0; i < arrayIndexs.length; i++) {
            // 加上胆码
            var betInfo = dmstr + getArrayByIndexsToStr(tms, arrayIndexs[i]);
            var list = {
                "code": cateCode,
                "betInfo": betInfo,
                "odds": odds,
                "money": money,
                "kyje": kyje.toFixed(2),
                "cateName": cateName
            };
            betData.push(list);
        }
        if (betData.length > 0) {
            conBetPage.show(betData);
            cancel();
        }
    };
    return {init: init, block: block, unBlock: unBlock, cancel: cancel};
})();

var RX1_5 = (function () {
    var init = function () { // 默认文本框模式页面事件
        currentEvent = RX1_5;
        $('.data-focus').on("click", function () { // 选中事件
            if (lotteryBlock) {
                return;
            }
            var value = $(this).attr("data-playId");
            if ($(this).hasClass("danger")) {
                $('.data-focus-' + value).removeClass("danger"); // 删除选中样式
            } else {
                if ($(".danger.data-chbox").length >= 5) { // 只能选择5个
                    return;
                }
                $('.data-focus-' + value).addClass("danger");// 添加选中样式
            }
            onRebateChange();
        });
        function click() {
            var n = $(".danger.data-chbox").length;
            if (n < 1) {
                $('.lm_name').html('');
                $('.lm_pl').html(0);
            }
            
            var playCate = $('#playCode_' + n); // 动态赔率
            $('.lm_name').html(playCate.attr('data-showName'));
            $('.lm_pl').html(playCate.attr('data-odds'));
        }

        function onRebateChange() {
            oddManager.RX1_5();
            click();
        }

        funBetBut = getBetContent;
        focusEvent();

        rebateChange = onRebateChange;
    }, focusEvent = function () { // 焦点事件
    }, cancel = function () {
        $(".danger").removeClass('danger');
        $('.lm_name').html('--');
        $('.lm_pl').html('--');
    }, block = function () { // 封盘操作
        $('.lm_name').html('--');
        $('.lm_pl').html('--');

    }, unBlock = function () { // 开盘操作
        $.each($(".data-block"), function (n, o) {
            var obj = $(o);
            var odds = obj.attr("data-odds");
            obj.html(odds);
        });
        $('.lm_name').html("");
        $('.lm_pl').html("0");
    }, getBetContent = function (money) {
        var betData = [];
        var chboxs = $(".danger.data-chbox");
        var betInfo = "";
        $.each(chboxs, function (n, o) {
            betInfo += $(o).attr("data-value") + ',';
        });
        if (betInfo) {
            betInfo = betInfo.substring(0, betInfo.length - 1);
            var playCate = $('#playCode_' + chboxs.length);
            var odds = playCate.attr('data-odds');
            var kyOdds = 0;
            if (odds.indexOf(gameConstants.BET_SEPARATOR) > 0) {
                kyOdds = Number(odds.split(gameConstants.BET_SEPARATOR)[0]);
            } else {
                kyOdds = Number(odds);
            }
            var kyje = (kyOdds - 1) * money;

            $('.lm_name').html(''); // 清空
            $('.lm_pl').html(0);
            var list = {
                code: playCate.attr('data-code'),
                betInfo: betInfo,
                odds: odds,
                money: money,
                cateName: playCate.attr('data-cateName'),
                kyje: kyje.toFixed(2)
            };
            betData.push(list);
        }
        if (betData.length > 0) {
            conBetPage.show(betData);
            cancel();
        }
    };
    return {init: init, block: block, unBlock: unBlock, cancel: cancel};
})();

var RX1_5_1 = (function () {
    var init = function () { // 默认文本框模式页面事件
        currentEvent = RX1_5_1;
        $('.data-focus').on("click", function () { // 选中事件
            if (lotteryBlock) {
                return
            }
            var value = $(this).attr("data-playId");
            if ($(this).hasClass("danger")) {
                $('.data-focus-' + value).removeClass("danger"); // 删除选中样式
            } else {
                var playCate = $('#playCate');
                var maxNumber = Number(playCate.attr("data-maxNumber"));
                if (($(".danger.data-chbox").length) >= maxNumber) {
                    layer.msg('最多只能选择' + maxNumber + "位");
                    return;
                }
                $('.data-focus-' + value).addClass("danger");// 添加选中样式
            }
        });
        funBetBut = getBetContent;
        focusEvent();
        oddManager.cateCode1();
        rebateChange = oddManager.cateCode1;
    }, focusEvent = function () { // 焦点事件
    }, cancel = function () {
        $(".danger").removeClass('danger');
    }, block = function () { // 封盘操作
    }, unBlock = function () { // 开盘操作
        $.each($(".data-block"), function (n, o) {
            var obj = $(o);
            var odds = obj.attr("data-odds");
            obj.html(odds);
        });
        $('.lm_name').html($('#playCate').attr('data-catename'));
        $('.lm_pl').html($("#playCate").attr('data-odds'));
    }, getBetContent = function (money) {
        var betData = [];
        var chboxs = $(".danger.data-chbox");
        var numArray = [];
        $.each(chboxs, function (n, o) {
            numArray.push($(o).attr("data-value"));
        });
        betData = dataHandle.cNxN(numArray, money)
        if (betData.length > 0) {
            conBetPage.show(betData);
            cancel();
        }
    };
    return {init: init, block: block, unBlock: unBlock, cancel: cancel};
})();

var PENG = (function () {
    var init = function () { // 默认文本框模式页面事件
        currentEvent = PENG;
        $('.data-focus').on("click", function () { // 选中事件
            if (lotteryBlock) {
                return
            }
            var playId = $(this).attr("data-playId");
            if ($(this).hasClass("danger")) {
                $('.data-focus-' + playId).removeClass("danger"); // 删除选中样式
            } else {
                if ($('.data-chbox.danger').length >= 2) {
                    return;
                }
                $('.data-focus-' + playId).addClass("danger");// 添加选中样式
            }
        });
        //menu.cateTab();
        funBetBut = getBetContent;
        focusEvent();
    }, focusEvent = function () { // 焦点事件
        currentEvent = SXWS;
        $('.data-SX').on("click", function () { // 选中事件
            if (lotteryBlock) {
                return
            }
            $('.data-SX td').each(function () {
                var value = $(this).attr("data-value");
                $(this).removeClass("danger");
                $(this).find("span").removeAttr('class');

                var wsTd = $('.data-WS .data-focus-' + value);
                var span = wsTd.find("span");
                if (span.hasClass("vis_hid")) {
                    wsTd.addClass("danger");
                    span.removeAttr('class');
                    span.addClass(span.attr("data-css"));
                }
            });
            $(this).find('.data-focus').each(function () {
                var value = $(this).attr("data-value");
                $(this).addClass("danger");
                var span = $(this).find("span");
                span.addClass(span.attr("data-css"));
                var wsTd = $('.data-WS .data-focus-' + value);
                if (wsTd.hasClass("danger")) {
                    wsTd.removeClass("danger");
                    wsTd.find("span").addClass("vis_hid");
                }
            });

        });
        $('.data-WS').on("click", function () { // 选中事件
            if (lotteryBlock) {
                return
            }
            $('.data-WS td').each(function () {
                var value = $(this).attr("data-value");
                $(this).removeClass("danger");
                $(this).find("span").removeAttr('class');

                var wsTd = $('.data-SX .data-focus-' + value);
                var span = wsTd.find("span");
                if (span.hasClass("vis_hid")) {
                    wsTd.addClass("danger");
                    span.removeAttr('class');
                    span.addClass(span.attr("data-css"));
                }
            });
            $(this).find('.data-focus').each(function () {
                var value = $(this).attr("data-value");
                $(this).addClass("danger");
                var span = $(this).find("span");
                span.addClass(span.attr("data-css"));
                var wsTd = $('.data-SX .data-focus-' + value);
                if (wsTd.hasClass("danger")) {
                    wsTd.removeClass("danger");
                    wsTd.find("span").addClass("vis_hid");
                }
            });

        });
    }, cancel = function () {
        $('.vis_hid').removeClass('vis_hid');
        $('.danger').removeClass("danger");
        $('.data-SX').attr('data-c', 0); // 胆拖生肖事件
        $('.data-SX td').find("span").each(function () {// 胆拖生肖事件
            $(this).removeClass($(this).attr("data-css"));
        });
        $('.data-WS td').find("span").each(function () {// 胆拖生肖事件
            $(this).removeClass($(this).attr("data-css"));
        });
    }, block = function () { // 封盘操作
        $(".data-block").html('--');
        $(".data-bet").val('');
        $(".danger").removeClass('danger');
        $(".data-bet").attr("readonly", "readonly");
    }, unBlock = function () { // 开盘操作
        $.each($(".data-block"), function (n, o) {
            var obj = $(o);
            var odds = obj.attr("data-odds");
            obj.html(odds);
        });
        $(".data-bet").removeAttr("readonly");
    }, getBetContent = function (money) {
        var playCate = $('input:radio[name="rtype"]:checked');
        var number = playCate.attr("data-number");
        var betNums = [];
        $.each($(".data-chbox.danger"), function (n, o) { //
            var vs = $(o).attr('data-value').split(gameConstants.BET_SEPARATOR);
            betNums.push(vs);
        });
        if (betNums.length != 2) {
            layer.alert('选择号码必须2位', {icon: 2});
            return false;
        }
        var cateName = playCate.attr("data-cateName");
        var code = playCate.attr("data-code");
        var number = Number(playCate.attr("data-number"));//个数
        var odds = playCate.attr("data-odds"); // 赔率

        var kyodds = 0;
        if (odds.indexOf(gameConstants.BET_SEPARATOR) > 0) {
            kyodds = Number(odds.split(gameConstants.BET_SEPARATOR)[0]);
        } else {
            kyodds = Number(odds);
        }
        var kyje = (kyodds - 1) * money;
        var betData = [];
        betNums[0].forEach(function (ball1) {
            betNums[1].forEach(function (ball2) {
                var betInfo = ball1 + gameConstants.BET_SEPARATOR + ball2;
                betData.push({
                    code: code,
                    betInfo: betInfo,
                    odds: odds,
                    money: money,
                    cateName: cateName,
                    kyje: kyje.toFixed(2)
                });
            });
        });
        if (betData.length > 0) {
            conBetPage.show(betData);
            cancel();
        }
    };
    return {init: init, block: block, unBlock: unBlock, cancel: cancel};
})();
// 菜单操作
var menu = (function () {
    var tab = function (page, divId) { // 玩法切换
        var index = layer.load(0, {shade: false});
        $.ajax({
            type: "get",
            url: page + '?t=' + Date.parse(new Date()),
            success: function (data) {
                layer.close(index);
                $("#" + divId).html(data);
            }
        });
    }, lhcTab = function (page, divId) {
        gameManager.cancel();
        $.each($('.Nav_content_Fr_table').find('td'), function (_, item) {
            $(item).attr('data-chose', 0);
            $(item).css('background-color', '')
            $(item).removeClass('text-danger')
        })
        var index = layer.load(0, {shade: false});
        $.ajax({
            type: "get",
            url: page + '?t=' + Date.parse(new Date()),
            success: function (data) {
                layer.close(index);
                $("#" + divId).html(data);
            }
        });
    }
        , cateTab = function () { // 玩法菜单事件
        //导航栏切换效果
        $('.T_nav li ').on("click", function () {
            $(this).not($(".sub")).addClass("T_nav_bg").siblings().removeClass("T_nav_bg");
        });
    }, twoTab = function () { // 页面二级玩法事件
        $('.nav-tabs li ').on("click", function () { // tab切换焦点
            $(this).not($(".sub")).addClass("active").siblings().removeClass("active");
        });
    }, rightMenuTab = function (type, e) {
        $.each($('.CurrentBetting'), function (_, ele) {
            if (ele === e) {
                $(ele).addClass('rightActive')
            } else {
                $(ele).removeClass('rightActive')
            }
        })
        if (type == 'bet') {
            $("#rightLmcl").css('display', 'none')
            $("#rightBet").css('display', 'block')
        } else if (type == 'lmcl') {
            $("#rightLmcl").css('display', 'block')
            $("#rightBet").css('display', 'none')
        }
    };
    ;
    return {tab: tab, lhcTab: lhcTab, rightTab: rightMenuTab, cateTab: cateTab, twoTab: twoTab};
})();

//clAnalysis 页面事件
var clAnalysisManager = function () {
    var initAnalysisListener = function () {
        $('.analysis_title').on('mouseenter', function () {
            var dataCode = $(this).attr('data-code');
            var ballIndex = parseInt($(this).attr('ball-index'));
            var table = $(this).parents('table');
            var type = table.attr('id');
            if (type == 'repeatTable') {
                $('#trendTable .analysis_title[data-code-template]:first').html("第" + numToChinses(ballIndex) + "球")
                $('#trendTable .analysis_title[data-code-template]').each(function () {
                    var dataCodeTemplate = $(this).attr('data-code-template');
                    $(this).attr('data-code', dataCodeTemplate.replace('X', ballIndex + 1));
                });
                // 联动切换
                var scDataCode = $('#trendTable .analysis_title.anactive').attr('data-code');
                $('#trendTable tr[nanlysis=trend]').hide();
                $('#trendTable tr[data-code=' + scDataCode + ']').show();

                table.find('tr[nanlysis=repeatNum]').hide();
                table.find('tr[nanlysis=repeatNum][ball-index=' + ballIndex + ']').show();
            } else {
                table.find('tr[nanlysis=trend]').hide();
                table.find('tr[data-code=' + dataCode + ']').show();
            }

            table.find('.analysis_title').removeClass('anactive');
            $(this).addClass(' anactive');
        });
    }, numToChinses = function (num) {
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
        initListener: initAnalysisListener,
    }
}()


var dataHandle = { // 下注内容处理
    DW3: function (data, money) { // 定位3个号码
        var playCate = $('#playCate');
        var oddsArray = playCate.attr("data-odds");
        var code = playCate.attr("data-code");
        var cateName = playCate.attr("data-cateName");
        var oddsType = playCate.attr("data-oddsType");
        var betData = [];
        data[0].forEach(function (ball1) {
            data[1].forEach(function (ball2) {
                data[2].forEach(function (ball3) {
                    var betInfo = ball1 + gameConstants.BET_SEPARATOR + ball2 + gameConstants.BET_SEPARATOR + ball3;
                    var odds = oddsArray; // 默认为固定赔率
                    if (oddsType == 'json') {
                        oddsArray = oddsArray.replace(/'/g, '"');
                        var oddsJson = jQuery.parseJSON(oddsArray);
                        betInfo = betInfo.replace(/,/g, ''); //001
                        odds = oddsJson[betInfo]; // 跟据下注内容获取赔率
                    }
                    if (odds) {
                        var kyje = (odds - 1) * money;
                        betData.push({
                            code: code,
                            betInfo: betInfo,
                            odds: odds,
                            money: money,
                            cateName: cateName,
                            kyje: kyje.toFixed(2)
                        });
                    }

                });
            });
        });
        return betData;
    },
    DW2: function (data, money) {// 定位2个号码
        var playCate = $('#playCate');
        var oddsArray = playCate.attr("data-odds");
        var code = playCate.attr("data-code");
        var cateName = playCate.attr("data-cateName");
        var oddsType = playCate.attr("data-oddsType");
        var betData = [];
        data[0].forEach(function (ball1) {
            data[1].forEach(function (ball2) {
                var betInfo = ball1 + gameConstants.BET_SEPARATOR + ball2;
                var odds = oddsArray; // 默认为固定赔率
                if (oddsType == 'json') {
                    oddsArray = oddsArray.replace(/'/g, '"');
                    var oddsJson = jQuery.parseJSON(oddsArray);
                    betInfo = betInfo.replace(/,/g, ''); //001
                    odds = oddsJson[betInfo]; // 跟据下注内容获取赔率
                }
                if (odds) {
                    var kyje = (odds - 1) * money;
                    betData.push({
                        code: code,
                        betInfo: betInfo,
                        odds: odds,
                        money: money,
                        cateName: cateName,
                        kyje: kyje.toFixed(2)
                    });
                }
            });
        });
        return betData;
    },
    ZX1: function (data, money) { // 时时彩组选三、六
        var playCate = $('#playCate');
        var odds = playCate.attr("data-odds");
        var code = playCate.attr("data-code");
        var cateName = playCate.attr("data-cateName");
        var number = playCate.attr("data-number");
        var minNumber = playCate.attr('data-minNumber');
        var maxNumber = playCate.attr('data-maxNumber');
        if (data.length < minNumber) {
            layer.alert('选择号码不能少于' + minNumber + '位', {icon: 2});
            return;
        }
        if (data.length > maxNumber) {
            layer.alert('选择号码不能大于' + maxNumber + '位', {icon: 2});
            return;
        }
        var betData = [];
        odds = parseFloat((odds / cNxN(data.length, number)).oddFixed(4));
        var kyje = (odds - 1) * money;
        var betInfo = data.join(gameConstants.BET_SEPARATOR);
        betData.push({
            code: code,
            betInfo: betInfo,
            odds: odds,
            money: money,
            cateName: cateName,
            kyje: kyje.toFixed(2)
        });
        return betData;
    },
    cNxN: function (numArray, money) { // 复式处理
        var playCate = $('#playCate');
        var odds = playCate.attr("data-odds");
        var code = playCate.attr("data-code");
        var cateName = playCate.attr("data-cateName");
        var number = playCate.attr("data-number");
        if (numArray.length < number) {
            layer.alert('选择号码不能少于' + number + '位', {icon: 2});
            return;
        }
        betData = [];
        var len = numArray.length;
        var arrayIndexs = combine(len, number); // 获取组合数组下标
        if (arrayIndexs.length > betMaxCount) {
            layer.alert('组合注数不能超过' + betMaxCount + '注', {icon: 2});
            return;
        }
        var kyOdds = 0;
        if (odds.indexOf(gameConstants.BET_SEPARATOR) > 0) {
            kyOdds = Number(odds.split(gameConstants.BET_SEPARATOR)[0]);
        } else {
            kyOdds = Number(odds);
        }
        var kyje = (kyOdds - 1) * money;
        for (var i = 0; i < arrayIndexs.length; i++) {
            var betInfo = getArrayByIndexsToStr(numArray, arrayIndexs[i]);
            var list = {
                "code": code,
                "betInfo": betInfo,
                "odds": odds,
                "money": money,
                "cateName": cateName,
                "kyje": kyje.toFixed(2)
            };
            betData.push(list);
        }
        return betData;
    },
    heXiao_odds: function () { // 合肖陪率
        var playCate = $("#playCate");
        var code = playCate.attr("data-code");
        var rate = 0;
        var count = 0;
        var betInfo = '';
        var isz = false;
        if (code == '70206101' || code == '71206101') {// 多肖中
            isz = true;
        } else {
            $.each($(".table-bet .data-chbox"), function (n, o) {
                var obj = $(o);
                rate += parseInt((parseFloat(obj.attr("data-odds")) * 10000).toFixed(0));
                //console.log(rate);
            });
        }
        $.each($(".table-bet .danger.data-chbox"), function (n, o) {
            var obj = $(o);
            if (isz) {
                rate += parseInt((parseFloat(obj.attr("data-odds")) * 10000).toFixed(0));
            } else {
                rate -= parseInt((parseFloat(obj.attr("data-odds")) * 10000).toFixed(0));
            }
            count++;
        });

        if (isz) {
            rate = (rate / count / count / 10000);
        } else {
            if (count == 0) {
                return 0.0;
            }
            rate = (rate / (12 - count) / (12 - count) / 10000)
        }
        if (!isNaN(rate)) {
            return parseFloat(rate.oddFixed(4));
        } else {
            return 0.0;
        }


    },
    ZX: function (money) {
        var dms = []; // 胆码
        var tms = []; // 拖码
        var playCate = $('input:radio[name="rtype"]:checked');
        var number = playCate.attr("data-number");
        $.each($("#data-DM .danger"), function (n, o) { //
            dms.push($(o).attr('data-value'));
        });
        $.each($("#data-TM .danger"), function (n, o) { //
            tms.push($(o).attr('data-value'));
        });
        if (dms.length < 1) {
            layer.alert('请选择胆码', {icon: 2});
            return false;
        }
        if (dms.length >= number) {
            layer.alert('胆码个数不能超过' + (number - 1) + '位', {icon: 2});
            return false;
        }
        tms = inANotInB(tms, dms); // 去掉重复
        if (tms.length < 1) {
            layer.alert('请选择拖码', {icon: 2});
            return false;
        }
        if ((dms.length + tms.length) < number) {
            layer.alert('至少选择' + number + '位', {icon: 2});
            return false;
        }
        var cateName = playCate.attr("data-cateName");
        var cateCode = playCate.attr("data-code");
        var odds = playCate.attr("data-odds"); // 赔率
        var dmstr = dms.join(gameConstants.BET_SEPARATOR) + gameConstants.BET_SEPARATOR;
        var betData = [];
        var len = tms.length;
        var arrayIndexs = combine(len, number - dms.length); // 获取组合数组下标
        if (arrayIndexs.length > betMaxCount) {
            layer.alert('组合注数不能超过' + betMaxCount + '注', {icon: 2});
            return false;
        }
        var kyodds = 0;
        if (odds.indexOf(gameConstants.BET_SEPARATOR) > 0) {
            kyodds = Number(odds.split(gameConstants.BET_SEPARATOR)[0]);
        } else {
            kyodds = Number(odds);
        }
        var kyje = (kyodds - 1) * money;
        for (var i = 0; i < arrayIndexs.length; i++) {
            // 加上胆码
            var betInfo = dmstr + getArrayByIndexsToStr(tms, arrayIndexs[i]);
            var list = {
                "code": cateCode,
                "betInfo": betInfo,
                "odds": odds,
                "money": money,
                "kyje": kyje.toFixed(2),
                "cateName": cateName
            };
            betData.push(list);
        }
        return betData;
    },
};
function betContent() {
    // var type = $("#ck-bet-type").val();
    var money = Number($('#quickMoney').val());
    var type = $("#ck-bet-type").val();
    if (type && money <= 0) {
        layer.alert('请输入下注金额', {icon: 2});
        return;
    }
    if (funBetBut) {
        funBetBut(money);
    }
}
function quickMoneyChange(obj) { // 快捷金额事件
    var money = $(obj).val();
    if ($("#checkMoney").attr("checked")) {
        $.cookie("quickMoney", money, {path: '/'});
    }
    if (money.toString().indexOf('.') !== -1){
        var model = money.toString().split('.')[1].length
        if (model > 2){
            return
        }
    }
    $("input[name='nQuickMoney']").val(money);
    $(".danger input[type='text']").val(money);
};

function quickMoneyAddChange(total) {
    $(".danger input[type='text']").val(total);
}

/**
 * 绑定游戏类型点击事件
 */
function bindLotteryTypeEvent() {

    $(".sidem_b").on('click', function () {
        $('.sidem_b').parent().removeClass('sidem_item_active');
        $('.sidem_b').next().slideUp();
        $(this).parent().addClass('sidem_item_active')
        var staus = $(this).next().css('display');
        switch (staus) {
            case  "block":
                $(this).next().slideUp('normal');
                break;
            case  "none":
                $(this).next().slideDown('normal');
                break;
        }
    })
    var currentGameCode = $("#gameId").attr("data-gameCode");
    if (currentGameCode == 'lhc') {
        $("#lhc_sidem_item").addClass("sidem_item_active");
    } else {
        $('#a_' + currentGameCode).addClass('active');
        $('.active').parent().parent().css('display', 'block');
        $('.active').parent().parent().parent().addClass('sidem_item_active')
    }


}


/**
 * 跟据下标获取组合内容
 * @param arrays
 * @param indexs
 * @returns {String}
 */
function getArrayByIndexsToStr(arrays, indexs) {
    var nums = '';
    for (var i = 0; i < indexs.length; i++) {
        nums += arrays[indexs[i]] + gameConstants.BET_SEPARATOR;
    }
    nums = nums.substring(0, nums.length - 1);
    return nums;
}

$.fn.onlyNum = function () {
    $(this).keypress(function (event) {
        var eventObj = event || e;
        var keyCode = eventObj.keyCode || eventObj.which;
        if ((keyCode >= 48 && keyCode <= 57)) {
            return true;
        }
        else {
            return false
        }
        ;
    }).focus(function () {
        //禁用输入法
        this.style.imeMode = 'disabled';
    }).bind("paste", function () {
        //获取剪切板的内容
        var clipboard = window.clipboardData.getData("Text");
        if (/^\d+$/.test(clipboard)) {
            return true;
        }
        else
            return false;
    });
};