const ipc =         require('electron').ipcRenderer;
const $ = jQuery =  require('jquery');
const remote =      require('electron').remote;

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
