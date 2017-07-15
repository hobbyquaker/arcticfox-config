const fs = require('fs');
const path = require('path');
const url = require('url');
const electron = require('electron');
const ipc = electron.ipcRenderer;
const $ = jQuery = require('jquery');

let app = electron.remote.app;
let config;
let lang;

ipc.on('connect', (event, status) => {
    console.log('connect', status);
    $('#connection-status').html(_('Status.Device') + ' ' +  (status ? _('Status.Connected') : _('Status.Disconnected')));
});

ipc.on('config', (event, data) => {
    console.log('config', data);
    config = data;
    uiUpdate();
});

ipc.on('piregchange', (event, data) => {
    console.log('piregchange', data);
    console.log('activeProfile', activeProfile);
    config.profiles[activeProfile].PIRegulatorIsEnabled = data.PIRegulatorIsEnabled;
    config.profiles[activeProfile].PIRegulatorRange = data.PIRegulatorRange;
    config.profiles[activeProfile].PIRegulatorPValue = data.PIRegulatorPValue;
    config.profiles[activeProfile].PIRegulatorIValue = data.PIRegulatorIValue;
});

let activeProfile;

function uiInitTabs() {
    $('.tab-group#main .tab-item').click(function () {
        $('.tab-group#main .tab-item').removeClass('active');
        $(this).addClass('active');
        const view = $(this).data('view');
        $('.view-container.view-main .view').hide();
        $('.view-container.view-main #view-' + view).show();
    });

    $('.tab-group#screen .tab-item').click(function () {
        $('.tab-group#screen .tab-item').removeClass('active');
        $(this).addClass('active');
        const view = $(this).data('view');
        $('.view-container.view-screen .subview').hide();
        $('.view-container.view-screen #view-' + view).show();
    });

    $('.tab-group#screen-layout .tab-item').click(function () {
        $('.tab-group#screen-layout .tab-item').removeClass('active');
        $(this).addClass('active');
        const view = $(this).data('view');
        $('.view-container.view-screen-layout .subsubview').hide();
        $('.view-container.view-screen-layout #view-' + view).show();
    });

    $('.tab-group#advanced .tab-item').click(function () {
        $('.tab-group#advanced .tab-item').removeClass('active');
        $(this).addClass('active');
        const view = $(this).data('view');
        $('.view-container.view-advanced .subview').hide();
        $('.view-container.view-advanced #view-' + view).show();
    });

    $('.tab-group#controls .tab-item').click(function () {
        $('.tab-group#controls .tab-item').removeClass('active');
        $(this).addClass('active');
        const view = $(this).data('view');
        $('.view-container.view-controls .subview').hide();
        $('.view-container.view-controls #view-' + view).show();
    });

    $('#profiles .tab-item').click(function () {
        const p = $(this).attr('id').replace('profile-', '');
        uiProfile(p);
    });

    $('.tab-item[data-view="profiles"]').addClass('active');
    $('#view-profiles').show();
}

function uiScreenLayoutView(skin) {
    const names = [
        'classic',
        'circle',
        'foxy',
        'small'
    ];
    console.log('change skin', skin, names[skin]);
    $('.tab-group#screen-layout .tab-item').removeClass('active');
    $('[data-view="screen-layout-' + names[skin] + '"]').addClass('active');
    $('.view-container.view-screen-layout .subsubview').hide();
    $('.view-container.view-screen-layout #view-screen-layout-' + names[skin]).show();
}

function uiPreheat(val) {
    switch (Number(val)) {
        case 0:
            $('.fox-curveonly').hide();
            $('.fox-notcurve').show();
            $('#preheatUnit').html('W');
            break;
        case 1:
            $('.fox-curveonly').hide();
            $('.fox-notcurve').show();
            $('#preheatUnit').html('%');
            break;
        case 2:
            $('.fox-curveonly').show();
            $('.fox-notcurve').hide();
            break;

    }
}

function uiTempControl(val) {
    if (val) {
        $('.fox-tconly').show();
    } else {
        $('.fox-tconly').hide();
    }

}

function uiTcr(material) {
    if (material === '4') {
        $('#TCR').show();
    } else {
        $('#TCR').hide();
    }
}

function uiInitChangeHandlers() {
    $('#mode').change(function () {
        uiTempControl($(this).val() === 'tc');
    });

    $('#PreheatType').change(function () {
        uiPreheat($(this).val());
    });

    $('#Material').change(function () {
        uiTcr($('#Material').val());
    });

    $('#MainScreenSkin').change(function () {
        uiScreenLayoutView($(this).val());
    });
}

