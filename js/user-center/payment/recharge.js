/**
 * Created by Zelei on 2017/11/9.
 */
(function ($) {

    $.extend({
        flushValidateCode: function (img) {
            $(img).attr('src', $.toFullPath(
                '/v/vUserCode?t=' + Math.random() + (new Date).getTime()));
        },
        payFinfih: function () {
            hideShadow();
            window.location.href = '/page/user-center/payment/recharge-order.html'
        }
    });

    var userInfo;

    var initUserInfo = function () {
        $.ajax({
            async: false,
            url: '/api/user/info',
            type: 'get',
            dataType: 'json',
            success: function (response) {
                if (!response || !response.userInfo || !response.userInfo.type) {
                    var target = !window.parent === false && window.parent !== window
                        ? window.parent : window;
                    target.location.href = $.toFullPath('/views/main.html');
                    return;
                }
                if (response.userInfo.type === 'TEST') {
                    $.confirm({
                        title: '试玩帐号无法充值',
                        content: '马上注册成为会员？',
                        onConfirmed: function (modal, event) {
                            var target = !window.parent === false && window.parent !== window
                                ? window.parent : window;
                            target.location.href = '/views/html/register.html';
                        },
                        onDenied: function (modal, event) {
                            window.location.href = '/page/user-center/account/overviews.html';
                        }
                    });
                    return;
                }
                userInfo = response.userInfo;
            },
            error: $.errorHandler
        });
    }
    var initPayTypes = function () {
        $.getJSON('/api/recharge/getPayTypes', function (payTypes) {
            if (!payTypes || payTypes.length === 0) {
                return renderNonePayTypesBody();
            }
            renderPayTypes(payTypes);
        }).error($.errorHandler);
    }

    var renderNonePayTypesBody = function () {
        $('#container').empty().append(
            '<h4 class="text-center text-danger m-t-lg">充值功能维护中，请联系客服进行人工入款，给您带来不便，敬请谅解！</h4>');
    }

    var renderPayTypes = function (payTypes) {
        $('#container').empty()
            .append(
                '<div class="m-t-md p-x-lg bg-gray"><ul id="tabs" class="nav nav-pills"></ul></div>')
            .append('<div id="tab-content" class="m-t-md p-x-lg"></div>');
        var tabs = $('#tabs'), tab;
        $.each(payTypes, function (i, item) {
            tab = $(createTab(item));
            tabs.append(tab);
            bindTabEvents(tab);
        });
        tabs.children('li').first().click();
    }

    var createTab = function (payType) {
        return '<li data-code="' + payType.code + '"><a href="javascript:void(0);">'
            + payType.name + '</a></li>';
    }

    var bindTabEvents = function (tab) {
        tab.on('click', function () {
            var $this = $(this);
            if ($this.hasClass('active')) {
                return;
            }
            $this.addClass('active').siblings('li.active').removeClass('active');
            initPayType($this.attr('data-code'));
        });
    }

    var initPayType = function (payType) {
        hideShadow();  //隐藏阴影层
        var payAccounts = null, tpPayChannels = null;
        $.loading();
        $.ajax({
            async: false,
            url: '/api/recharge/getPayAccounts?payType=' + payType,
            type: 'get',
            dataType: 'json',
            success: function (response) {
                payAccounts = response;
            },
            error: $.errorHandler
        });
        $.ajax({
            async: false,
            url: '/api/recharge/getTpPayChannels?payType=' + payType,
            type: 'get',
            dataType: 'json',
            success: function (response) {
                tpPayChannels = response;
            },
            error: $.errorHandler
        });
        $.loaded();
        if ((!payAccounts || payAccounts.length === 0) && (!tpPayChannels
                || tpPayChannels.length === 0)) {
            return renderNoneChannelsContent();
        }
        renderChannels(payAccounts, tpPayChannels);
    }

    var renderNoneChannelsContent = function () {
        var noticeConent = '该支付方式维护中，请使用其它支付方式充值，给您带来不便，敬请谅解！';
        $.getJSON('/data/json/notice.json?_t=' + new Date().getTime(), null,
            function (response) {
                if (!response) {
                    return;
                }
                var notice = {};
                try {
                    notice = JSON.parse(response.rech_domain.noticeContent);
                    if($.isNumeric(notice)){
                        noticeConent = notice + '';
                    }else {
                        noticeConent = notice.default || noticeConent;
                    }
                    if ($.isArray(notice.subList) && notice.subList.length > 0) {
                        $.each(notice.subList, function (idx, value) {
                            if (value.subKey === userInfo.hyLevel) {
                                if (value.noticeContent != null) {
                                    noticeConent = value.noticeContent;
                                    return false;
                                }
                            }
                        });
                    }
                } catch (e) {
                    if (response.rech_domain && response.rech_domain.noticeContent != null && response.rech_domain.noticeContent !== "") {
                        noticeConent = response.rech_domain.noticeContent;
                    }
                }
                if (noticeConent == null || noticeConent === "") {
                    return;
                }
                $('#tab-content').empty().append('<p class="text-danger">' + noticeConent + '</p>');
            }
        );
    };
    var getRemark = function (remark,type) {
        var remarkName = {};
        remarkName[type] = "";
        return remark!==null&&remark!==""&&remark.indexOf(type)>=0?JSON.parse(remark):remarkName
    }
    var renderChannels = function (payAccounts, tpPayChannels) {
        var items = [];
        $.each(payAccounts, function (i, item) {
            item.mode = 1;
            items.push(item);
        });
        $.each(tpPayChannels, function (i, item) {
            item.mode = 2;
            items.push(item);
        });
        items.sort(function (obj, an) {
            return obj.sort - an.sort;
        });
        $('#tab-content').empty()
            .append(
                '<div id="steps"><div id="step-1"><p class="text-primary"><i class="x-step bg-primary text-white">1</i>选择支付方式</p><div id="x-cards"></div></div><hr><div id="step-2"></div></div>')
            .append('<div id="tips" class="m-t-md"></div>');
        var channels = $('#x-cards'), channel;
        $.each(items, function (i, item) {
            if (item.mode === 1) {
                channel = createPayAccount(item);
                channels.append(channel);
                bindChannelEvents(channel, item, 1);
            } else {
                channel = createTpPayChannel(item);
                channels.append(channel);
                bindChannelEvents(channel, item, 2);
            }
        });
        channels.children('div').first().click();
    }

    var createPayAccount = function (payAccount) {
        if (payAccount.bankFlag === 1) {
            var jq = $('<div class="x-card-b-box"><div class="x-card-b m-r-md m-t-sm"><div class="x-card-body">'
                + '<p style="padding-right: 28px"><span>开户银行: </span><span> ' + payAccount.bankName + '</span></p>'
                + '<p><span>收款户名: </span><span>' + payAccount.owner + '</span></p>'
                + '<p><span>银行账号: </span><span>' + payAccount.account + '</span></p></div></div></div>');
            if (!payAccount.bankAddress === false) {
                jq.find('.x-card-body').append(
                    '<p class="bankAddress">' + payAccount.bankAddress + '</p>');
            }
            if (!payAccount.remarks ===false) {
                jq.append('<p>' + payAccount.remarks + '</p>');
            }
            return jq;
        } else {
            return createTpPayChannel(payAccount);
        }
    }

    var createTpPayChannel = function (tpPayChannel) {
        var jq;
        //var payTypeName = tpPayChannel.tpMerchantName.substring(0,tpPayChannel.tpMerchantName.indexOf("_"));
        //tpPayChannel.name = tpPayChannel.name.replace(payTypeName,"");
        if (tpPayChannel.name.length > 10) {
            jq = $(
                '<div class="x-card m-r-md m-t-sm"><div class="x-card-heading" title="'
                + tpPayChannel.name + '">' + tpPayChannel.name.substring(0, 9)
                + '...</div></div>');
        } else {
            jq = $('<div class="x-card m-r-md m-t-sm"><div class="x-card-heading">'
                + tpPayChannel.name + '</div></div>');
        }
        jq.children('.x-card-heading').css({
            'background-image': 'url("/data/image/pay-type-icon/'
            + tpPayChannel.payType + '.png")'
        });
        if (!tpPayChannel.remarks === false ) {
            jq.append('<div class="x-card-body x-card-body-bordered"><div class="x-card-text">' +
                tpPayChannel.remarks + '</div></div>');
        } else {
            jq.children('.x-card-heading').addClass('lg');
        }
        return jq;
    }

    var bindChannelEvents = function (channel, obj, type) {
        channel.on('click', function () {
            var $this = $(this);
            if (obj.bankFlag === 1) {
                if ($this.children('.x-card-b').hasClass('active')) {
                    return;
                }
                $this.children('.x-card-b').addClass('active').parent().siblings().children('div.active').removeClass('active');
            } else {
                if ($this.hasClass('active')) {
                    return;
                }
                $this.addClass('active').siblings('div.active').removeClass('active');
            }
            var url = '/api/recharge/getRechargeConfig?mode=' + type + '&payType='
                + obj.payType;
            $.loading();
            $.getJSON(url, function (rechargeConfig) {
                $.loaded();
                if (!rechargeConfig) {
                    return renderNoneRechargeConfigContent();
                }
                if (type === 1) {
                    renderTransferForm(obj, rechargeConfig);
                } else if (type === 2) {
                    renderOnlinePayForm(obj, rechargeConfig);
                }
            }).error($.errorHandler);
        });
    }

    var renderNoneRechargeConfigContent = function () {
        $('#step-2').empty().append(
            '<p class="text-danger">该通道维护中，请使用其它通道充值，给您带来不便，敬请谅解！</p>');
    }

    var renderTransferForm = function (payAccount, rechargeConfig) {
        var bankFields = '';
        if (payAccount.bankFlag === 1) {
            bankFields = '<div class="form-group row">'
                + '<label class="control-label"><span class="fa fa-required m-r-xs"></span>存&nbsp;&nbsp;款&nbsp;&nbsp;人</label>'
                + '<div><input class="form-control" name="rechargePerson" value="'
                + userInfo.fullName + '" required maxlength="100"></div>'
                + '</div>'
                + '<div class="form-group row">'
                + '<label class="control-label"><span class="fa fa-required m-r-xs"></span>存款时间</label>'
                + '<div>'
                + '<div id="rechargeTimePicker" class="input-group">'
                + '<input id="rechargeTime" class="form-control none-bg" name="rechargeTime" required readonly>'
                + '<div class="input-group-addon"><i class="fa fa-calendar"></i></div>'
                + '</div></div>'
                + '</div>';
        }

        var amountHtml;
        if (rechargeConfig.maxAmount > 0) {
            amountHtml = '<input id="amount" type="number" class="form-control" name="amount" required min="'
                + rechargeConfig.minAmount + '" max="' + rechargeConfig.maxAmount
                + '">';
        } else {
            amountHtml = '<input id="amount" type="number" class="form-control" name="amount" required min="'
                + rechargeConfig.minAmount + '">';
        }
        $('#step-2').empty()
            .append(
                '<p class="text-primary"><i class="x-step bg-primary text-white">2</i>填写充值订单信息</p>')
            .append('<form id="form" class="form form-horizontal">'
                + '<input type="hidden" name="payAccountId" value="' + payAccount.id
                + '">'
                + bankFields
                + '<div class="form-group row">'
                + '<label class="control-label"><span class="fa fa-required m-r-xs"></span>充值金额</label>'
                + '<div>' + amountHtml + '</div>'
                + '</div>'
                + createYzm(rechargeConfig.validateCodeEnabled)
                + '<div class="form-group row">'
                + '<div><button class="btn btn-primary">下一步</button></div>'
                + '</div>'
                + '</form>');
        bindYzmEvents(rechargeConfig.validateCodeEnabled);

        if (payAccount.bankFlag === 1) {
            $('#rechargeTimePicker').datepicker(
                {dateFmt: 'yyyy-MM-dd HH:mm:ss', el: 'rechargeTime'});
            $('#rechargeTime').val($.dateformat(new Date(), 'yyyy-MM-dd HH:mm:ss'));
        }
        $('#tips').empty().append(createChannelTips(rechargeConfig));
        $('#amount').focus();
        $('#form').validate({
            submitHandler: function (form) {
                var parameters = $(form).serializeObject();
                renderTransferView(payAccount, parameters);
            }
        });
    }

    var createChannelTips = function (rechargeConfig) {
        var html;
        if (rechargeConfig.maxAmount > 0) {
            html = '<p class="text-warning">温馨提示</p>'
                + '<p class="text-muted">单笔充值最低 <span class="text-danger">'
                + rechargeConfig.minAmount + '</span> 元，最高 <span class="text-danger">'
                + rechargeConfig.maxAmount + '</span> 元。</p>';
        } else {
            html = '<p class="text-warning">温馨提示</p>'
                + '<p class="text-muted">单笔充值最低 <span class="text-danger">'
                + rechargeConfig.minAmount + '</span> 元。</p>';
        }
        return html;
    }

    var renderOnlinePayForm = function (tpPayChannel, rechargeConfig) {
        var banks = [], html;
        if (!tpPayChannel.banks === false) {
            $.each(JSON.parse(tpPayChannel.banks), function (k, v) {
                banks.push({
                    code: k,
                    name: v
                })
            });
        }

        if (banks.length === 0) {
            html = '';
        } else if (banks.length === 1) {
            html = '<input type="hidden" name="bankCode" value="' + banks[0].code
                + '">';
        } else {
            html = '<div class="form-group row">'
                + '<label class="control-label"><span class="fa fa-required m-r-xs"></span>充值银行</label>'
                + '<div><select class="form-control" name="bankCode">';
            $.each(banks, function (i, item) {
                html += '<option value="' + item.code + '">' + item.name + '</option>';
            });
            html += '</select></div>' + '</div>';
        }
        var amountHtml;
        if (rechargeConfig.maxAmount > 0) {
            amountHtml = '<input id="amount" type="number" class="form-control" name="amount" required min="'
                + rechargeConfig.minAmount + '" max="' + rechargeConfig.maxAmount
                + '">';
        } else {
            amountHtml = '<input id="amount" type="number" class="form-control" name="amount" required min="'
                + rechargeConfig.minAmount + '">';
        }
        $('#step-2').empty()
            .append(
                '<p class="text-primary"><i class="x-step bg-primary text-white">2</i>填写充值订单信息</p>')
            .append('<form id="form" class="form form-horizontal">'
                + '<input type="hidden" name="payChannelId" value="' + tpPayChannel.id
                + '">'
                + '<div class="form-group row">'
                + '<label class="control-label"><span class="fa fa-required m-r-xs"></span>充值金额</label>'
                + '<div>' + amountHtml + '</div>'
                + '</div>'
                + html
                + createYzm(rechargeConfig.validateCodeEnabled)
                + '<div class="form-group row">'
                + '<div><button class="btn btn-primary">立即支付</button></div>'
                + '</div>'
                + '</form>');
        bindYzmEvents(rechargeConfig.validateCodeEnabled);
        $('#tips').empty().append(createChannelTips(rechargeConfig));
        $('#amount').focus();
        $('#form').validate({
            submitHandler: function (form) {
                if (tpPayChannel.viewType === 0) {
                    $.loading();
                    onlinePay($(form).serialize(), function () {
                        $.loaded();
                        renderThirdPartyView(tpPayChannel,
                            $(form).serializeObject().amount);
                    });
                } else if (tpPayChannel.viewType === 1) {
                    $.loading();
                    onlinePayQrCode($(form).serialize(), function (response) {
                        $.loaded();
                        renderQrCodeView(tpPayChannel, $(form).serializeObject().amount,
                            response);
                    });
                } else if (tpPayChannel.viewType === 3) {
                    $.loading();
                    onlinePayQrCode($(form).serialize(), function (response) {
                        $.loaded();
                        renderOtherQrCodeView(tpPayChannel, $(form).serializeObject().amount,
                            response);
                    });
                }
            }
        });
    }

    var createYzm = function (validateCodeEnabled) {
        if (validateCodeEnabled !== 1) {
            return '';
        }
        return '<div class="form-group row">'
            + '<label class="control-label"><span class="fa fa-required m-r-xs"></span>验&nbsp;&nbsp;证&nbsp;&nbsp;码</label>'
            + '<div><input id="yzmNum" class="form-control" name="yzmNum" required></div>'
            + '<div><img id="yzmImg" width="100px" height="36px" src="/images/yzm.gif" onclick="jQuery.flushValidateCode(this);"></div>'
            + '</div>';
    }

    var bindYzmEvents = function (validateCodeEnabled) {
        if (validateCodeEnabled !== 1) {
            return;
        }
        $('#yzmNum').on('focus', function (e) {
            var img = $('#yzmImg');
            if (img.attr('src') === '/images/yzm.gif') {
                $.flushValidateCode(img[0]);
            }
        });
    }

    var renderTransferView = function (payAccount, parameters) {
        var enableFlag = false;
        $.ajax({
            async: false,
            url: '/api/recharge/getPayAccounts?payType=' + payAccount.payType,
            type: 'get',
            dataType: 'json',
            success: function (response) {
                payAccounts = response;
                payAccounts.forEach(function (account) {
                    if(account.id == payAccount.id){
                        enableFlag = true;
                    }
                });
            },
            error: $.errorHandler
        });

        if(!enableFlag){
            $('#tab-content').empty().append(
                '<p class="text-danger">当前充值方式已禁用，请重新刷新页面获取充值方式！</p>');
            return;
        }

        showShadow();   // 显示阴影层

        var tabContent = $('#tab-content').empty()
            .append(
                '<h4 class="text-success"><span class="text-danger">完成付款后请您点击提交订单！</span>充值金额 <span class="text-danger">'
                + parameters.amount + '</span> 元。</h4><hr>')
        if (payAccount.bankFlag === 1 || !payAccount.qrCode) {
            tabContent.append(
                '<h4 class="text-danger">请向以下账户转账完成付款</h4>')
                .append(
                    '<h4 class="m-t-md"><label>收款账号：</label><span class="text-danger">'
                    + payAccount.account + '</span></h4>')
                .append(
                    '<h4 class="m-t-md"><label>收&nbsp;&nbsp;款&nbsp;&nbsp;人：</label><span class="text-danger">'
                    + payAccount.owner + '</span></h4>');
            if (payAccount.bankFlag === 1) {
                tabContent.append(
                    '<h4 class="m-t-md"><label>收款银行：</label><span class="text-danger">'
                    + payAccount.bankName + '</span></h4>');
                if (!payAccount.bankAddress === false) {
                    tabContent.append(
                        '<h4 class="m-t-md"><label>开&nbsp;&nbsp;户&nbsp;&nbsp;行：</label><span class="text-danger">'
                        + payAccount.bankAddress + '</span></h4>');
                }
            }

        } else {
        	if(payAccount.subPayType == 1) {
        		//扫码支付
        		var payTypeName = $('#tabs > li.active > a').text();
        		tabContent.append('<div>'
        				+ '<img src="/data/image/' + payAccount.qrCode + '">'
        				+ '<div class="p-l-lg" style="display: inline-block; vertical-align: top">'
        				+ '<h4 class="text-danger">请扫描二维码完成付款</h4>'
        				+ '<h4 class="m-t-md"><i class="x-step bg-primary text-white">1</i>打开'
        				+ payTypeName + '扫一扫</h4>'
        				+ '<h4 class="m-t-md"><i class="x-step bg-primary text-white">2</i>扫描左边二维码</h4>'
        				+ '<h4 class="m-t-md"><i class="x-step bg-primary text-white">3</i>输入支付金额 <span class="text-danger">'
        				+ parameters.amount + '</span> 元</h4></div></div>');
        	}else if(payAccount.subPayType == 2) {
        		//添加好友支付
        		var payTypeName = $('#tabs > li.active > a').text();
        		tabContent.append('<div>'
        				+ '<img src="/data/image/' + payAccount.qrCode + '">'
        				+ '<div class="p-l-lg" style="display: inline-block; vertical-align: top">'
        				+ '<h4 class="text-danger">打开' + payTypeName + '添加(' + payAccount.account + ')进行转账, 提交订单即可到账</h4>'
        				+ '<h4 class="m-t-md"><i class="x-step bg-primary text-white">1</i>扫一扫左侧二维码添加好友'
        				+ '<h4 class="m-t-md"><i class="x-step bg-primary text-white">2</i>输入您要充值的金额并进行转账</h4>'
        				+ '<h4 class="m-t-md"><i class="x-step bg-primary text-white">3</i>支付完成以后请提交订单</h4>'
        				+ '<h4 class="m-t-md"><i class="x-step bg-primary text-white">4</i>如充值未及时到账, 请联系在线客服</h4>'
        				+ '</div></div>');
        	}else if(payAccount.subPayType == 3) {
        		//公众号支付
        		var payTypeName = $('#tabs > li.active > a').text();
        		tabContent.append('<div>'
        				+ '<img src="/data/image/' + payAccount.qrCode + '">'
        				+ '<div class="p-l-lg" style="display: inline-block; vertical-align: top">'
        				+ '<h4 class="text-danger">请扫描二维码关注公众号付款</h4>'
        				+ '<h4 class="m-t-md"><i class="x-step bg-primary text-white">1</i>打开'
        				+ payTypeName + '扫一扫</h4>'
        				+ '<h4 class="m-t-md"><i class="x-step bg-primary text-white">2</i>扫描左边二维码关注公众号</h4>'
        				+ '<h4 class="m-t-md"><i class="x-step bg-primary text-white">3</i>在公众号里完成付款 </h4>'
        				+ '<h4 class="m-t-md"><i class="x-step bg-primary text-white">4</i><a onclick="jQuery.payFinfih()">已完成付款，查看订单进度</a></h4>'
        				+ '</div></div>');
        	}
        }
        if(payAccount.subPayType != 3) {
        	if(payAccount.orderRemarkStatus === 0) {
        	    var orderRemark = payAccount.orderRemark == null?"":payAccount.orderRemark
        		tabContent.append('<hr>')
        		tabContent.append('<label style="width: 90px;font-size: 20px;top: 10px;position: relative;top: -20px!important;"><font style="color: red">*<font>&nbsp;&nbsp;备&nbsp;&nbsp;注： </label><textarea id="transferRemark"  class="" placeholder="'+ orderRemark +'" style="border: 1px solid #b62929;width: 300px;overflow: hidden;"/>')
        		
        	}

            if(payAccount.subPayType == 2) {

                var friendPayAccounts = payAccount.friendPayAccounts;
                var friendAccounts=null;
                if(null !=friendPayAccounts){
                    friendAccounts=friendPayAccounts.split(",");
                }

                if(null != friendAccounts){
                    tabContent.append('<hr>')
                    tabContent.append('&nbsp;&nbsp;'+ getFriendAccount(friendAccounts))
                }

            }
        	tabContent.append('<hr>').append(createTransferButton(parameters,payAccount.orderRemarkStatus)).append(
        			createRechargeButton('取消订单'));
        }
    }

    var getFriendAccount=function (datas) {
        var friendAccountStr='';
        datas.forEach(function(data){
            friendAccountStr+= '<input type="radio" name="accounts" value='+data+' required/> '+data+' &nbsp;&nbsp;';
        });
        return friendAccountStr;
    }

    var renderThirdPartyView = function (tpPayChannel, amount) {
        $('#tab-content').empty()
            .append('<h4 class="text-success">订单创建成功！充值金额 <span class="text-danger">'
                + amount + '</span> 元。</h4><hr>')
            .append('<h4 class="text-danger">请于30分钟内在第三方支付页面完成付款</h4>')
            .append('<hr>').append(createViewButton()).append(
            createRechargeButton('继续充值'));
    }

    var renderQrCodeView = function (tpPayChannel, amount, qrCode) {
        var tabContent = $('#tab-content').empty()
            .append('<h4 class="text-success">订单创建成功！充值金额 <span class="text-danger">'
                + amount + '</span> 元。</h4><hr>');
        if (!qrCode === false) {
            var payTypeName = $('#tabs > li.active > a').text();
            tabContent.append('<div>'
                + '<img src="' + qrCode + '">'
                + '<div class="p-l-lg" style="display: inline-block; vertical-align: top">'
                + '<h4 class="text-danger">请于30分钟内扫描二维码完成付款</h4>'
                + '<h4 class="m-t-md"><i class="x-step bg-primary text-white">1</i>打开'
                + payTypeName + '扫一扫</h4>'
                + '<h4 class="m-t-md"><i class="x-step bg-primary text-white">2</i>扫描左边二维码</h4>'
                + '<h4 class="m-t-md"><i class="x-step bg-primary text-white">3</i>点击确认支付</h4>'
                + '</div>'
                + '</div>');
        }
        tabContent.append('<hr>').append(createViewButton()).append(
            createRechargeButton('继续充值'));
    }
    
    var renderOtherQrCodeView = function (tpPayChannel, amount, qrCode) {
        var tabContent = $('#tab-content').empty()
            .append('<h4 class="text-success">订单创建成功！充值金额 <span class="text-danger">'
                + amount + '</span> 元。</h4><hr>');
        if (!qrCode === false) {
            var payTypeName = $('#tabs > li.active > a').text();
            tabContent.append('<div>'
                + '<iframe src="' + qrCode + '" scrolling="no" style="width: 500px;height: 600px;border: 0px;" />'
                + '<div class="p-l-lg" style="display: inline-block; vertical-align: top">'
                + '<h4 class="text-danger">请于5分钟内扫描二维码完成付款</h4>'
                + '<h4 class="m-t-md"><i class="x-step bg-primary text-white">1</i>打开'
                + payTypeName + '扫一扫</h4>'
                + '<h4 class="m-t-md"><i class="x-step bg-primary text-white">2</i>扫描左边二维码</h4>'
                + '<h4 class="m-t-md"><i class="x-step bg-primary text-white">3</i>点击确认支付</h4>'
                + '</div>'
                + '</div>');
        }
        tabContent.append('<hr>').append(createViewButton()).append(
            createRechargeButton('继续充值'));
    }

    var createTransferButton = function (parameters,status) {
        return $('<button class="btn btn-primary">已完成付款，提交订单</button>').on(
            'click', function () {
                parameters.friendAccount=$("input[name='accounts']:checked").val();
                parameters.remark = $("#transferRemark").val()
                if(status===0 && (parameters.remark===null || parameters.remark==='')){
                    alert("请填写备注信息")
                }else{
                hideShadow();    //  隐藏图层
                transfer(parameters, function () {
                    window.location.href = '/page/user-center/payment/recharge-order.html';
                })
                }
            });
    }

    var createViewButton = function () {
        return $('<button class="btn btn-primary">已完成付款，查看订单进度</button>').on(
            'click', function () {
                hideShadow();    //  隐藏图层
                window.location.href = '/page/user-center/payment/recharge-order.html';
            });
    }

    var createRechargeButton = function (text) {
        return $('<button class="btn btn-default m-l-md">' + text + '</button>').on(
            'click', function () {
                initPayType($('#tabs li.active').attr('data-code'));
            });
    }

    var transfer = function (parameters, callback) {
        $.post('/api/recharge/transfer', parameters, callback).error(
            $.errorHandler);
    }

    var onlinePay = function (queryString, callback) {
        window.open('/api/recharge/onlinePay?' + queryString);
        callback();
    }
    
    var onlineOkPay = function (queryString, callback) {
        window.open(queryString);
        callback();
    }

    var onlinePayQrCode = function (queryString, callback) {
        $.get('/api/recharge/onlinePay?' + queryString, callback, 'text')
            .error($.errorHandler);
    }

    var showShadow = function () {
        $(top.window.document).find(".center-shadow").show();
        $(".center-shadow").show();
        $("body").css('background-color','rgba(0, 0, 0, 0.56)');
        $("#tab-content").css({
            'position': 'relative',
            'z-index': '999',
            'width': '900px',
            'padding': '12px 0',
            'background-color': '#fff',
            'border-radius': '6px'
        });
    };
 
    var hideShadow = function () {
        $(top.window.document).find(".center-shadow").hide();
        $(".center-shadow").hide();
 
        $("body").css('background-color','#fff');
 
        $("#tab-content").css({
            'position': 'relative',
            'z-index': '999',
            'width': '100%',
            'padding': 'auto',
            'background-color': '#fff',
            'padding-bottom':'20px',
            'border-radius': '0'
        });
    };

    var init = function () {
        initUserInfo();
        if (!userInfo) {
            return;
        }
        initPayTypes();
    };

    $(function () {
        init();
    });

})(jQuery);