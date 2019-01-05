/**************** AJAX *******************/

function ajax_auth_api() {
    let input = $('.login-form input');
    let user = input.val();
    let pass = input.next().val();
    username = user;
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
    let input = $('.login-form input');
    let user = input.val();
    let pass = input.next().val();
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