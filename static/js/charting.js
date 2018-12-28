let charts = [];

function draw_item(chartIndex, phases, energy) {

    let chart;

    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let d = new Date();
    let thisMonth = months[d.getMonth()];

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
                marker: {
                    symbol: 'circle'
                }
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

    chart = Highcharts.chart('energy-chart-' + chartIndex, {
        chart: {
            type: 'column',
            events: {
                click: function (event) {
                    alert();
                }
            }
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