let jwtToken = "";
let dialog;

let username = "";

/******** WILL BE REPLACED BY ACTUAL DATA FROM SERVER *****/

let menuItemsAdmin = [
    "Logout",
    "Admin",
    "Settings",
    "Device Map",
    "Status",
    "Phase Diagnostics",
    "Metering"
];

let menuItemsTech = [
    "Logout",
    "Commissioning",
    "Status",
    "Phase Diagnostics"
];

let menuItemsBilling = [
    "Logout",
    "Status",
    "Metering"
];

let filterValues = [
    "Alfred's Apartment",
    "Bruce's Apartment",
    "Gordon's Apartment",
    "Energy",
    "Reactive Energy",
    "Active Energy"
];

let sidebarItemsMetering = {
    settings: {
        sortable: true,
        checkbox: false
    },
    categories: [
        {
            name: 'Device Name',
            items: [
                {name: 'Bravo-2P'},
                {name: 'Minicloset-5'},
                {name: 'QLic-E'}
            ]
        },
        {
            name: 'Device Type',
            items: [
                {name: 'Elec. Submeter'},
                {name: 'Energy Monitor'}
            ]
        },
        {
            name: 'Point Label',
            items: [
                {name: 'Apt-1'},
                {name: 'Apt-2'},
                {name: 'Apt-3'}
            ]
        }
    ]
};

let sidebarItemsDiagnostics = {
    settings: {
        sortable: true,
        checkbox: false
    },
    categories: [
        {
            name: 'Device Name',
            items: [
                {name: 'Bravo-2P'},
                {name: 'Minicloset-5'},
                {name: 'QLic-E'}
            ]
        },
        {
            name: 'Point Label',
            items: [
                {name: 'Apt-1'},
                {name: 'Apt-2'},
                {name: 'Apt-3'}
            ]
        },
        {
            name: 'Voltage',
            items: [
                {name: 'Value'},
                {name: 'Delta'},
                {name: 'Frequency'},
                {name: 'Harmonics'}
            ]
        },
        {
            name: 'Current',
            items: [
                {name: 'Value'},
                {name: 'Angle'},
                {name: 'Harmonics'}
            ]
        },
    ]
};

let sidebarItemsStatus = {
    settings: {
        sortable: false
    },
    categories: [
        {
            name: 'Upstream',
            items: [
                {name: 'QLoud API'},
                {name: 'MODBUS IP'},
                {name: 'BACNet IP'}
            ]
        },
        {
            name: 'Planar',
            items: [
                {name: 'G3PLC'},
                {name: 'BPLC'},
                {name: 'Digi Radio'},
                {name: 'LoRa'}
            ]
        },
        {
            name: 'Downstream',
            items: [
                {name: 'Pulse In'},
                {name: 'MBus'},
                {name: 'MODBUS RTU'},
                {name: 'DLSM/COSEM'}
            ]
        },
        {
            name: 'Device Type',
            items: [
                {name: 'QNect'},
                {name: 'Meters'}
            ]
        }
    ]
};

let sidebarItemsCommissioning = {
    settings: {
        sortable: false
    },
    categories: [
        {
            name: 'Steps',
            items: [
                {name: 'Step 1'},
                {name: 'Step 2'},
                {name: 'Step 3'}
            ]
        },
        {
            name: 'CT',
            items: [
                {name: 'CT-1'},
                {name: 'CT-2'},
                {name: 'CT-3'}
            ]
        }
    ]
};

let sidebarItemsSettings = {
    settings: {
        sortable: false
    },
    categories: [
        {
            name: 'Network',
            items: [
                {name: 'IP Address'},
                {name: 'Remote Server'},
                {name: 'Local Server'}
            ]
        },
        {
            name: 'Connections',
            items: [
                {name: 'Ethernet'},
                {name: 'WiFi'},
                {name: 'Bluetooth'},
                {name: 'RS-485'},
                {name: 'PLC'},
                {name: 'Pulse'},
                {name: 'MBus'}
            ]
        },
        {
            name: 'Users',
            items: [
                {name: 'Create New'},
                {name: 'Edit Existing'}
            ]
        },
        {
            name: 'Storage',
            items: [
                {name: 'Database'}
            ]
        }
    ]
};

