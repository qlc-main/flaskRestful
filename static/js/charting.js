//let item_charts = {upper: [], lower: []};
let item_charts = [];

let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let d = new Date();
let thisMonth = months[d.getMonth()];

let gaugeOptions = {

    chart: {
        type: 'solidgauge'
    },

    title: null,
    exporting: {
        enabled: false
    },
    credits: {
        enabled: false
    },
    pane: {
        center: ['50%', '85%'],
        size: '140%',
        startAngle: -90,
        endAngle: 90,
        background: {
            backgroundColor: '#EEE',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
        }
    },

    tooltip: {
        enabled: false
    },

    // the value axis
    yAxis: {
        stops: [
            [0.1, '#55BFFF'], // green
            [0.9, '#DF5353'] // red
        ],
        lineWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
            y: -70
        },
        labels: {
            y: 16
        }
    },

    plotOptions: {
        solidgauge: {
            dataLabels: {
                y: 5,
                borderWidth: 0,
                useHTML: true
            }
        }
    }
};

let sparkOptions = {
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
        visible: false
    },
    plotOptions: {
        column: {
            animation: false,
            pointPadding: 0,
            borderWidth: 0
        }
    }
};


function update_spark_chart(chartIndex, name, color) {
    if (item_charts['lower-' + chartIndex]) {
        item_charts['lower-' + chartIndex].update({
            series: [{color: color, name: name}]
        });
        item_charts['lower-' + chartIndex].series[0].setData(get_random(30, 100));
    }
}

function render_meter_chart(chartIndex, meter) {
    let chart = Highcharts.chart('item-chart-upper-' + chartIndex, Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 20
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'Power',
            data: [meter],
            dataLabels: {
                format: '<div style="text-align:center"><span class="item-chart-value">{y}</span><br/>' +
                    '<span class="item-chart-unit power-unit">kW</span></div>'
            },
            tooltip: {
                valueSuffix: ' kW'
            }
        }]

    }));
    item_charts['upper-' + chartIndex] = chart
    //item_charts.upper.push(chart);
}

function render_phase_chart(chartIndex, phases) {

    let chart = Highcharts.chart('item-chart-upper-' + chartIndex, {

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
                    let angle = this.x;
                    if (phase == 'B') angle -= 120;
                    if (phase == 'C') angle -= 240;
                    let string = "<span style='font-weight:bold;color: " + this.series.color + "'>Phase " + phase + "<br/>";
                    if (parameter == "Voltage")
                        return string + parameter + ": " + (this.y).toFixed(1) + " / " + (this.y * Math.sqrt(3)).toFixed(1) + "V";
                    if (parameter == "Current")
                        return string + parameter + ": " + (this.y).toFixed(2) + "A ∠ " + angle.toFixed(2) + "°";
                } else {
                    return "<span style='font-weight:bold'>System</span><br/>" +
                        "Frequency: 60Hz";
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
                }, cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                            if(this.y) {
                                update_spark_chart(chartIndex, this.series.name, this.series.color);
                            }
                        }
                    }
                }
            }
        },

        series: [{
            name: 'Voltage.A',
            color: '#888888',
            dashStyle: 'shortdot',

            yAxis: 0,
            data: [{
                x: 0,
                y: 0,
                marker: {
                    enabled: false
                }
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
                y: 0,
                marker: {
                    enabled: false
                }
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
                y: 0,
                marker: {
                    enabled: false
                }
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
                y: 0,
                marker: {
                    enabled: false
                }
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
                y: 0,
                marker: {
                    enabled: false
                }
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
                y: 0,
                marker: {
                    enabled: false
                }
            }, {
                x: 240 + phases[2].angle,
                y: phases[2].current
            }],

            pointPlacement: 'on'
        }]
    });

    item_charts['upper-' + chartIndex] = chart

}

function render_harmonic_sparkchart(chartIndex, harmonics) {

    let chart = Highcharts.chart('item-chart-lower-' + chartIndex, Highcharts.merge(sparkOptions, {

        tooltip: {
            formatter: function () {
                return this.series.name + ".harmonic: " + (parseInt(this.x) + 1) + ": " + Math.round(this.y);
            }
        },
        series: [{
            name: 'Voltage.A',
            data: harmonics,
            color: '#888888'
        }]
    }));

    item_charts['lower-' + chartIndex] = chart;

}

function render_energy_sparkchart(chartIndex, energy) {

    let chart = Highcharts.chart('item-chart-lower-' + chartIndex, Highcharts.merge(sparkOptions, {

        tooltip: {
            formatter: function () {
                return "Jan: " + (parseInt(this.x) + 1) + ": " + (this.y).toFixed(2) + " kWh";
            }
        },
        series: [{
            name: 'Energy',
            data: energy
        }]
    }));

    chart.container.onclick = null;

    item_charts['lower-' + chartIndex] = chart;

}


let energyType = ['Active', 'Apparent', 'Reactive Capacitive', 'Reactive Inductive'];
let direction = ['Import', 'Export'];
let seriesVisible = [true, false, false, false, false, false, false, false];
let isDrilldown = false;

function chart_display(chart) {
    for (let i = 0; i < chart.series.length; i++) {
        if (seriesVisible[i] && !chart.series[i].visible) {
            chart.series[i].show();
        } else if (!seriesVisible[i] && chart.series[i].visible) {
            chart.series[i].hide();
        }
    }
}

function random_data(count, base, drill) {
    let values = [];
    for (let i = 0; i < count; i++) {
        let value = Math.round((Math.random() * base / 2 + base / 2));
        values.push({
            y: value,
            drilldown: drill
        });
    }
    return values;
}

