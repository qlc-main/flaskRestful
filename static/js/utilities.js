let jwtToken = "";
let dialog;


/**************** LOGIN *******************/

function login_success(data) {
    jwtToken = data.access_token;
    $('.login-form input').val("");
    $('.login-message').hide();
    $('.login-page').hide("clip", {direction: "horizontal"}, 200, function () {
        $('.dashboard').show("clip", {direction: "horizontal"}, 200, function () {
            load_menu_options();
        });

    });
}

function login_fail(data) {
    $('.login-form input').val("");
    $('.login-message').text("Invalid Credentials").show();
}

function logout_success() {
    if (jwtToken) {
        jwtToken = "";
        $('#menu-list').hide("slide", {direction: "right"}, 200);
        $('.dashboard').hide("clip", {direction: "horizontal"}, 200, function () {
            $('.login-page').show("clip", {direction: "horizontal"}, 200);
        });
    }
}


/************* MENU & SIDEBAR **************************/

function load_menu_items(menuList) {

    $('#menu-list').empty().append(html_menu_items(menuList));

    $('#menu-list li').on('click', function (event) {
        $('#menu-list li').removeClass('menu-active');
        remove_item_charts();
        let thisTarget = event.target;
        $(thisTarget).addClass('menu-active');
        load_dashboard_controller(thisTarget.id);
    });

    // DEFAULT MENU LOAD OPTION
    $('#menu-list').show("slide", {direction: "right"}, 200, function () {
        $('#menu-phase-diagnostics').addClass('menu-active');
        load_diagnostic_items(12);
        load_sidebar_items(sidebarItemsDiagnostics);
    });
}

function load_sidebar_items(listObject) {

    $('#filter-list').slideUp(200, function () {
        $('#filter-list').empty().append(html_sidebar_items(listObject)).slideDown(200);

        $('.sidebar .filter-parameter').on('click', function (event) {
            if ($(this).find('.sidebar-icon-expand').hasClass('fa-caret-down')) {
                $(this).find('.sidebar-icon-expand').removeClass('fa-caret-down').addClass('fa-caret-right');
            } else {
                $(this).find('.sidebar-icon-expand').removeClass('fa-caret-right').addClass('fa-caret-down');
            }
            $(this).parent('li').find('ul').slideToggle(200);
        });
    });
}


/************* CHARTS **************************/

function show_harmonic_chart(targetID) {
    dialog.dialog("open");
    render_harmonic_sparkchart("dialog", get_harmonics(20, 100));
}

function remove_item_charts() {
    delete_item_charts();
    $('#items-page').empty();
}

function load_diagnostic_items(count) {

    remove_item_charts();

    for (let i = 0; i < count; i++) {
        $('#items-page').append(html_phase_item(i, "Apt-" + i));
        render_phase_chart(i, get_phases());
        render_harmonic_sparkchart(i, get_harmonics(20, 100));
    }

    $('.item-title').on('click', function (event) {
        show_harmonic_chart(event.target.id);
    });
}

function load_network_chart() {
    $('#items-page').width($('.dashboard').width() - $('.sidebar').width());
    render_network_chart();
}

/**************** WINDOW EVENTS *******************/

function resize_components() {
    dialog.dialog("option", "position", {my: "center", at: "center", of: $('#items-page')});
    $('.dashboard, .sidebar, #items-page').height($(window).height() - $('.header').height());
    $('#harmonic-chart-dialog').height(dialog.dialog("option", "height") - 100);
    $('#harmonic-chart-dialog').width(dialog.dialog("option", "width") - 100);
}

/**************** ON READY *******************/

$(function () {

    $(window).resize(function () {
        resize_components();
    });

    $('.dashboard, .sidebar, #items-page').height($(window).height() - $('.header').height());

    $('.login-page button').on('click', function (event) {
        event.preventDefault();
        ajax_auth_api();
    });


    $('#search-input').autocomplete({
        source: filterValues
    });

    $('.sidebar > ul').sortable({
        axis: 'y',
        handle: '.sidebar-icon-sort',
        placeholder: 'sort-placeholder'
    });

    dialog = $("#dialog-confirm").dialog({
        autoOpen: false,
        resizable: false,
        height: 0.8 * ($(window).height() - $('.header').height()),
        width: 0.8 * ($(window).width() - $('.sidebar').width()),
        position: {my: "center", at: "center", of: $('#items-page')},
        modal: true,
        buttons: {
            "OK": function () {
                $(this).dialog("close");
            }
        }
    });

    $('#harmonic-chart-dialog').height(dialog.dialog("option", "height") - 150);
    $('#harmonic-chart-dialog').width(dialog.dialog("option", "width") - 100);

});