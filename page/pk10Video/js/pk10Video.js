var pk10PopupObject=null
    ,getData=null
    ,refreshClear=null
    ,dialogData=null
    ,pk10Dialog=null
    //循环取数据
    ,getPk10Data=null
    // 请求时间
    ,apiTimeAfter=0
    ,apiTimeBefore=0
    //当前开奖期数
    ,thisPre=null
    //下期开奖时间
    ,nextTime=null
    //下期期数
    ,nextPre=null
    //关闭状态
    ,bClose=false
    ,pk10Id=$("#gameId").val();

// 获取数据
function getPK10(a) {
    var m=a;
    $.ajax({
        type: "GET",
        // url: HttpUtil.baseUrl + "/v/lottery/openInfo?gameId=22",
        url: "/v/lottery/openInfo?gameId=22",
        dataType: "json",
        async:m,
        success: function (data) {
            apiTimeAfter = new Date().getTime();
            if (data != null) {
                getData=data;
            }else{
                getData=null;
            }
        },
        error: function (data) {
            if (data.code == 'UC/TOKEN_INVALID') {
                getData=null;
            }
        }
    });
}

// 获取开奖数据第一次同步ajax
function getPK10InfoFirst() {
    getPK10(false);
}
// 异步循环获取数据
function getPK10Info() {
    getPK10(true);
}


//时间戳的方法格式转换
function formatDate(timestamp,nextT) {
    var now = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var year = now.getFullYear(),
        month = now.getMonth() + 1,
        date = now.getDate(),
        hour = now.getHours(),
        minute = now.getMinutes(),
        second = now.getSeconds();

    if(nextT=='lastTime'){
        var nowNext = now;
        nowNext.setMinutes(nowNext.getMinutes()+5);
        var yearNext = nowNext.getFullYear(),
            monthNext = nowNext.getMonth() + 1,
            dateNext = nowNext.getDate(),
            hourNext = nowNext.getHours(),
            minuteNext = nowNext.getMinutes(),
            secondNext = nowNext.getSeconds();

        if (minuteNext < 10) {
            minuteNext = '0' + minuteNext;
        }

        nextTime=yearNext + "/" + monthNext + "/" + dateNext + " " + hourNext + ":" + minuteNext + ":" + secondNext;
    }

    if (minute < 10) {
        minute = '0' + minute;
    }

    return year + "/" + month + "/" + date + " " + hour + ":" + minute + ":" + second;
}

//字符串转日期格式
function strToDate(str)
{
    var val=Date.parse(str);
    var newDate=new Date(val);
    return newDate;
}

//停止请求及刷新数据
function CloseInterval(){
    clearInterval(getPk10Data);
    clearInterval(refreshClear);
}

// 期数更新
function PeriodsUpdate(nPre,nTime,currPre) {
    $('.nextAc #na').text(nPre);
    $('.nextTime #nt').text(nTime);
    $('.pksp-periods span').text('期数：' + currPre);
}

//日期格式转换
function formatString(stringDate) {
    var now=strToDate(stringDate);
    var year = now.getFullYear(),
        month = now.getMonth() + 1,
        date = now.getDate(),
        hour = now.getHours(),
        minute = now.getMinutes(),
        second = now.getSeconds();
    return year + "/" + month + "/" + date + " " + hour + ":" + minute + ":" + second;
}

//执行弹窗
function diplayLotteryVideo () {
    bClose=false;

    //判断是否为pk10
    if(pk10Id==22){
        // 请求时间
        apiTimeBefore=new Date().getTime();
        getPK10InfoFirst();
    }
    var  preOpenNum=getData.pre.openNum
        ,preTurnNum=getData.pre.turnNum
        ,preopenTime=getData.pre.openTime
        ,curCloseTime=getData.cur.closeTime
        ,curTurnNum=getData.cur.turnNum
        ,serverTime=formatDate(getData.serverTime,'')
        ,serverTimeFormat=formatString(new Date(new Date(serverTime).getTime()));

    // 更新期数
    //PeriodsUpdate(curTurnNum,formatDate(curCloseTime,''),preTurnNum);
    var html= $($("#KaijiangPopupVideo_html").html());
    pk10PopupObject=new pk10video(html);
    if (getData && preTurnNum) {
        dialogData= {
            prePeriod: preTurnNum, //上期期号
            preResult: preOpenNum, //上期号码
            nowPeriod: curTurnNum,//本期期号
            startTime: formatString(preopenTime),  //本期开始时间
            nowResult: "",
            time: serverTimeFormat, //当前时间
            lottoTime: formatDate(curCloseTime,'lastTime') //本期结束时间
        };

        pk10Dialog = dialog({
            id: "pk10Dialog",
            title: "开奖视频",
            padding: 0,
            content: html,
            zIndex:99999,
            onclose: function () {
                this.remove(), $("#kaijiang").remove(),pk10PopupObject.close();
                bClose=true;
            }
        });
        pk10Dialog.showModal();
        if(!bClose){
            pk10PopupObject.display(dialogData);
        }
    }
}

