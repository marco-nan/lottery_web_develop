if (system_config && system_config.visitors_can_use_cp_view && system_config.visitors_can_use_cp_view == "0" && !$.cookie("token")) {
    window.location.href = '/views/html/login.html';
}