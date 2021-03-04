

$(function () {

    var gameType = getQueryString('gameType');
    if (gameType === null)
    {
        gameType = 'mg'
    }
    else
    {
        $(".eleHeader ul").find('li').removeClass('eleTabStyle');
        $("#game"+gameType).addClass("eleTabStyle");
    }
    switch (gameType) {
        case "pt":
            $(".gameDeilte").hide();
            break;
        case "bbin":
            $(".gameDeilte").hide();
            break;
        case "ag":
            $(".gameDeilte").hide();
            break;
        case "mg":
            $(".gameDeilte").show();
            break;
    }
    var _data = {
            liveCode: gameType,
            page: 1,
            rows: 15,
            isFlash: 0
        };

    secrchAgGameDelite(_data);
    $(".search-input-wrap,.TabContent").show();

    /***
     **   切换游戏种类
     */
    $(".gameTab").on("click", function () {

        gameType = $(this).context.type;

        $(".gameTab").removeClass("eleTabStyle");
        $(this).addClass("eleTabStyle");

        if (gameType == "agby") {
            $(".search-input-wrap,.TabContent").hide();
            $(".agbyWrap").show();
            return false;
        }
        else {
            $(".search-input-wrap,.TabContent").show();
            $(".agbyWrap").hide();
        }

        $(".nowPage").text(1);
        switch (gameType) {
            case "pt":
                $(".gameDeilte").hide();
                break;
            case "bbin":
                $(".gameDeilte").hide();
                break;
            case "ag":
                $(".gameDeilte").hide();
                break;
            case "mg":
                $(".gameDeilte").show();
                break;
        }
        _data = {
            liveCode: gameType,
            page: 1,
            rows: 15,
            isFlash: 0
        };
        secrchAgGameDelite(_data);
    });

    /***
     **   所有游戏
     */
    $(".allGames").on("click", function () {
        $(".nowPage").text(1);
        _data = {
            liveCode: gameType,
            page: 1,
            rows: 15,
            isFlash: 0
        };
        secrchAgGameDelite(_data);
    });

    /***
     **   拉霸 / 桌面游戏 / 视频扑克 / 其它游戏
     */
    $(".gameDeilte").on("click", function () {
        var gameTypeNo = $(this).attr("type");
        $(".nowPage").text(1);
        _data = {
            liveCode: gameType,
            gameKind: gameTypeNo,
            page: 1,
            rows: 15,
            isFlash: 0
        };
        secrchAgGameDelite(_data);
    });

    /***
     **  模糊查询
     */

    $(".searchBtn").on("click", function () {
        var searchValue = $.trim($(".searchValue").val());
        $(".nowPage").text(1);
        if (searchValue === "") {
            layer.alert("请输入关键字");
            return false;
        }
        _data = {
            liveCode: gameType,
            chineseName: searchValue,
            page: 1,
            rows: 15,
            isFlash: 0
        };
        secrchAgGameDelite(_data);
    });

    /***
     **  首页
     */
    $(".indexPage").on("click", function () {
        var nowPage = parseInt($(".nowPage").text());
        if (nowPage === 1) {
            layer.alert('亲,已经是首页了!');
            return false;
        }
        $(".nowPage").text(1);
        _data.page = 1;
        secrchAgGameDelite(_data);
    });

    /***
     **  上一页
     */
    $(".prev").on("click", function () {
        var nowPage = parseInt($(".nowPage").text()),
            tatlePage = parseInt($(".tatlePage").text());
        if (nowPage <= 1) {
            layer.alert('亲,已经是第一页了!');
            return false;
        }
        $(".nowPage").text(nowPage - 1);
        _data.page = nowPage - 1;
        secrchAgGameDelite(_data);
    });

    /***
     **  下一页
     */
    $(".next").on("click", function () {
        var nowPage = parseInt($(".nowPage").text()),
            tatlePage = parseInt($(".tatlePage").text());
        if (nowPage >= tatlePage) {
            layer.alert('亲,已经是最后一页了!');
            return false;
        }
        $(".nowPage").text(nowPage + 1);
        _data.page = nowPage + 1;
        secrchAgGameDelite(_data);
    });

    /***
     **  尾页
     */
    $(".footerPage").on("click", function () {
        var nowPage = parseInt($(".nowPage").text()),
            tatlePage = parseInt($(".tatlePage").text());
        if (nowPage === tatlePage) {
            layer.alert('亲,已经是最后一页了!');
            return false;
        }
        $(".nowPage").text(tatlePage);
        _data.page = tatlePage;
        secrchAgGameDelite(_data);
    });

});

/***
 **   查询所有游戏
 */

function secrchAgGameDelite(_data) {
    $("#eleload").show();      //  显示加载层
    $.ajax({
        url: "/api/live/qst",
        type: 'get',
        data: _data,
        success: function (response) {
            $(".MGAllGameDelite").empty();
            $.each(response.data, function (index, _result) {

                $("<li/>", {
                    "class": "",
                    "onclick": "entereleGame(this)",
                    "liveCode": _result.liveCode,
                    "gameType": _result.gameType,
                    "gameKind": _result.gameKind,
                    html: "<div class='gamename'>" + _result.chineseName + "</div>"
                    + "<div class='gamepic'><img src='/data/gamePicture/"
                    + _result.imageName + "'</div>"
                }).appendTo($(".MGAllGameDelite"));

            });
            $("#eleload").hide();      //  加载 完成
            $(".tatlePage").text(Math.ceil(response.totalCount / 15));
        },
        error: function () {
            layer.alert("游戏列表获取失败!")
        }
    })
}

/***
 **   获取url 参数 判断游戏种类
 */

function getQueryString(gameType) {
    var reg = new RegExp("(^|&)" + gameType + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

/***
 *   ag 捕鱼  游戏帮助
 */

function agbyGamehelp(_this, _type) {
    var _area = [],
        _title = "",
        _imgSrc = "";

    switch (_type) {
        case 1:
            _area = ['678px', '468px'];
            _title = "界面说明";
            _imgSrc = "tab_img1";
            helpContent(_area, _title, _imgSrc);
            break;
        case 2:
            _area = ['678px', '372px'];
            _title = "操作说明";
            _imgSrc = "tab_img2";
            helpContent(_area, _title, _imgSrc);
            break;
        case 3:
            _area = ['678px', '380px'];
            _title = "鱼的说明";
            _imgSrc = "tab_img3";
            helpContent(_area, _title, _imgSrc);
            break;
        case 4:
            _area = ['678px', '380px'];
            _title = "炮的说明";
            _imgSrc = "tab_img4";
            helpContent(_area, _title, _imgSrc);
            break;
        case 5:
            _area = ['678px', '380px'];
            _title = "图表说明";
            _imgSrc = "tab_img5";
            helpContent(_area, _title, _imgSrc);
            break;
    }
}

/***
 **   AG捕鱼 帮助  弹窗
 */

function helpContent(_area, _title, _imgSrc) {
    layer.open({
        skin: 'demo-class1',
        title: _title,
        shadeClose: true,
        type: 1,
        area: _area,
        content: '<div class="PicWrap"><img src="/views/img/' + _imgSrc
        + '.jpg" style=""></div>'
    });
}
