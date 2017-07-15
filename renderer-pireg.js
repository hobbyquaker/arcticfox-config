const ipc = require('electron').ipcRenderer;
const $ = jQuery = require('jquery');
const remote = require('electron').remote;
const app = remote.app;
const fs = require('fs');
const path = require('path');
let lang = {};

$('#cancel').click(function () {
    let window = remote.getCurrentWindow();
    window.close();
});

$('#save').click(function () {
    let window = remote.getCurrentWindow();
    ipc.send('piregchange', {
        PIRegulatorIsEnabled: $('#PIRegulatorIsEnabled').is(':checked'),
        PIRegulatorRange: $('#PIRegulatorRange').val(),
        PIRegulatorPValue: $('#PIRegulatorPValue').val(),
        PIRegulatorIValue: $('#PIRegulatorIValue').val()
    });
    window.close();
});

ipc.on('data', (event, data) => {
    $('#PIRegulatorIsEnabled').prop('checked', data.PIRegulatorIsEnabled);
    $('#PIRegulatorRange').val(data.PIRegulatorRange);
    $('#PIRegulatorPValue').val(data.PIRegulatorPValue);
    $('#PIRegulatorIValue').val(data.PIRegulatorIValue);
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