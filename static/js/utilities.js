var jwtToken = "";

function login_success(data) {
    jwtToken = data.access_token;
    $('.menu').show("slide", {direction: "right"}, 200);
    $('.login-page').hide("clip", {direction: "horizontal"}, 200, function () {
        $('.dashboard').show("clip", {direction: "horizontal"}, 200);
    });
}

function login_fail(data) {
    $('.login-message').text("Invalid Credentials").show();
}

function logout_success() {
    if (jwtToken) {
        jwtToken = "";
        $('.menu').hide("slide", {direction: "right"}, 200);
        $('.dashboard').hide("clip", {direction: "horizontal"}, 200, function () {
            $('.login-page').show("clip", {direction: "horizontal"}, 200);
        });
    }
}

function ajax_auth_api() {
    let input = $('.login-form input')
    let user = input.val()
    let pass = input.next().val()
    input.val("");
    $('.login-message').hide();
    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        url: "/auth",
        data: JSON.stringify({username: user, password: pass}),
        success: login_success,
        error: login_fail
    });
}

function alert_json(data) {
    alert(JSON.stringify(data));
}

function ajax_get_api() {
    let input = $('.login-form input')
    let user = input.val()
    let pass = input.next().val()
    input.val("");
    $('.login-message').hide();
    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        url: "/item/chair",
        headers: {"Authorization": 'JWT ' + jwtToken},
        success: alert_json,
        error: alert_json
    });
}


$(function () {

    $('.dashboard').height($(window).height() - $('.header').height());

    $('.login-page button').on('click', function (event) {
        event.preventDefault();
        ajax_auth_api();
    });

    $('.menu li').on('click', function (event) {
        $('.menu li').removeClass('menu-active');
        if (event.target.id == "menu-logout") {
            logout_success();
        } else {
            $(event.target).addClass('menu-active');
            //ajax_get_api();
        }
    });


});