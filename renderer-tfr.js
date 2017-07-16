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

$('#save').click(function () {
    let window = remote.getCurrentWindow();
    ipc.send('tfrchange', {
        index: tableIndex,
        table: {
            Name: ($('#Name').val() + '\u0000\u0000\u0000\u0000').substr(0, 4),
            Points: [
                {Temperature: parseInt($('#temp0').val(), 10), Factor: parseFloat($('#factor0').val())},
                {Temperature: parseInt($('#temp1').val(), 10), Factor: parseFloat($('#factor1').val())},
                {Temperature: parseInt($('#temp2').val(), 10), Factor: parseFloat($('#factor2').val())},
                {Temperature: parseInt($('#temp3').val(), 10), Factor: parseFloat($('#factor3').val())},
                {Temperature: parseInt($('#temp4').val(), 10), Factor: parseFloat($('#factor4').val())},
                {Temperature: parseInt($('#temp5').val(), 10), Factor: parseFloat($('#factor5').val())},
                {Temperature: parseInt($('#temp6').val(), 10), Factor: parseFloat($('#factor6').val())}
            ]
        }
    });
    window.close();
});

$('#export').click(function () {
    alert('... TODO'); // TODO
});

$('#import').click(function () {
    alert('... TODO'); // TODO
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
        animation: false
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
        max: 800

    },
    yAxis: {
        title: {
            text: null
        },
        min: 1,
        max: 4

    },

    plotOptions: {

        series: {
            point: {
                events: {

                    drag: function (e) {

                        chart.series[0].data.forEach((c, i) => {
                            $('#temp' + i).val(parseInt(c.x));
                            $('#factor' + i).val(c.y);
                        });
                    },
                    drop: function () {
                        chart.series[0].data.forEach((c, i) => {
                            $('#temp' + i).val(parseInt(c.x));
                            $('#factor' + i).val(c.y);
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
    $('#Name').val(data.table.Name.replace(/\u0000/, ''));
    chart.series[0].setData([]);
    data.table.Points.forEach((p, i) => {
        $('#temp' + i).val(p.Temperature);
        $('#factor' + i).val(p.Factor);
        chart.series[0].addPoint([p.Temperature, p.Factor]);
    });

    chart.redraw();
});

$('input.temp').on('input change', function () {
    const index = parseInt($(this).attr('id').replace('temp', ''), 10);
    chart.series[0].data[index].update({x: parseInt($(this).val(), 10)});
});

$('input.factor').on('input change', function () {
    const index = parseInt($(this).attr('id').replace('factor', ''), 10);
    chart.series[0].data[index].update({y: parseFloat($(this).val())});
});