function energy_series(count, interval, drill) {
    let values = [];
    for (let i = 0; i < 8; i++) {
        values.push({
            name: energyType[Math.floor(i / 2)] + ' ' + direction[i % 2],
            stack: energyType[Math.floor(i / 2)],
            pointInterval: interval,
            pointStart: 1546300800000,
            data: random_data(count, (i % 2 ? -1 : 1) * 5, drill),
            color: Highcharts.getOptions().colors[i]
        });
    }
    return values;
}

function render_energy_chart() {
    let chart = Highcharts.chart('chart-dialog', {
        chart: {
            type: 'column',
            events: {
                drilldown: function (e) {
                    if (!e.seriesOptions) {

                        let chart = this;

                        let series = energy_series(24, 3600000, false);

                        for (let i = 0; i < series.length; i++) {
                            chart.addSingleSeriesAsDrilldown(e.point, series[i]);
                        }
                        chart.applyDrilldown();
                        isDrilldown = true;
                        chart_display(chart);

                    }

                },
                drillup: function () {
                    isDrilldown = false;
                }
            }
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
        xAxis: [{
            type: 'datetime'
        }],
        yAxis: {
            title: {
                text: null
            },
            labels: {
                formatter: function () {
                    return Math.abs(this.value) + 'kWh';
                }
            }
        },

        plotOptions: {
            series: {
                events: {
                    legendItemClick: function () {
                        seriesVisible[this.index] = !seriesVisible[this.index];
                    },
                },
                stacking: 'normal'
            }
        },
        credits: {
            enabled: false
        },
        tooltip: {
            formatter: function () {
                let dateFormat = isDrilldown ? '%l:00 %p' : '%b %e';
                let unit = Highcharts.dateFormat(dateFormat,
                    new Date(this.x)) + ': ' +
                    Highcharts.numberFormat(Math.abs(this.point.y), 0);
                let name = this.point.series.name.split(' ')[0];
                if (name == 'Active') {
                    unit += 'kWh';
                } else if (name == 'Reactive') {
                    unit += 'kVAR';
                } else if (name == 'Apparent') {
                    unit += 'kVA';
                }
                return unit;
            }
        },

        series: energy_series(31, 86400000, true),
        drilldown: {
            activeAxisLabelStyle: {
                textDecoration: 'none',
                fontStyle: 'none',
                fontWeight: 'none',
                color: 'black'
            },
            series: []
        }
    });

    chart_display(chart);
}

function delete_item_charts() {
    /*for (let key in item_charts) {
        let chart = item_charts[key];
        while (item_charts.length) {
            chart[chart.length - 1].destroy();
            chart.pop();
        }
    }*/


    while (item_charts.length) {
        chart[chart.length - 1].destroy();
        chart.pop();
    }

}

function render_network_chart() {

    // create an array with nodes
    let nodes = new vis.DataSet([{
        id: 'q0',
        group: 'QLoud'
    },
        {
            id: 'qn1',
            group: 'QNect'
        },
        {
            id: 'qn2',
            group: 'origin'
        },
        {
            id: 'm1',
            label: 'Meter1',
            group: 'Minicloset'
        },
        {
            id: 'm2',
            label: 'Meter2',
            group: 'Minicloset'
        },
        {
            id: 'qn3',
            group: 'QNect'
        },
        {
            id: 'm3',
            label: 'Meter3',
            group: 'Minicloset'
        },
        {
            id: 'm4',
            label: 'Meter4',
            group: 'Minicloset'
        },
        {
            id: 'm5',
            label: 'Meter5',
            group: 'Minicloset'
        }

    ]);

    let edges = new vis.DataSet([{
        from: 'q0',
        to: 'qn1'
    },
        {
            from: 'qn1',
            to: 'qn2',
            label: 'Digi',
            font: {color: 'blue'},
            dashes: [2, 2]
        },
        {
            from: 'qn2',
            to: 'm1'
        },
        {
            from: 'qn2',
            to: 'm2'
        },
        {
            from: 'qn2',
            to: 'qn3',
            label: 'PLC',
            font: {color: 'red'},
            color: 'red',
            dashes: [8, 2, 2, 2]
        },
        {
            from: 'qn3',
            to: 'm3'
        },
        {
            from: 'qn3',
            to: 'm4'
        },
        {
            from: 'qn3',
            to: 'm5'
        }
    ]);

    let data = {
        nodes: nodes,
        edges: edges
    };
    let options = {
        layout: {
            hierarchical: {
                enabled: true,
                direction: 'UD',
                sortMethod: 'directed'
            }
        },
        physics: false,
        groups: {
            Minicloset: {
                shape: 'image',
                image: 'https://global-uploads.webflow.com/59f65ad56a27c4000132d740/5a5d28303e2b760001e1a972_MC5C-p-500.png'
            },
            QLect: {
                shape: 'icon',
                icon: {
                    face: 'FontAwesome',
                    code: '\uf0e4',
                    size: 50,
                    color: 'white'
                }
            },
            QLoud: {
                shape: 'icon',
                icon: {
                    face: 'FontAwesome',
                    code: '\uf0c2',
                    size: 75,
                    color: 'lightblue'
                }
            },
            origin: {
                shape: 'circle',
                size: 75,
                label: 'This'
            },
            QNect: {
                shape: 'image',
                image: 'https://www.embeddedarm.com/images/boards/medium/ts-7553-v2-e2.gif'
            }
        }
    };


    let container = document.getElementById('items-page');
    let network = new vis.Network(container, data, options);

}