//定时刷新
function RefreshData() {
    var getNewData={
        nowPeriod: getData.pre.turnNum,//本期
        nowResult: getData.pre.openNum,//本期
        nextPeriod: getData.cur.turnNum,//下期未开奖
        nextLottoTime:formatDate(getData.cur.closeTime,''),//下期未开奖
        time: formatDate(getData.serverTime,'')//服务器当前时间
    };
    pk10PopupObject.refresh(getNewData);
}

function pk10video(html) {
    var that = this;
    this.pk10Timer = null;
    this.RankTimer = null;
    this.soundSwict = true;
    this.rootElement = $(html);
    this.E = true;
    this.F = true;
    ////
    this.timeout = -1; //计时器
    this.nowPeriod = null; //当前(将要开奖)期数
    this.lotteryTime = "";
    this.hasLottery = false;
    ////
    this.D = {
        Stime: '',
        Timer: null,
        OverRank: [],
        K: 0,
        Bg: $('.bg', that.rootElement),
        Relay: $('.relay', that.rootElement),
        Flag: true,
        TimerRadom: 0,
        Car: $('dd', that.rootElement),
        Rank: [],
        ArrRank: null
    };

    $("#sound", this.rootElement).on("click", function () {
        that.setSound($(this));
    });

    $("#GOTAOLAND", this.rootElement).on("click", function () {
        pk10Dialog.close().remove();
        $("#kaijiang").remove();
        CloseInterval();
        diplayLotteryVideo();
    });
}
///打开弹出框
///{prePeriod, preResult, nowPeriod, nowResult, time, lottoTime}
pk10video.prototype.display = function(options) {
    // 游戏结束封盘
    if(getData.cur.status==1){
        $("#light .clock").html('封盘中...');
        return;
    }
    $('.pksp-periods span', this.rootElement).text('期数：' + options.prePeriod);
    if (options.nowPeriod - options.prePeriod > 1) {
        options.nowPeriod = options.prePeriod - 0 + 1;
        options.lottoTime = options.startTime;
    }
    $('#na', this.rootElement).text(options.nowPeriod);
    this.getkjTime(options.lottoTime);
    this.getkjHistory(options.preResult);
    this.nowPeriod = options.nowPeriod;
    this.lotteryTime = new Date(options.lottoTime);
    options.nowPeriod = options.prePeriod;
    this.refresh(options);

};
///刷新显示/时间矫正
///{prePeriod,preResult, nowPeriod, nowResult, time, lottoTime,nextLottoTime , nextPeriod}
pk10video.prototype.refresh = function (options) {
    var that = this;
    // if (that.timeout != -1) {
    //     clearTimeout(that.timeout);
    //     that.timeout = -1;
    // }
    if (that.hasLottery) return;
    //获取的本期与开奖期号一样，就停车
    if (that.nowPeriod == options.nowPeriod) {
        that.stop($.map(options.nowResult.split(","), function (val, idx) {
            return val - 0;
        }), options.nowPeriod, options.nextPeriod, options.nextLottoTime)
    }
    // 时间=关闭时间-服务器当前时间-请求时间
    var time = (getData.cur.closeTime - getData.serverTime-(apiTimeAfter-apiTimeBefore)) / 1000;
    if (time <= 0) {
        that.play("00:00");
        return;
    }

    var countDownId=setInterval(walk,1000);
    function walk() {
        if(bClose){
            clearInterval(countDownId);
            bClose=false;
            return;
        }
        var m = "" + Math.floor(time / 60);
        m = ("00" + m).substring(m.length);
        var s = "" + Math.floor(time % 60);
        s = ("00" + s).substring(s.length);
        that.play(m + ":" + s);
        --time;
        if(time<1){
          clearInterval(countDownId);
        }
    }

    // time = Math.floor(time);

    // (function walk(t) {
    //     if (t < 1) return;
    //     var m = "" + Math.floor(t / 60);
    //     m = ("00" + m).substring(m.length);
    //     var s = "" + Math.floor(t % 60);
    //     s = ("00" + s).substring(s.length);
    //     that.play(m + ":" + s);
    //     that.timeout = setTimeout(function() {
    //         walk(--t);
    //     }, 1000);
    // })(time);

};



