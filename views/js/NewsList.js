/**
 * Created by tpd on 2017/10/23.
 */

// 最新公告
var rollNotice = ""
$(function () {
  // 公告
  $.getJSON("/data/json/notice.json",
    function (result) {
      if (result.roll_notice.noticeContent != null&& result.roll_notice.noticeContent != "") {
        rollNotice = result.roll_notice.noticeContent
        if ($("#indexNotice")) {
          $("#indexNotice").text(rollNotice);
        }
      }
      else
      {
        $("#indexNotice").text("暂无公告");
      }
    }
  )

  //  信用,官方玩法菜单
  $.getJSON('/v/lottery/getAllOpenInfo', function (result) {
    CreditOffcial(result);
  })
})

//  公告
function showNotice() {
  if(rollNotice!=""){
    layer.open({
      type: 1,
      title:"温馨提示",
      area: ['500px', 'auto'],
      btn:['确认'],
      content: '<div style="padding: 20px;font-size:16px;">'+rollNotice+'</div>',
    });
  }
}

// 查看中奖
function  GetDraw() {
  $.getJSON("/v/lottery/getNoticeWinMessage",
    function (response) {
      var content = '',
          contentTitle = "<div class='DrawWrap'><span style='color: #000;'>姓名</span><span style='color: #000;'>彩种</span><span style='color: #000;'>金额</span></div>";
      if (response != null || response != "")
      {
        $.each(response,function (index,data){
          content += "<div class='DrawWrap'><span>"+data.name+"</span><span>"+data.gameName+"</span><span>"+(+(data.winMoney))*10+"元</span></div>"
        })
        content = contentTitle + content;
      }
      layer.open({
        type: 1,
        scrollbar: false,
        title: '中奖信息',
        closeBtn: 1,
        area: ['620px', '400px'],
        content: content
      })
    }
  )
}

//  快速充值
function QuickRechange() {
    window.open("http://www.mtcfu.com/");
}

//  二级菜单
function CreditOffcial(result) {
  var  GC_li= "",
      XY_li = "";
  for (var i = 0;i < result.length;i ++)
  {
    if (result[i].game.open === 0) {
        if (result[i].game.isCredit === 1) {

            XY_li += '<a href="/data/game/'+result[i].game.code+'/index.html">'
                +'<div style="background:url(/page/game/img/'+result[i].game.code+'.png) no-repeat center center;background-size: 60%"></div><div>'+result[i].game.name+'</div></a>';

        }
        if (result[i].game.isOffcial=== 1)
        {
            GC_li += '<a href="/data/game/'+result[i].game.code+'/index_official.html">'
                +'<div style="background:url(/page/game/img/'+result[i].game.code+'.png) no-repeat center center;background-size: 60%"></div><div>'+result[i].game.name+'</div></a>';
        }
    }
  }

  $(".GCContent").empty().html(GC_li);
  $(".XYContent").empty().html(XY_li);

}