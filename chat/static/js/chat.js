$(function(){
	var temp_form = document.createElement("form");
	temp_form.action = "/api/chat/web";
	temp_form.target = "_self";
	var input = document.createElement('input');
	input.type = 'hidden';
	input.name = 'domainAttr';
	input.value = window.location.protocol+"//"+window.location.host;
	temp_form.appendChild(input);
	document.body.appendChild(temp_form);
	temp_form.submit();
});