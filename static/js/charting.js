let charts = [];

let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let d = new Date();
let thisMonth = months[d.getMonth()];

function render_phase_chart(chartIndex, phases) {

    let chart;

    chart = Highcharts.chart('power-chart-' + chartIndex, {

        chart: {
            polar: true
        },

        title: {
            text: ''
        },

        legend: {
            enabled: false
        },

        exporting: {
            enabled: false
        },

        tooltip: {
            formatter: function () {
                if (this.y) {
                    let parameter = this.series.name.split(".")[0];
                    let phase = this.series.name.split(".")[1];
                    let string = "<span style='font-weight:bold;color: " + this.series.color + "'>Phase " + phase + "<br/>";
                    if (parameter == "Voltage")
                        return string + parameter + ": " + this.y + "V @" + 60 + "Hz<br/>" +
                            "S.Power: " + 7 + "kVA ∠" + this.x + "°";
                    if (parameter == "Current")
                        return string + parameter + ": " + this.y + "A<br/>" +
                            "R.Power: " + 2.1 + " kW";
                } else {
                    return "<span style='font-weight:bold'>Total</span><br/>" +
                        "Current 23A<br/>" +
                        "Power: 7.2kW"
                }
            }
        },

        pane: {
            startAngle: 90
        },

        xAxis: {
            tickInterval: 60,
            reversed: true,
            min: 0,
            max: 360,
            labels: {
                distance: 5,
                formatter: function () {
                    return this.value + '°';
                }
            }
        },

        credits: {
            enabled: false
        },

        yAxis: [{
            labels: {
                formatter: function () {
                    return this.value > 0 ? this.value + 'V' : '';
                }
            },
            min: 0
        }, {
            angle: 180,
            labels: {
                formatter: function () {
                    return this.value > 0 ? this.value + 'A' : '';
                }
            },
            min: 0
        }],

        plotOptions: {
            series: {
                pointStart: 0,
                pointInterval: 60,
                lineWidth: 3,
                animation: true,
                marker: {
                    symbol: 'circle'
                },
            },
            column: {
                pointPadding: 0,
                groupPadding: 0
            }
        },

        series: [{
            name: 'Voltage.A',
            color: '#888888',
            dashStyle: 'shortdot',

            yAxis: 0,
            data: [{
                x: 0,
                y: 0
            }, {
                x: 0,
                y: phases[0].voltage
            }],
            pointPlacement: 'on'
        }, {
            name: 'Current.A',
            color: 'black',
            yAxis: 1,
            data: [{
                x: phases[0].angle,
                y: 0
            }, {
                x: phases[0].angle,
                y: phases[0].current
            }],
            pointPlacement: 'on'
        }, {
            name: 'Voltage.B',
            color: '#8888FF',
            dashStyle: 'shortdot',
            yAxis: 0,
            data: [{
                x: 120,
                y: 0
            }, {
                x: 120,
                y: phases[1].voltage
            }],
            pointPlacement: 'on'
        }, {
            name: 'Current.B',
            color: 'blue',
            yAxis: 1,
            data: [{
                x: 120 + phases[1].angle,
                y: 0
            }, {
                x: 120 + phases[1].angle,
                y: phases[1].current
            }],

            pointPlacement: 'on'
        }, {
            name: 'Voltage.C',
            color: '#FF8888',
            dashStyle: 'shortdot',
            yAxis: 0,
            data: [{
                x: 240,
                y: 0
            }, {
                x: 240,
                y: phases[2].voltage
            }],

            pointPlacement: 'on'
        }, {
            name: 'Current.C',
            color: 'red',
            yAxis: 1,
            data: [{
                x: 240 + phases[2].angle,
                y: 0
            }, {
                x: 240 + phases[2].angle,
                y: phases[2].current
            }],

            pointPlacement: 'on'
        }]
    });

    charts.push(chart);

}

function render_energy_sparkchart(chartIndex, energy) {

    let chart = Highcharts.chart('energy-chart-' + chartIndex, {
        chart: {
            type: 'column'
        },
        skipClone: true,
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        title: {
            text: ''
        },

        xAxis: {
            crosshair: false,
            visible: false
        },
        yAxis: {
            min: 0,
            visible: false
        },
        tooltip: {
            formatter: function () {
                return thisMonth + " " + (parseInt(this.x) + 1) + ": " + this.y + "kWh";
            }
        },
        plotOptions: {
            column: {
                animation: false,
                pointPadding: 0,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Energy',
            data: energy

        }]
    });

    charts.push(chart);

}

function render_network_chart() {
    let nodes = [{
        id: 'qnect-1',
        label: "This",
        group: 'origin'
        },
        {
            id: 'qlect-1',
            label: "QLect 1",
            group: 'QLect'
        },
        {
            id: 'qlect-2',
            label: "QLect 2",
            group: 'QLect'
        },
        {
            id: 'qloud',
            label: "QLoud",
            group: 'QLoud',
        },
        {
            id: 'qnect-2',
            label: "QNect 2",
            group: 'QNect'
        },
        {
            id: 'meter-1',
            label: "Meter 1",
            group: 'Minicloset'
        },
        {
            id: 'meter-2',
            label: "Meter 2",
            group: 'Minicloset'
        },
        {
            id: 'meter-3',
            label: "Meter 3",
            group: 'Minicloset'
        }
    ];
    let edges = [
        {
            from: 'qnect-1',
            to: 'qnect-2',
            color: 'red',
            label: 'PLC'
        },
        {
            from: 'qnect-2',
            to: 'qloud',
            color: 'blue',
        },
        {
            from: 'qnect-1',
            to: 'qlect-1',
            color: 'green',
        },
        {
            from: 'qnect-1',
            to: 'qlect-2',
            color: 'green'
        },
        {
            from: 'qlect-1',
            to: 'meter-1',
            color: 'green'
        },
        {
            from: 'qlect-2',
            to: 'meter-2',
            color: 'green'
        },
        {
            from: 'qlect-2',
            to: 'meter-3',
            color: 'green'
        }

    ]

// create a network

    let data = {
        nodes: nodes,
        edges: edges
    };
    let options = {
        nodes: {
            shape: 'dot',
            size: 20,
            font: {
                size: 15,
                color: 'black'
            },
            borderWidth: 2
        },
        edges: {
            width: 3,
            physics: true
        },
        groups: {
            origin: {
                color: {
                    border: 'black',
                    background: 'blue'
                },
                shape: 'star',
                size: 35
            },
            Minicloset: {
                shape: 'image',
                image: 'https://global-uploads.webflow.com/59f65ad56a27c4000132d740/5a5d28303e2b760001e1a972_MC5C-p-500.png',
                level: 4
            },
            QLect: {
                shape: 'icon',
                icon: {
                    face: 'FontAwesome',
                    code: '\uf2db',
                    size: 50,
                    color: 'gray',
                    level: 3

                }
            },
            QLoud: {
                shape: 'icon',
                icon: {
                    face: 'FontAwesome',
                    code: '\uf0c2',
                    size: 50,
                    color: 'lightblue',
                    level: 1
                }
            },
            QNect: {
                shape: 'image',
                image: 'https://www.embeddedarm.com/images/boards/medium/ts-7553-v2-e2.gif',
                level: 2
            }
        }
    };

    let container = document.getElementById('items-page');
    let network = new vis.Network(container, data, options);

}