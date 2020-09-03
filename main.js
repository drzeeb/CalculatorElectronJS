// Modules to control application life and create native browser window
const electron = require('electron');
const {app, BrowserWindow} = electron

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const WINDOW_WIDTH = 400;
const WINDOW_HEIGHT = 350;

function createWindow () {
  // Create the browser window.
  let bounds = electron.screen.getPrimaryDisplay().bounds;
  let x = Math.ceil(bounds.x + ((bounds.width - WINDOW_WIDTH) / 2));
  let y = Math.ceil(bounds.y + ((bounds.height - WINDOW_HEIGHT) / 2));
  mainWindow = new BrowserWindow({width: WINDOW_WIDTH, height: WINDOW_HEIGHT, x: x, y: y, center: true});
  //mainWindow.webContents.openDevTools()
  mainWindow.setMenu(null);
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
