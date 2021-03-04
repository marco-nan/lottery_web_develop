/**
 * 获取根域名
 * @returns
 */
function getRootDomain() {
	var domain = '';
	var tmp = location.hostname.split('.');
	if (tmp.length > 2)
		domain = tmp.slice(tmp.length - 2).join('.');
	else
		domain = tmp.join('.');
	return domain;
}

function isDevelop(){
	var domain=document.domain;
	if(domain=="127.0.0.1"||domain=="localhost"){
		return true;
	}
	return false;
}

/**
 * 获取静态资源域名
 */
function getStaticDomain(){
	if(isDevelop()){
		return "http://localhost:89/static/"
	}else{
//		var domain=document.domain;
//		var urls=domain.split(".");
//		if(urls[0]=="sw"){
//			return "http://staticsw."+getRootDomain()+"/";
//		}
		return "http://static."+getRootDomain()+"/";
	}
}

/**
 * 获取正式的静态资源域名
 * @returns {String}
 */
function getOfficialStaticUrl(){
	if(isDevelop()){
		return "http://localhost:89/static/"
	}else{
		return "http://static."+getRootDomain()+"/";
	}
}


/**
 * 获取试玩域名
 */
function getTrialWebDomain(){
	if(isDevelop()){
		return "http://localhost"
	}else{
		return "http://sw."+getRootDomain()+"";
	}
}

/**
 * 获取游戏域名
 */
function getWebDomain(){
	if(isDevelop()){
		return "http://localhost"
	}else{
		return "http://game."+getRootDomain()+"";
	}
}

/**
 * 获取推广域名
 */
function getMainDomain(){
	if(isDevelop()){
		return "http://localhost:81"
	}else{
		return "http://www."+getRootDomain()+"";
	}
}

/**
 * 获取代理后台域名
 */
function getDlAdminDomain(){
	var url= "http://dl."+getRootDomain()+"";
	return url;
}

function agentLoginUrl(){window.open(getDlAdminDomain());}


function SetHome(obj,url){
    try{
        obj.style.behavior='url(#default#homepage)';
        obj.setHomePage(url);
    }catch(e){
        alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【"+url+"】设置为首页。");
    }
}