function uiProfile(p) {
    console.log('uiProfile', p);
    activeProfile = p;
    $('#profiles .tab-item').removeClass('active');
    $('#profiles #profile-' + p).addClass('active');

    $('.fox-pval').each(function () {
        const id = $(this).attr('id');
        const val = config.profiles[p][id];
        console.log('profile', p, id, val)
        if ($(this).is("input")) {
            if ($(this).attr('type') === 'checkbox') {
                $(this).prop('checked', val);
            } else {
                $(this).val(val);
            }
        } else if ($(this).is("select")) {
            console.log('select', id, val);
            $(this).find('option[value="' + val + '"]').prop('selected', true);
        }
    });

    uiPreheat($('#PreheatType').val());
    uiTcr(config.profiles[p].Material);
    uiTempControl(config.profiles[p].Material !== 0);

    $('#mode option[value="' + (config.profiles[p].Material !== 0 ? 'tc' : 'vw') + '"]').prop('selected', true);
    if (config.profiles[p].Material === 4) {
        $('#TCR').show();
    } else {
        $('#TCR').hide();
    }
}

function uiInitButtons() {
    $('#tc-setup').click(function () {
        ipc.send('pireg', config.profiles[activeProfile]);
    });

    $('#configuration-menu').click(function () {
        alert('... TODO'); // TODO
    });

    $('#download-settings').click(function () {
        ipc.send('download');
    });

    $('#upload-settings').click(function () {
        ipc.send('upload', config);
    });

    $('#reset-settings').click(function () {
        alert('... TODO'); // TODO
    });
}

function uiUpdate() {
    if (!config) {
        return;
    }

    $('#Product').html(config.ProductName);

    const $Material = $('#Material');
    $Material.html('');
    $Material.append('<option value="1">Nickel 200</option>');
    $Material.append('<option value="2">Titanium 1</option>');
    $Material.append('<option value="3">SS 316</option>');
    $Material.append('<option value="4">TCR</option>');

    config.TFRTables.forEach((tfr, index) => {
        $Material.append('<option value="' + (index + 5) + '">[TFR] ' + tfr.Name + '</option>');
    });

    const $SelectedCurve = $('#SelectedCurve');
    $SelectedCurve.html('');
    config.PowerCurves.forEach((pc, index) => {
        $SelectedCurve.append('<option value="' + index + '">' + pc.Name + '</option>');
    });

    $('.fox-val').each(function () {
        const id = $(this).attr('id');
        let val = config[id];

        if (id === 'HardwareVersion') {
            val = Number(val).toFixed(2);
        }

        if ($(this).is("input")) {
            if ($(this).attr('type') === 'checkbox') {
                $(this).prop('checked', val);
            } else {
                $(this).val(val);
            }
        } else if ($(this).is("select")) {
            $(this).find('option[value="' + val + '"]').prop('selected', true);
        }
    });

    uiScreenLayoutView(config.MainScreenSkin);
    uiProfile(config.SelectedProfile);
}

function uiTranslate() {
    try {
        const fp = path.join(__dirname, 'i18n', app.getLocale() + '.json');
        lang = JSON.parse(fs.readFileSync(fp).toString());
        console.log('LANG', app.getLocale());
    } catch (err) {
        console.log(err);
        return;
    }
    $('[data-lang]').each(function () {
        const key = $(this).data('lang');
        const phrase = lang[key];
        console.log('i18n', key, phrase);
        if (phrase) {
            $(this).html(phrase);
        }
    });
}

function _(key) {
    if (lang && lang[key]) {
        return lang[key];
    } else {
        return key;
    }
}

function uiInit() {
    uiTranslate();
    uiInitButtons();
    uiInitTabs();
    uiInitChangeHandlers();

    $('.fox-val').change(function () {
        const id = $(this).attr('id');
        const currentVal = config[id];
        let newVal;
        if ($(this).attr('type') === 'checkbox') {
            newVal = $(this).is(':checked');
        } else {
            newVal = $(this).val();
        }

        switch (typeof currentVal) {
            case 'number':
                newVal = parseFloat(newVal);
                break;
            case 'boolean':
                if (newVal === 'false') {
                    newVal = false;
                } else {
                    newVal = Boolean(newVal);
                }
                break;
            default:
        }
        console.log('change', id, currentVal, newVal);
        config[id] = newVal;
    });

    $('.fox-pval').change(function () {
        const id = $(this).attr('id');
        const currentVal = config.profiles[activeProfile][id];
        let newVal;
        if ($(this).attr('type') === 'checkbox') {
            newVal = $(this).is(':checked');
        } else {
            newVal = $(this).val();
        }

        switch (typeof currentVal) {
            case 'number':
                newVal = parseFloat(newVal);
                break;
            case 'boolean':
                if (newVal === 'false') {
                    newVal = false;
                } else {
                    newVal = Boolean(newVal);
                }
                break;
            default:
        }
        console.log('change profile', id, currentVal, newVal);
        config.profiles[activeProfile][id] = newVal;
    });

    uiUpdate();
}

uiInit();
