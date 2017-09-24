const electron = require('electron');
const app = electron.app;
const Menu = electron.Menu;
const ipc = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const dialog = electron.dialog;

const storage = require('electron-json-storage');
const windowStateKeeper = require('electron-window-state');
const isDev = require('electron-is-dev');

const path = require('path');
const url = require('url');
const fs = require('fs');
const xml2js = require('xml2js');
const fox = require('arcticfox');
const AfcFile = require('./afcfile');

const afc = new AfcFile();

let mainWindow;
let menu;
let debug;
let autoconnect = true;
let lang = {};

let menuTemplate = [];

if (process.platform === 'darwin') {
    menuTemplate.unshift({
        label: 'Arcticfox Monitor',
        submenu: [
            {
                role: 'about',
                label: 'About Arcticfox Config'
            },
            {
                type: 'separator'
            },
            {
                role: 'services',
                submenu: []
            },
            {
                type: 'separator'
            },
            {
                role: 'hide',
                label: 'Hide Arcticfox Config'
            },
            {
                role: 'hideothers'
            },
            {
                role: 'unhide'
            },
            {
                type: 'separator'
            },
            {
                role: 'quit',
                label: 'Quit Arcticfox Config'
            }
        ]
    });
}

if (isDev) {
    debug = console.log;
} else {
    debug = function () {};
}

function createWindow () {

    let mainWindowState = windowStateKeeper({
        defaultWidth: 536,
        defaultHeight: 596
    });

    let devWindowState = {
        width: 1280,
        height: 596
    };

    let windowState = isDev ? devWindowState : mainWindowState;

    mainWindow = new BrowserWindow(windowState);

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    if (isDev) mainWindow.webContents.openDevTools();

    menu = Menu.buildFromTemplate(menuTemplate);

    Menu.setApplicationMenu(menu);

    if (!isDev) mainWindowState.manage(mainWindow);

    mainWindow.on('closed', () => {
        mainWindow = null;
        app.quit();
    });
}

function download() {
    fox.readConfiguration((err, data) => {
        if (err) {
            console.log(err.toString());
            if (err.toString() === 'Error: Outdated Toolbox') {
                dialog.showErrorBox('Incompatible Firmware', _('Message.OutdatedToolbox'))
            } else if (err.toString() === 'Error: Outdated Firmware') {
                dialog.showErrorBox('Incompatible Firmware', _('Message.ConnectDevice').replace('{0}', fox.minimumSupportedBuildNumber))
            } else {
                throw err;
            }
        }
        ipcSend('config', data);
    });
}

fox.on('connect', () => {
    ipcSend('connect', true);
    if (autoconnect) {
        download();
    }
});

fox.on('close', () => {
    ipcSend('connect', false);
});

fox.on('error', err => {
    debug(err);
});

ipc.on('upload', (event, data) => {
    fox.writeConfiguration(data);
});

ipc.on('openconfig', (event, data) => {
    electron.dialog.showOpenDialog(batWin, {
        title: 'Open Configuration'
    }, filename => {
        if (filename) {
            const xml = afc.decodeAfc(fs.readFileSync(filename[0]));
            afc.xml2conf(xml, (err, res) => {
                if (err) {
                    throw err;
                } else {
                    ipcSend('config', res);
                }
            });
        }
    });
});

ipc.on('saveconfig', (event, data) => {
    electron.dialog.showSaveDialog(batWin, {
        title: 'Save Configuration'
    }, filename => {
        if (filename) {
            fs.writeFileSync(filename, afc.encodeAfc(afc.conf2xml(data)));
        }
    });
});

ipc.on('tfrimport', (event, data) => {
    console.log('tfrimport', data);

    dialog.showOpenDialog(tfrWin, {
        title: 'Import TFR Table',
        filters: {
            extensions: ['csv']
        }
    }, filename => {
        if (filename) {
            filename = filename[0];
            const lines = fs.readFileSync(filename).toString().replace(/\r/g, '').split('\n');
            const table = [];
            lines.forEach(line => {
                let [temp, factor] = line.split(',');
                temp = parseInt(temp, 10);
                factor = parseFloat(factor);
                if (factor) {
                    table.push({Temperature: temp, Factor: factor});
                }
            });
            tfrWin.webContents.send('table', table);
        }
    });
});

ipc.on('tfrexport', (event, data) => {
    console.log('tfrexport', data);
    const name = data.table.Name.replace(/\u0000/g, '');
    dialog.showSaveDialog(tfrWin, {
        title: 'Export TFR Table ' + name,
        defaultPath: name + '.csv',
        filters: {
            extensions: ['csv']
        }
    }, filename => {
        if (filename) {
            let out = '"Temperature (degF)","Electrical Resistivity"';
            data.table.Points.forEach(p => {
                out += ('\n' + p.Temperature + ',' + p.Factor);
            });
            fs.writeFileSync(filename, out);
        }
    });
});

ipc.on('batexport', (event, data) => {
    const name = data.table.Name.replace(/\u0000/g, '');
    const obj = {
        BatteryProfile: {
            Cutoff: data.table.Cutoff,
            Data: {
                Point: [

                ]
            }
        }
    };
    data.table.PercentsVoltage.forEach(p => {
        obj.BatteryProfile.Data.Point.push({
            $: {
                Percent: p.Percents,
                Voltage: p.Voltage
            }
        });
    });
    const builder = new xml2js.Builder({
        headless: true
    });
    const xml = builder.buildObject(obj);

    dialog.showSaveDialog(tfrWin, {
        title: 'Export Battery Profile ' + name,
        defaultPath: name + '.xml'
    }, filename => {
        if (filename) {
            fs.writeFileSync(filename, xml);
        }
    });
});

