var jwtToken = "";

function login_success(data) {
    jwtToken = data.access_token;
    $('.menu').show("slide", {direction: "right"}, 200, function () {
        $('#menu-dashboard').addClass('menu-active');
    });
    $('.login-page').hide("clip", {direction: "horizontal"}, 200, function () {
        $('.dashboard').show("clip", {direction: "horizontal"}, 200);
        insert_item(1);
        insert_item(2);
        insert_item(3);
        insert_item(4);
        insert_item(5);
        insert_item(6);
        insert_item(7);
        insert_item(8);
        insert_item(9);
        insert_item(10);
        insert_item(11);
        insert_item(12);

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

function destroy_charts(){
    for (let i=0; i<charts.length; i++) {
        charts[i].destroy();
    }
    $('.items-page').empty();
}

function insert_item(i) {
    $('.items-page').append(`<div class="item">
<div class="item-power-chart" id="power-chart-${i}"></div>
<div class="item-energy-chart" id="energy-chart-${i}"></div>
<div class="item-title">Meter ${i} - Apartment B</div>
</div>`);
    draw_item(i);
}


$(function () {

    $('.dashboard, .sidebar, .items-page').height($(window).height() - $('.header').height());

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

    $('.sidebar').sortable({
          items: "li"
    });

});