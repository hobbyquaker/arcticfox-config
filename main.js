const electron =            require('electron');
const app =                 electron.app;
const Menu =                electron.Menu;
const ipc =                 electron.ipcMain;
const BrowserWindow =       electron.BrowserWindow;
const dialog =              electron.dialog;

const storage =             require('electron-json-storage');
const windowStateKeeper =   require('electron-window-state');
const isDev =               require('electron-is-dev');

const path =                require('path');
const url =                 require('url');
const fs =                  require('fs');
const async =               require('async');
const fox =                 require('arcticfox');

let mainWindow;
let menu;
let debug;

let menuTemplate = [
    {

        label: 'Tools',
        submenu: [

        ]
    },
    {
        label: 'Settings',
        submenu: [

        ]
    }

];

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
        defaultHeight: 572
    });

    let devWindowState = {
        width: 1280,
        height: 572
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

fox.on('connect', () => {
    ipcSend('connect', true);
    fox.readConfiguration((err, data) => {
        if (err) {
            throw err;
        }
        ipcSend('config', data);
    });
});

fox.on('close', () => {
    ipcSend('connect', false);
});

fox.on('error', err => {
    debug(err);
});

ipc.on('download', () => {
    fox.readConfiguration((err, data) => {
        if (err) {
            throw err;
        }
        ipcSend('config', data);
    });
});

ipc.on('upload', (event, data) => {
    fox.writeConfiguration(data);
});

ipc.on('tfr', (event, data) => {
    let tfrWin = new BrowserWindow({
        width: isDev ? 1000 : 545,
        height: 340,
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

ipc.on('piregchange', (event, data) => {
    ipcSend('piregchange', data);
});

app.on('ready', () => {
    createWindow();
    setTimeout(function () {
        fox.connect();
    }, 1000);
});

app.on('window-all-closed', () => {
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

