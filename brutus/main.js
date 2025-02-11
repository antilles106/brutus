'use strict';
 
const electron = require("electron");
const appExpress = require("./app");
 
const myapp = electron.app;
 
const BrowserWindow = electron.BrowserWindow;
 
let mainWindow;

myapp.enableSandbox();

myapp.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    myapp.quit();
  }
});
 
myapp.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1100, height: 800,
    webPreferences: { nodeIntegration : false } 
  });
  mainWindow.loadURL('http://127.0.0.1:3000');

  mainWindow.on('closed', function() {
  mainWindow = null;
  });
});