ipc.on('batimport', (event, data) => {
    console.log('batimport', data);

    dialog.showOpenDialog(batWin, {
        title: 'Import Battery Profile'
    }, filename => {
        if (filename) {
            filename = filename[0];
            const xml = fs.readFileSync(filename).toString();

            xml2js.parseString(xml, function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                const data = {
                    table: {
                        Cutoff: result.BatteryProfile.Cutoff,
                        PercentsVoltage: []
                    }
                };
                result.BatteryProfile.Data[0].Point.forEach(p => {
                    data.table.PercentsVoltage.push({Percents: parseInt(p.$.Percent, 10), Voltage: parseFloat(p.$.Voltage)});
                });
                batWin.webContents.send('batimport', data);
            });
        }
    });
});

let batWin;
ipc.on('bat', (event, data) => {
    batWin = new BrowserWindow({
        width: isDev ? 1200 : 545,
        height: 520,
        show: false,
        modal: true,
        parent: mainWindow
    });

    batWin.on('ready-to-show', () => {
        batWin.webContents.send('data', data);
        if (isDev) batWin.webContents.openDevTools();
        batWin.show();
    });

    batWin.on('close', () => {
        batWin = null;
    });

    batWin.loadURL(url.format({
        pathname: path.join(__dirname, 'bat.html'),
        protocol: 'file:',
        slashes: true
    }));
});

let tfrWin;
ipc.on('tfr', (event, data) => {
     tfrWin = new BrowserWindow({
        width: isDev ? 1200 : 545,
        height: 380,
        show: false,
        modal: true,
        parent: mainWindow
    });

    tfrWin.on('ready-to-show', () => {
        tfrWin.webContents.send('data', data);
        if (isDev) tfrWin.webContents.openDevTools();
        tfrWin.show();
    });

    tfrWin.on('close', () => {
        tfrWin = null;
    });

    tfrWin.loadURL(url.format({
        pathname: path.join(__dirname, 'tfr.html'),
        protocol: 'file:',
        slashes: true
    }));
});

let pcWin;
ipc.on('pc', (event, data) => {
    pcWin = new BrowserWindow({
        width: isDev ? 1200 : 545,
        height: 520,
        show: false,
        modal: true,
        parent: mainWindow
    });

    pcWin.on('ready-to-show', () => {
        pcWin.webContents.send('data', data);
        if (isDev) pcWin.webContents.openDevTools();
        pcWin.show();
    });

    pcWin.on('close', () => {
        pcWin = null;
    });

    pcWin.loadURL(url.format({
        pathname: path.join(__dirname, 'power.html'),
        protocol: 'file:',
        slashes: true
    }));
});

ipc.on('pireg', (event, data) => {


    let piregWin = new BrowserWindow({
        width: 400,
        height: 275,
        modal: true,
        parent: mainWindow,
        show: false
    });

    piregWin.on('ready-to-show', () => {
        piregWin.webContents.send('data', data);
        piregWin.show();
    });

    piregWin.on('close', () => {
        piregWin = null;
    });

    piregWin.loadURL(url.format({
        pathname: path.join(__dirname, 'pireg.html'),
        protocol: 'file:',
        slashes: true
    }));
});

ipc.on('tfrchange', (event, data) => {
    ipcSend('tfrchange', data);
});

ipc.on('pcchange', (event, data) => {
    ipcSend('pcchange', data);
});

ipc.on('batchange', (event, data) => {
    ipcSend('batchange', data);
});

ipc.on('piregchange', (event, data) => {
    ipcSend('piregchange', data);
});

ipc.on('download', () => {
    console.log('ipc download', fox.connected)
    if (fox.connected) {
        download();
    } else {
        dialog.showErrorBox('No compatible USB Device', _('Message.NoCompatibleUSBDevice'))
    }
});

app.on('ready', () => {
    try {
        let locale = app.getLocale().substr(0, 2);
        const available = ['cn', 'cs', 'cz', 'de', 'en', 'es', 'fr', 'hu', 'it', 'ja', 'nl', 'pl', 'ru', 'sk', 'sr', 'tr', 'ua'];
        if (available.indexOf(locale) === -1) {
            locale = 'en;'
        }
        const fp = path.join(__dirname, 'i18n', locale + '.json');
        lang = JSON.parse(fs.readFileSync(fp).toString());
        console.log('LANG', locale);
    } catch (err) {
        console.log(err);
        return;
    }

    createWindow();
    setTimeout(function () {
        ipcSend('foxfirmware', fox.minimumSupportedBuildNumber);
    }, 1000);
    setTimeout(function () {
        fox.connect();
    }, 1500);
    setTimeout(function () {
        autoconnect = false;
    }, 2000);

});

app.on('window-all-closed', () => {
    fox.close();
    app.quit();
});

app.on('will-quit', () => {
    fox.close();
    app.quit();
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

function ipcSend(key, data) {
    if (mainWindow) {
        mainWindow.webContents.send(key, data);
    } else {
        //if (port) port.close();
        app.quit();
    }
}

function _(key) {
    if (lang && lang[key]) {
        return lang[key];
    } else {
        return key;
    }
}


