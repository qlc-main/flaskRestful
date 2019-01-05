let username = "";

/******** WILL BE REPLACED BY ACTUAL DATA FROM SERVER *****/

let menuItemsAdmin = [
    "Logout",
    "Admin",
    "Settings",
    "Status",
    "Metering",
    "Phase Diagnostics",
    "Device Map"
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
    "Billing",
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
        },
        {
            name: 'Power / Energy',
            items: [
                {name: 'kW / kWh'},
                {name: 'kVAR / kVARh'},
                {name: 'kVA / kVA'}
            ]
        },
        {
            name: 'Direction',
            items: [
                {name: 'Import'},
                {name: 'Export'},
                {name: 'Net'}
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
            name: 'Phases',
            items: [
                {name: 'Phase A (A-B)'},
                {name: 'Phase B (B-C)'},
                {name: 'Phase C (C-A)'},
                {name: 'Total'}
            ]
        },
        {
            name: 'Voltage',
            items: [
                {name: 'Line'},
                {name: 'Phase'},
                {name: 'Harmonics'}
            ]
        },
        {
            name: 'Current',
            items: [
                {name: 'Current'},
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
            name: 'Device Name',
            items: [
                {name: 'Bravo-2P'},
                {name: 'Minicloset-5'},
                {name: 'QLic-E'}
            ]
        },
        {
            name: 'CT',
            items: [
                {name: 'CT-1'},
                {name: 'CT-2'},
                {name: 'CT-3'}
            ]
        },
        {
            name: 'Steps',
            items: [
                {name: 'Step 1'},
                {name: 'Step 2'},
                {name: 'Step 3'}
            ]
        },
    ]
};

let sidebarItemsSettings = {
    settings: {
        sortable: true
    },
    categories: [
        {
            name: 'Connected',
            items: [
                {name: 'QLoud Database'},
                {name: 'Bravo-2P'},
                {name: 'Minicloset-5'},
                {name: 'QLic-E'}
            ]
        },
        {
            name: 'Options',
            items: [
                {name: 'Ethernet'},
                {name: 'WiFi'},
                {name: 'Bluetooth'},
                {name: 'RS-485/MODBUS'},
                {name: 'PLC'},
                {name: 'Pulse'},
                {name: 'MBus'}
            ]
        }
    ]
};

let sidebarItemsAdmin = {
    settings: {
        sortable: false
    },
    categories: [
        {
            name: 'Users',
            items: [
                {name: 'Create New'},
                {name: 'Update/Remove'}
            ]
        },
        {
            name: 'Database',
            items: [
                {name: 'Empty Table'}
            ]
        }
    ]
};

let sidebarItemsOther = {
    categories: []
};

function get_phases() {

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

function get_random_day(base) {
    let now = new Date();
    let day = now.getDate();
    let day_in_month = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    let values = [];
    for (let i = 0; i < day_in_month; i++) {
        let value = i < day ? 1 * (Math.random() * base / 2 + base / 2).toFixed(2) : 0;
        values.push(value);
    }
    return values;
}

function get_random(count, base) {
    let values = [];
    for (let i = 0; i < count; i++) {
        let value = Math.round((Math.random() * base / 2 + base / 2));
        values.push(value);
    }
    return values;
}


/**************** DISPLAY AJAX ITEMS *******************/

function load_menu_options(privilege) {
    let menu_items = '';
    if (privilege == "Alfred") {
        menu_items = menuItemsAdmin;
    } else if (privilege == "Gordon") {
        menu_items = menuItemsTech;
    } else if (privilege == "Bruce") {
        menu_items = menuItemsBilling;
    }

    if (menu_items) {
        load_menu_items(menu_items);
        $('#menu-list').show("slide", {direction: "right"}, 200, function () {
            let default_menu_item = 'menu-' + menu_items[menu_items.length - 1].toLowerCase().split(' ').join('-');
            $('#' + default_menu_item).addClass('menu-active');
            load_dashboard_controller(default_menu_item);
        });
    }

}

function load_dashboard_controller(menuID) {
    resize_components();
    if (menuID == "menu-logout") {
        logout_success();
    } else if (menuID == "menu-metering") {
        load_sidebar_items(sidebarItemsMetering);
        load_metering_items(12);
    } else if (menuID == "menu-phase-diagnostics") {
        load_sidebar_items(sidebarItemsDiagnostics);
        load_diagnostic_items(12);
    } else if (menuID == "menu-status") {
        load_sidebar_items(sidebarItemsStatus);
    } else if (menuID == "menu-device-map") {
        load_sidebar_items(sidebarItemsStatus);
        load_network_chart();
    } else if (menuID == "menu-commissioning") {
        load_sidebar_items(sidebarItemsCommissioning);
    } else if (menuID == "menu-settings") {
        load_sidebar_items(sidebarItemsSettings);
    } else if (menuID == "menu-admin") {
        load_sidebar_items(sidebarItemsAdmin);
    } else {
        load_sidebar_items(sidebarItemsOther);
    }
}