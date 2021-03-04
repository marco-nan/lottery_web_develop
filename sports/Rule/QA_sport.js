function MM_jumpMenu(targ,selObj,restore){ //v3.0
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}
function chg_roul(url){
	location = url;
	//pagename=
	//w=800;
//	h=428;	
//	window.open(url,pagename,'location=no,status=no,width='+w+',height='+h+',toolbar=no,top=0,left=0,scrollbars=yes,resizable=yes,personalbar=yes');
//	window.close();
}
