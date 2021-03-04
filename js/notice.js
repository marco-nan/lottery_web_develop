var noticeManager = function () {
    getNoticeAndLogin = function(func) {
        var noticeJson = HttpUtil.ajaxAsync(HttpUtil.baseUrl+"/data/json/notice.json?t="+Math.random());
        if(noticeJson!=null&&noticeJson!=""&&noticeJson.login_notice!=null&&noticeJson.login_notice!="") {
            var option = {
                title: noticeJson.login_notice.noticeTitle
            }
            layer.open({
                type: 1,
                area: ['500px', 'auto'],
                btn:['确认'],
                content: '<div style="padding: 20px;font-size:16px;">'+noticeJson.login_notice.noticeContent+'</div>',
                yes:function (index, layero) {
                    func()// 跳转
                },
                cancel : function (index) {
                    func();
                }
            });
        }else{
            func();
        }
    }
    return{getNoticeAndLogin:getNoticeAndLogin}
}();