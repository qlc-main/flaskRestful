var token;

function login_success(data) {
    token = data.access_token;
    $('.login-page').hide("clip", {direction: "horizontal"}, 200, function () {
        $('.dashboard').show("clip", {direction: "horizontal"}, 200);
    });
}

$(function () {

    $('.dashboard').height($(window).height()-62);

    $('.login-page button').on('click', function (event) {
        event.preventDefault();
        let input = $('.login-form input')
        let user = input.val()
        let pass = input.next().val()
        $.ajax({
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            url: "/auth",
            data: JSON.stringify({username: user, password: pass}),
            success: login_success,
            error: function (data) {
                alert("login failed")
            }
        });
    });

});