require("dotenv").config();

const { app, BrowserWindow, Menu, nativeImage } = require("electron");
const localShortcut = require("electron-localshortcut");
const path = require("path");
const log = require("electron-log");
// const serverStart = require("./server/server.js");
const initServer = require("./server/server_model.js");

log.transports.file(path.join(__dirname, "logs.log"));

app.on("web-contents-created", (event, contents) => {
  contents.on("will-attach-webview", (event, webPreferences, params) => {
    delete webPreferences.preload;
    webPreferences.nodeIntegration = true;
    webPreferences.worldSafeExecuteJavaScript = true;
    webPreferences.contextIsolation = false;
  });
});

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 870,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const iconPath = path.join(__dirname, "icon.ico");
  const image = nativeImage.createFromPath(iconPath);

  mainWindow.setIcon(image);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  const indexPath = path.join(__dirname, "/pages", "/index.html");
  mainWindow.loadFile(indexPath);
  Menu.setApplicationMenu(null);

  localShortcut.register(mainWindow, "Ctrl+Shift+I", () => {
    mainWindow.webContents.openDevTools();
  });

  process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
  });

  initServer(app);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