///关闭弹出框
pk10video.prototype.close = function() {
    var that = this;
    if (that.timeout != -1) {
        clearTimeout(that.timeout);
        that.timeout = -1;
    }
    that.RankTimer && clearInterval(that.RankTimer);
    that.pk10Timer && clearTimeout(that.pk10Timer);
    CloseInterval();
    this.rootElement.find("audio").each(function(idx, ele) {
        ele.pause();
    });
};
pk10video.prototype.play = function (stime) {
    if (this.hasLottery) return;
    var T = this,
        s = stime.split(':');
    //T.getkjTime(); //下期开奖时间
    //T.getkjHistory(); //上期开奖结果
    $('#light .clock', this.rootElement).html(stime); //倒计时时钟
    $('.track-side', this.rootElement).show(); //显示赛道边
    $('.relay', this.rootElement).removeClass('running').addClass('paused'); //赛道移动
    if (T.D.Flag) {
        if (s[0] == '00') {
            if (parseInt(s[1]) <= 30 && parseInt(s[1]) != 4 && parseInt(s[1]) != 3 && parseInt(s[1]) != 2 && parseInt(s[1]) != 1 && parseInt(s[1]) != 0) {
                T.gotoLand();
                if (this.soundSwict) {
                    $("#ready", this.rootElement)[0].play();
                } else {
                    $("#ready", this.rootElement)[0].pause();
                };
            } else if (parseInt(s[1]) == 4) {
                if (this.soundSwict) {
                    $("#start", this.rootElement)[0].play();
                } else {
                    $("#start", this.rootElement)[0].pause();
                };
                $('.light-red .light-raglow', this.rootElement).hide();
            } else if (parseInt(s[1]) == 3) {
                $('.light-orange .light-oaglow', this.rootElement).show();
            } else if (parseInt(s[1]) == 2) {
                $('.light-orange .light-oaglow', this.rootElement).hide();
                $('.light-green .light-gaglow', this.rootElement).show();
            } else if (parseInt(s[1]) == 1 || parseInt(s[1]) == 0) {
                $('.closeOdd', this.rootElement).show(); //封盘
                $('.relay .car-item', this.rootElement).addClass('paused');
                $('#light', this.rootElement).hide();
                $('.begin', this.rootElement).removeClass('paused').addClass('running');
                //本期期号
                thisPre=getData.cur.turnNum;
                //下期期号
                nextPre=parseInt(thisPre) + parseInt(1);
                // 更新期数
                PeriodsUpdate(nextPre,nextTime,thisPre);

                if(pk10Id==22){
                    getPk10Data=setInterval(getPK10Info,2000);
                    refreshClear= setInterval(RefreshData,2000);
                }
                T.move();
                T.D.Flag = false;
                //if (parseInt(s[1]) == 0) {
                //    T.getRanking();
                //} else {
                this.RankTimer = setInterval(function() {
                    T.getRanking();
                }, 1000)
                //}
            };
        };

    };

};

pk10video.prototype.stop = function(OverRank, lastAc, thisAc, nexttime) {
    var T = this,
        _kjhao = [],
        action = ('#na', this.rootElement).text() - 0;
    this.E = true;
    this.F = true;
    //T.getkjTime();
    //T.getkjHistory();
    T.CountNum(OverRank);
    this.RankTimer && clearInterval(this.RankTimer);
    this.pk10Timer && clearTimeout(this.pk10Timer);
    //期号和号码对称才会停止
    if (T.D.K && OverRank.length) {
        this.hasLottery = true;
        $('#na', this.rootElement).text(thisAc);
        $('.nextTime #nt', this.rootElement).text(nexttime);
        $('.pksp-periods span', this.rootElement).text('期数：' + lastAc);

        $('.pksp-number li', this.rootElement).each(function (i) {
            $(this).attr('class', 'num-items')
                .addClass('carNum-' + (OverRank[i]-0))
            _kjhao.push(OverRank[i])
        });
        $('.relay', this.rootElement).css('animationPlayState', 'running').css('-webkit-animationPlayState', 'running');
        $('.side-bg', this.rootElement).addClass('paused');
        T.D.Bg.addClass('paused');
        $('.end', this.rootElement).removeClass('paused').addClass('running');
        var a = setTimeout(function() {
            $('.pksp-step1', this.rootElement).removeClass('on');
            $('.track-side', this.rootElement).hide();
            $('.pksp-step2', this.rootElement).addClass('on');
            $('.ranking-car .st', this.rootElement).attr('class', 'st car-winer-' + (OverRank[0] - 0));
            $('.ranking-car .nd', this.rootElement).attr('class', 'nd car-winer-' + (OverRank[1] - 0));
            $('.ranking-car .rd', this.rootElement).attr('class', 'rd car-winer-' + (OverRank[2] - 0));
            //document.getElementById('running').pause();
            $("#running", this.rootElement)[0].pause();
            clearTimeout(a);
        }, 2000);
        if (this.soundSwict) {
            //document.getElementById('clapping').play();
            $("#clapping", this.rootElement)[0].play();
        } else {
            //document.getElementById('clapping').pause();
            $("#clapping", this.rootElement)[0].pause();
        }
        T.D.Flag = true;
        return;
    };
};