let sidebarItemsOther = {
    categories: []
};

function get_power() {

    let phase_count = 3;

    let phases = [];
    let total_active = 0;
    let total_reactive = 0;
    let total_apparent = 0;
    let total_current = 0;

    for (let i = 0; i < phase_count; i++) {

        let voltage = 120 + 2 * 5 * ((Math.random() * 2 - 1).toFixed(2));
        let current = 1 * (Math.random() * 10).toFixed(2);
        let factor = 0.8 + 1 * (0.2 * Math.random()).toFixed(2);
        let angle = 1 * (Math.acos(factor) * 180 / Math.PI).toFixed(2);
        let apparent = voltage * current;
        let active = apparent * factor;
        let reactive = apparent * Math.sin(Math.acos(factor));

        let instant = {
            voltage: voltage,
            current: current,
            angle: angle,
            power: {
                apparent: apparent,
                active: active,
                reactive: reactive,
            }
        };

        total_current += current;
        total_active += active;
        total_reactive += reactive;
        total_apparent += apparent;

        phases.push(instant);
    }

    let total = {
        current: total_current,
        power: {
            apparent: total_apparent,
            active: total_active,
            reactive: total_reactive
        }
    };

    phases.push(total);

    return phases;

}

function get_energy() {
    let now = new Date();
    let day = now.getDate();
    let day_in_month = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    let values = [];
    for (let i = 0; i < day_in_month; i++) {
        let value = i < day ? 1 * (Math.random() * 10 + 5).toFixed(2) : 0;
        values.push(value);
    }
    return values;
}

function get_harmonics() {

    let values = [];
    for (let i = 0; i < 100; i++) {
        let value = Math.round((Math.random() * 100));
        values.push(value);
    }
    return values;
}

/**************** LOGIN *******************/

function login_success(data) {
    jwtToken = data.access_token;
    $('.login-form input').val("");
    $('.login-message').hide();
    $('.login-page').hide("clip", {direction: "horizontal"}, 200, function () {
        $('.dashboard').show("clip", {direction: "horizontal"}, 200, function () {
            if (username == "admin") {
                load_menu_items(menuItemsAdmin);
            } else if (username == "tech") {
                load_menu_items(menuItemsTech);
            }
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

/************* MENU & SIDEBAR **************************/

function load_menu_items(menuList) {

    $('#menu-list').empty().append(html_menu_items(menuList));

    $('#menu-list li').on('click', function (event) {
        $('#menu-list li').removeClass('menu-active');
        remove_chart_items();
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

/**************** DISPLAY AJAX ITEMS *******************/

function load_dashboard_controller(menuID) {
    if (menuID == "menu-logout") {
        logout_success();
    } else if (menuID == "menu-metering") {
        load_sidebar_items(sidebarItemsMetering);
    } else if (menuID == "menu-phase-diagnostics") {
        load_diagnostic_items(12);
        load_sidebar_items(sidebarItemsDiagnostics);
    } else if (menuID == "menu-status") {
        load_sidebar_items(sidebarItemsStatus);
    } else if (menuID == "menu-device-map") {
        load_network_chart();
        load_sidebar_items(sidebarItemsStatus);
    } else if (menuID == "menu-commissioning") {
        load_sidebar_items(sidebarItemsCommissioning);
    } else if (menuID == "menu-settings") {
        load_sidebar_items(sidebarItemsSettings);
    } else {
        load_sidebar_items(sidebarItemsOther);
    }
}


/************* CHARTS **************************/

function show_harmonic_chart(targetID) {
    dialog.dialog("open");
    render_harmonic_sparkchart("dialog", get_harmonics());
}

function remove_chart_items() {

    while (charts.length) {
        charts[charts.length - 1].destroy();
        charts.pop();
    }
    $('#items-page').empty();
}

function load_diagnostic_items(count) {

    remove_chart_items();

    for (let i = 1; i <= count; i++) {
        $('#items-page').append(html_chart_item(i, "Apt-" + i));
        render_phase_chart(i, get_power());
        render_harmonic_sparkchart(i, get_harmonics());
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