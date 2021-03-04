// JavaScript Document

var aTab=function(opt){
    //settings
	
    var settings=jQuery.extend({
        tabHandleList:"#tabHnadle > li",//标签头
        tabBodyList:"#tabBody > li",//标签内容体序列
        isAutoPlay:false,//是否自动播放
        bind:"click",//标签绑定事件
        defIndex:0,//默认选中标签下标
        tabOnCssList:"#tabHnadle > li",//标签on样式添加点
		islrbnt:{
				isbnt:false,//是否需要左右按钮
				leftBnt:"#leftbnt",//左边按钮
				rightBnt:"#rightbnt"//右边按钮
			},
        tabOnCssName:"on",//
		tabonfx:"left",
		showsize:4,
		callBack:false,//回调
		mero:false,//是否要切换跟多按钮链接
		wanwidth:"0px",//wan时必须传
		bntauto:false,//幻灯片按钮自适应
		isauto:false,
		isFase:true,
		tabStyle:0//默认为零，可以选top,left,fade,gund,wan
    },opt);
    var isAutoPlay=settings.isAutoPlay,
	    mero=settings.mero,
        bind=settings.bind,
        defIndex=settings.defIndex,
		outbnt=settings.islrbnt,
		showsize=settings.showsize,
		bntauto=settings.bntauto,
		isauto=settings.isauto,
		wanwidth=settings.wanwidth,
		isbnt=outbnt.isbnt,
		tabonfx=settings.tabonfx,
		tabStyle=settings.tabStyle,
		$leftBnt=$(outbnt.leftBnt),
		$rightBnt=$(outbnt.rightBnt),
        $tabHandleList=$(settings.tabHandleList),
        tabOnCssName=settings.tabOnCssName,
        $tabOnCssList=$(settings.tabOnCssList),
        $tabBodyList=$(settings.tabBodyList),
		isFase=settings.isFase,
        callBack=settings.callBack;
    var maxSize=settings.tabHandleList!="no"?$tabHandleList.size():$tabBodyList.size();
	var handw=$tabHandleList.outerWidth(true);
	if(isauto)
	{
	$tabHandleList.parent().css({width:maxSize*handw+"px"});
	}
    var gotoIndex=function(i){
    	
		
        if(i>=maxSize){i=0;}else if(i<0){i=maxSize-1;}
		var step=0;
		var swep=0;
		var slt=settings.tabHandleList!="no"?$tabHandleList.eq(i).position().left:0;
		var stp=settings.tabHandleList!="no"?$tabHandleList.eq(i).position().top:0;
		if(tabStyle=="left"){step=$tabBodyList.outerWidth(true) }else if(tabStyle=="top"){step=$tabBodyList.outerHeight(true)}
		if(tabStyle=="gund"){if(outbnt.sTyle){swep=$tabHandleList.outerHeight(true);}else{swep=$tabHandleList.outerWidth(true);}}
		if(tabOnCssName!=="on")
		{
			if(tabonfx=="left")
			{
			var zleft=$tabOnCssList.eq(i).parent().position().left+$tabOnCssList.eq(i).position().left-1+"px";
			$(tabOnCssName).stop(true).animate({left:zleft},500)
			}else{$(tabOnCssName).stop(true).animate({top:stp+"px"},500)};
		}else{
        $tabOnCssList.eq(i).addClass(tabOnCssName).siblings(this).removeClass(tabOnCssName);
		}
		if(mero){var shref=$tabOnCssList.eq(i).attr("rel");$tabOnCssList.parent().children(".more").attr("href",shref);}
		switch(tabStyle){
				case "top":
					//$tabBodyList.eq(defIndex).stop(true,true).slideUp("normal");
        			//$tabBodyList.eq(i).stop(true,true).slideDown("normal");
					sleft=-step*i+"px";
					$tabBodyList.eq(i).parent().stop(true).animate({top:sleft},1000)
					break;
				case "left":
				    sleft=-step*i+"px";
					$tabBodyList.eq(i).parent().stop(true).animate({left:sleft},1000)
					break;
				case "gund":
				   
				   if(i>=(showsize-1))
				    {
					 var n=i-(showsize-2);
                     if(i==(maxSize-1)){
						n=i-(showsize-1);
						}
					}else{n=0;}
					
				    sleft=-swep*n+"px";
					if(outbnt.sTyle)
					{
						$tabHandleList.parent().stop(true).animate({top:sleft},500)
					}else{
						$tabHandleList.parent().stop(true).animate({left:sleft},500)
					}
					$tabBodyList.eq(i).siblings(this).fadeOut(500).end().stop( true, true ).fadeIn(800);
					break;
				case "fade":
				    $tabBodyList.eq(i).siblings(this).fadeOut(500).end().stop( true, true ).fadeIn(800);
					
					break;
				case "wan":
				$tabBodyList.eq(defIndex).stop(true).animate({width:"0px"},500);	
				$tabBodyList.eq(i).stop(true).animate({width:wanwidth},500);	
				
				
				break;		
				default:
				$tabBodyList.hide();
        		$tabBodyList.eq(i).show();
			}   
        defIndex=i;
        if(callBack) callBack(i);
        return false;
    };
	if(isFase)
	{
		$tabBodyList.eq(defIndex).css({display:"block"});
		$tabOnCssList.eq(defIndex).addClass(tabOnCssName).siblings().removeClass("on");
	}
    //gotoIndex(defIndex);
    $tabHandleList.each(function(i){
        $(this).bind(bind,function(){if(defIndex!=i){gotoIndex(i)};});
    });
    //auto
    var timerID;
    var autoPlay=function(){
		window.clearInterval(timerID);
        timerID=window.setInterval(function(){
            var temp=defIndex+1;
            gotoIndex(temp);
        },isAutoPlay.time);
    };
    var autoStop=function(){
        window.clearInterval(timerID);
    };
    if(isAutoPlay){
        autoPlay();
        //$tabHandleList.hover(autoStop,autoPlay);
        $tabBodyList.hover(autoStop,autoPlay);
		$leftBnt.hover(autoStop,autoPlay);
		$rightBnt.hover(autoStop,autoPlay);
		$tabHandleList.parent().hover(autoStop,autoPlay);
    }
	if(isbnt)
	{
	$rightBnt.bind("click",function(){

		 var temp=defIndex+1;
            gotoIndex(temp);
	   });
	$leftBnt.bind("click",function(){
		
		 var temp=defIndex-1;
            gotoIndex(temp);
	   });   
	}
    //return
    return {gotoIndex:gotoIndex,defIndex:defIndex};
};
$(function(){
$("button").hover(function(){
	$(this).addClass("on");
},function(){
$(this).removeClass("on");
})
})

