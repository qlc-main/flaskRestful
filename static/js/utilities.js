var jwtToken = "";

function login_success(data) {
    jwtToken = data.access_token;
    $('.menu').show("slide", {direction: "right"}, 200, function () {
        $('#menu-dashboard').addClass('menu-active');
    });
    $('.login-page').hide("clip", {direction: "horizontal"}, 200, function () {
        $('.dashboard').show("clip", {direction: "horizontal"}, 200, function(){
            insert_item(12);
        });

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
            destroy_charts();
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
        url: "/login",
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
        headers: {"Authorization": 'Bearer ' + jwtToken},
        success: alert_json,
        error: alert_json
    });
}

function destroy_charts() {
    while (charts.length) {
        charts[charts.length - 1].destroy();
        charts.pop();
    }
    $('.items-page').empty();
}

function insert_item(count) {
    for (let i = 1; i <= count; i++) {
        $('.items-page').append(`<div class="item">
<div class="item-power-chart" id="power-chart-${i}"></div>
<div class="item-energy-chart" id="energy-chart-${i}"></div>
<div class="item-title">Meter ${i} - Apartment B</div>
</div>`);
        draw_item(i);
    }
}


$(function () {

    $('.dashboard, .sidebar, .items-page').height($(window).height() - $('.header').height());

    $('.login-page button').on('click', function (event) {
        event.preventDefault();
        ajax_auth_api();
    });

    $('.menu li').on('click', function (event) {
        $('.menu li').removeClass('menu-active');
        let thisTarget = event.target
        if (thisTarget.id == "menu-logout") {
            logout_success();
        } else {
            $(thisTarget).addClass('menu-active');
            destroy_charts();
            if (thisTarget.id == "menu-dashboard") {
                insert_item(12);
            }
            //ajax_get_api();
        }
    });

    $('.sidebar').sortable({
        items: "li"
    });

});