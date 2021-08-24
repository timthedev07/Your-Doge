const path = require("path");

const { app, BrowserWindow, webFrame } = require("electron");
const isDev = require("electron-is-dev");

function createWindow() {
  const win = new BrowserWindow({
    width: 55000,
    height: 3000,
    webPreferences: {
      nodeIntegration: true,
    },
    minWidth: 350,
  });

  win.loadURL(isDev ? "http://localhost:3000" : `https://yourdoge.vercel.app`);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