var aTab1=function(opt){
    //settings
    var settings=jQuery.extend({
        tabHandleList:"#tabHnadle > li",//标签头
        tabBodyList:"#tabBody > ul",//标签内容体序列
		tabBody:"li",//目标标签  （默认为li）
        bind:"click",//标签绑定事件
        index:0,//默认选中标签下标(可不传)
		gTime:100,//默认效果执行时间（可不传）
		mobile:300,//运动目标
		direction:"left",//运动类型（可选：left,top;默认为left）
		dires:"" //运动类型（poto特别制作）
    },opt);
    var bind=settings.bind,
        index=settings.index,
		tabBody=settings.tabBody,
		gTime=settings.gTime,
		dires=settings.dires,
		mobile=settings.mobile,
		direction=settings.direction,
        $tabHar=$(settings.tabHandleList),
        $tabCon=$(settings.tabBodyList),
        callBack=settings.callBack;
	var $conLi=$tabCon.children(tabBody),lang=$tabCon.children(tabBody).size(),state=true,List=[];
	for(var i=0; i<lang; i++)
	{
		var l=$conLi.eq(i).position().left;
		var t=$conLi.eq(i).position().top;
		List[i]={left:l,top:t};
			
	}
	for(var i=0; i<lang; i++)
	{
	$conLi.eq(i).css({position:"absolute",left:List[i].left+"px",top:List[i].top+"px"});
	}
	$tabCon.eq(index).siblings(this).hide();
	$tabHar.on(bind,function(){
		var id=$(this).index();
		if(id==index||!state) return;
		state=false;
		$(this).addClass("on").siblings(this).removeClass("on");
		var n=$tabCon.eq(index).children(tabBody).size()-1;
		var pH=$tabCon.eq(index).height()+mobile;
		clearInterval(time);
		var time=window.setInterval(function(){
		var sTime=direction=="top"?(gTime*n+1)*4/5:gTime*3;
		var amt=direction=="top"?{top:pH+"px",opacity:0}:{left:mobile+"px",opacity:0};
		$tabCon.eq(index).children(tabBody).eq(n).animate(amt,sTime,function(){
			if($(this).index()==0)
			{
			$tabCon.eq(index).hide();	
			
			show(id);
			}
		})
		
		if(n>0)
		{
		n--;
		}else{
			
			clearInterval(time);
		}
		//console.log(n);
		},100)	
	})
	function show(a){
		$tabCon.eq(a).show();
		    var liH=$tabCon.eq(a).children(tabBody).outerHeight(true);
			var sty=direction=="top"?{top:-mobile+"px",opacity:0}:{left:-mobile+"px",opacity:0};
			$tabCon.eq(a).children(tabBody).css(sty);
			//var pvsize=a>0?a*$tabCon.eq(a-1).children(tabBody).size():a*$tabCon.eq(a).children(tabBody).size();
			//console.log($tabCon.eq(index).children(tabBody).index());
			var n=(direction=="top" || dires=="poto")?$tabCon.eq(a).children(tabBody).size()-1:0;
			clearInterval(time);
			var time=window.setInterval(function(){
				 //console.log(List[n]);
			var tj=n>0;
			var tj=(direction=="top" || dires=="poto")?n>0:n<$tabCon.eq(a).children(tabBody).length;
			
			var sTime=direction=="top"?(gTime*n+1)*4/5:gTime*3;
			
			var amt=direction=="top"?{top:liH*n+"px",opacity:1}:{left:List[n].left+"px",opacity:1};	
			$tabCon.eq(a).children(tabBody).eq(n).animate(amt,sTime)
			if(tj)
			{
			n=(direction=="top" || dires=="poto")?n-1:n+1;
			}else{
			clearInterval(time);
			index=a;
			state=true;
			}
			},100)	
		}
}

