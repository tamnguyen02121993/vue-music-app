const { app, BrowserWindow} = require('electron');
const env = require("./env.json")

let mainWindow;

const createWindow = () => {
    mainWindow =  new BrowserWindow({width: 800, height: 600});
    // mainWindow.loadURL('https://tamnguyen02121993-music-app.surge.sh')
    mainWindow.loadURL(env.ELECTRON_START_URL)
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});