pk10video.prototype.move = function() {
    var T = this;
    T.D.K = 1;
    T.D.Bg.removeClass('paused');
    $('.side-bg', this.rootElement).removeClass('paused');
    this.pk10Timer = setTimeout(function() {
        T.D.Rank.length = 0;
        if (T.soundSwict) {
            $("#ready", this.rootElement)[0].pause();
            $("#start", this.rootElement)[0].pause();
            $("#running", this.rootElement)[0].play();
        } else {
            $("#running", this.rootElement)[0].pause();
        };
        for (var i = 0; i < T.D.Car.length; i++) {
            if (!T.D.ArrRank) {
                T.D.Car[i].Distance = Math.floor(Math.random() * 601);
            }
            T.countSpeed(T.D.Car[i], T.D.Car[i].Distance, T.D.Car[i].prevDistAnce, function() {
                if (T.D.Stop == false) {
                    T.getRanking();
                }
            }.bind(T.D.Car[i]));
        }
        T.move();
    }, T.D.TimerRadom || 300)
    T.D.TimerRadom = 500 + (Math.floor(Math.random() * (6000 - 2000)));
};

pk10video.prototype.getRanking = function() {
    var cJson = [],
        T = this;
    if (this.hasLottery) return;
    $('dd', this.rootElement).each(function () {
        var cc = {};
        cc['c'] = $(this).data().num;
        cc['r'] = $(this).css('right').replace('px', '');
        cJson.push(cc);
    });
    cJson.sort(T.sortBy('r', false, parseInt));
    $('.pksp-number ul li', this.rootElement).each(function (i) {
        $(this).attr('class', 'num-items');
        $(this).addClass('carNum-' + (cJson[i].c-0))
    });
};

pk10video.prototype.countSpeed = function(Eml, Curreent, Prev, callBack) {
    var T = this,
        Obj = Eml,
        Bstop = true;
    clearInterval(Obj.Timers)
    Obj.Timers = setInterval(function() {
        var attrValue = T.GetStyle(Obj, 'right');
        attrValue = parseInt(attrValue.replace('px', ''));
        var Speed = (Curreent - attrValue) / 20;
        Speed = Speed > 0 ? Math.ceil(Speed) : Math.floor(Speed);
        if (attrValue != Curreent) {
            Bstop = false;
            if (attrValue > Curreent) {
                $(Obj).find('.car-speed').hide();
                $(Obj).find('.car-wheel1,.car-wheel2').removeClass('fast').addClass('slow');
            } else {
                $(Obj).find('.car-wheel1,.car-wheel2').removeClass('slow').addClass('fast');
                $(Obj).find('.car-speed').show();
            };
        } else {
            Bstop = true;
        };
        Obj.style['right'] = attrValue + Speed + "px";
        if (Bstop) {
            clearInterval(Obj.Timers);
            if (callBack) callBack();
            $(Obj).find('.car-wheel1,.car-wheel2').removeClass('fast').addClass('slow');
            $(Obj).find('.car-speed').hide();
        };
    }, 30);
};

