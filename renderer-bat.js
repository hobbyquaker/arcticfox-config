const ipc = require('electron').ipcRenderer;
const $ = jQuery = require('jquery');
const remote = require('electron').remote;
const app = remote.app;
const fs = require('fs');
const path = require('path');
let lang = {};

const Highcharts = require('highcharts');
require('highcharts-draggable-points')(Highcharts);

$('#cancel').click(function () {
    let window = remote.getCurrentWindow();
    window.close();
});

function data() {
    return {
        index: tableIndex,
        table: {
            Name: ($('#Name').val() + '\u0000\u0000\u0000\u0000').substr(0, 4),
            Cutoff: parseFloat($('#Cutoff').val()),
            PercentsVoltage: [
                {Percents: parseInt($('#percents0').val(), 10), Voltage: parseFloat($('#voltage0').val())},
                {Percents: parseInt($('#percents1').val(), 10), Voltage: parseFloat($('#voltage1').val())},
                {Percents: parseInt($('#percents2').val(), 10), Voltage: parseFloat($('#voltage2').val())},
                {Percents: parseInt($('#percents3').val(), 10), Voltage: parseFloat($('#voltage3').val())},
                {Percents: parseInt($('#percents4').val(), 10), Voltage: parseFloat($('#voltage4').val())},
                {Percents: parseInt($('#percents5').val(), 10), Voltage: parseFloat($('#voltage5').val())},
                {Percents: parseInt($('#percents6').val(), 10), Voltage: parseFloat($('#voltage6').val())},
                {Percents: parseInt($('#percents7').val(), 10), Voltage: parseFloat($('#voltage7').val())},
                {Percents: parseInt($('#percents8').val(), 10), Voltage: parseFloat($('#voltage8').val())},
                {Percents: parseInt($('#percents9').val(), 10), Voltage: parseFloat($('#voltage9').val())},
                {Percents: parseInt($('#percents10').val(), 10), Voltage: parseFloat($('#voltage10').val())}
            ]
        }
    }
}

$('#save').click(function () {
    let window = remote.getCurrentWindow();
    ipc.send('batchange', data());
    window.close();
});

$('#export').click(function () {
    ipc.send('batexport', data());
});

$('#import').click(function () {
    ipc.send('batimport');
});


function uiTranslate() {
    try {
        const fp = path.join(__dirname, 'i18n', app.getLocale() + '.json');
        lang = JSON.parse(fs.readFileSync(fp).toString());
    } catch (err) {
        return;
    }
    $('[data-lang]').each(function () {
        const key = $(this).data('lang');
        const phrase = lang[key];
        if (phrase) {
            $(this).html(phrase);
        }
    });
}

uiTranslate();

const chart = new Highcharts.Chart({

    chart: {
        renderTo: 'container',
        animation: false,
        type: 'spline'
    },

    title: {
        text: null
    },

    tooltip: { enabled: false },
    credits: {
        enabled: false
    },



    xAxis: {
        min: 0,
        max: 100,
        reversed: true

    },
    yAxis: {
        title: {
            text: null
        },
        min: 3,
        max: 4.2

    },

    plotOptions: {

        series: {
            point: {
                events: {

                    drag: function (e) {

                        chart.series[0].data.forEach((c, i) => {
                            $('#percents' + i).val(parseInt(c.x));
                            $('#voltage' + i).val(c.y);
                        });
                    },
                    drop: function () {
                        chart.series[0].data.forEach((c, i) => {
                            $('#percents' + i).val(parseInt(c.x));
                            $('#voltage' + i).val(c.y);
                        });
                    }
                }
            },
            stickyTracking: false
        },
        column: {
            stacking: 'normal'
        },
        line: {
            cursor: 'ns-resize',
            marker: {
                enabled: true
            }
        }
    },



    series: [{
        data: [],
        draggableY: true,
        draggableX: true
    }],

    legend: {
        enabled: false
    }

});

let tableIndex;

ipc.on('data', (event, data) => {
    console.log(data);
    tableIndex = data.index;
    $('#Name').val(data.table.Name.replace(/\u0000/g, ''));
    $('#Cutoff').val(data.table.Cutoff);
    chart.series[0].setData([]);
    data.table.PercentsVoltage.forEach((p, i) => {
        $('#percents' + i).val(p.Percents);
        $('#voltage' + i).val(p.Voltage);
        chart.series[0].addPoint([p.Percents, p.Voltage]);
    });

    chart.redraw();
});

ipc.on('table', (event, data) => {

    chart.series[0].setData([]);
    data.forEach((p, i) => {
        $('#percents' + i).val(p.Percents);
        $('#voltage' + i).val(p.Voltage);
        chart.series[0].addPoint([p.Percents, p.Voltage]);
    });

    chart.redraw();
});

$('input.percents').on('input change', function () {
    const index = parseInt($(this).attr('id').replace('percents', ''), 10);
    chart.series[0].data[index].update({x: parseInt($(this).val(), 10)});
});

$('input.voltage').on('input change', function () {
    const index = parseInt($(this).attr('id').replace('voltage', ''), 10);
    chart.series[0].data[index].update({y: parseFloat($(this).val())});
});