/// 统计
pk10video.prototype.CountNum = function(data) {
    var $lh = [],
        $ds = [],
        $dx = [],
        $lu = [],
        len = 9,
        $count = {},
        $a = [],
        $b = [],
        $c = [],
        $d = [];
    var lu = [
        [3, 6, 9, 10],
        [1, 4, 7],
        [2, 5, 8]
    ];

    for (var i = 0; i < data.length; i++) {
        //龙虎
        if (i < 5) {
            if (data[i] > data[len]) {
                $lh.push('龙');
                $a.push('red');
            } else {
                $lh.push('虎');
                $a.push('blue');
            }
        };
        //单双
        if (data[i] % 2 == 0) {
            $ds.push('双');
            $b.push('red');
        } else {
            $ds.push('单');
            $b.push('blue');
        }
        //大小
        if (data[i] > 5) {
            $dx.push('大');
            $c.push('red');
        } else {
            $dx.push('小');
            $c.push('blue');
        }
        //012
        for (var j in lu) {
            if ($.inArray(parseInt(data[i]), lu[j]) != -1) {
                $lu.push(j);
                if (j == '0') {
                    $d.push('red');
                } else if (j == '1') {
                    $d.push('blue');
                } else if (j == '2') {
                    $d.push('green');
                }
            }
        };
        len = len - 1;
    };
    $count['lh'] = { 'a': $lh, 'b': $a };
    $count['ds'] = { 'a': $ds, 'b': $b };
    $count['dx'] = { 'a': $dx, 'b': $c };
    $count['lu'] = { 'a': $lu, 'b': $d };

    $('.closeOdd').hide();
    $('.tb1 table tbody tr').each(function(i) {
        $(this).find('.ball-item').each(function(j) {
            var _this = $(this);
            if (i%2 == 0) {
                var a = setTimeout(function() {
                    _this.attr('class', 'ball-item ' + $count['dx']['b'][j]).text($count['dx']['a'][j]);
                    clearTimeout(a);
                }, j * 300)

            } else {
                var a = setTimeout(function() {
                    _this.attr('class', 'ball-item ' + $count['ds']['b'][j]).text($count['ds']['a'][j]);
                    clearTimeout(a);
                }, j * 300)
            }
        })
    });
    $('.tb2 table tbody tr').each(function(i) {
        $(this).find('.ball-item').each(function(j) {
            var _this = $(this);
            if (i % 2 == 0) {
                var a = setTimeout(function() {
                    _this.attr('class', 'ball-item ' + $count['lh']['b'][j]).text($count['lh']['a'][j]);
                    clearTimeout(a);
                }, j * 300)

            } else {
                var a = setTimeout(function() {
                    _this.attr('class', 'ball-item ' + $count['lu']['b'][j]).text($count['lu']['a'][j]);
                    clearTimeout(a);
                }, j * 300)
            }
        })
    })
};

pk10video.prototype.setSound = function(el) {
    if (el.hasClass('sound-on')) {
        el.removeClass('sound-on').addClass('sound-off').attr('title', '点击开启声音');
        this.soundSwict = false;
    } else {
        el.removeClass('sound-off').addClass('sound-on').attr('title', '点击开启声音');
        this.soundSwict = true;
    }
};

pk10video.prototype.gotoLand = function() {
    this.pk10Timer = null;
    this.RankTimer = null;
    $('.relay', this.rootElement).removeAttr('style');
    $('.pksp-step2', this.rootElement).removeClass('on');
    $('.pksp-step1', this.rootElement).addClass('on');
    $('#light', this.rootElement).show();
    $('.end', this.rootElement).removeClass('running').addClass('paused');
    $('.begin', this.rootElement).removeClass('running').addClass('paused');

    $('.light-green .light-gaglow', this.rootElement).hide();
    $('.light-red .light-raglow', this.rootElement).show();
    $('.track-side', this.rootElement).show();
    var $r = 22;
    $('.relay dd', this.rootElement).each(function () {
        $(this).attr('style', 'right:' + $r + 'px');
        $(this).find('.car-wheel1,.car-wheel2').removeClass('slow');
        $r++;
    });
};

//下期开奖时间
pk10video.prototype.getkjTime = function(time) {
    if (this.E) {
        $('.nextTime #nt', this.rootElement).text(time);
        this.E = false;
    };
};

//取上期开奖号码
pk10video.prototype.getkjHistory = function (kjhao) {
    if (!kjhao) return;
    var T = this;
    if (this.F) {
        var kjhao = kjhao.split(',')
        kjhao = $.map(kjhao, function (val) {
            return val - 0;
        });
        $('.pksp-number li', this.rootElement).each(function (i) {
            $(this).attr('class', 'num-items')
                .addClass('carNum-' + kjhao[i])
        })
        T.CountNum(kjhao);
        this.F = false;
    }
};

pk10video.prototype.GetStyle = function(Obj, name) {
    return Obj.currentStyle ? Obj.currentStyle[name] : getComputedStyle(Obj, false)[name];
};

pk10video.prototype.sortBy = function(filed, rev, primer) {
    rev = (rev) ? -1 : 1;
    return function(a, b) {
        a = a[filed];
        b = b[filed];
        if (typeof(primer) != 'undefined') {
            a = primer(a);
            b = primer(b);
        }
        if (a < b) { return rev * 1; }
        if (a > b) { return rev * -1; }
        return 1;
    }
};