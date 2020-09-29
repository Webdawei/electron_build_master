'use strict'

import { app, protocol, BrowserWindow, ipcMain, ipcRenderer } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 700,
    height: 600,
		minWidth:1000,
		minHeight:600,
    webPreferences: {
      // nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
			nodeIntegration: true,
			webviewTag: true,
			webSecurity: false,
			allowDisplayingInsecureContent: true,
			allowRunningInsecureContent: true,
    },
		frame: false,// 去除顶部操作按钮
  })
	
	// 去除顶部菜单选框
	win.setMenu(null);
	
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }
	
	// 控制窗口大小以及关闭
  ipcMain.on('close', () => {
		win.destroy();
  })
	ipcMain.on('toMinimize', () => {
		win.minimize();
	})
	ipcMain.on('toMaximize', () => {
		if (win.isMaximized()) {
			win.unmaximize();
		} else {
			win.maximize();
		}
	})
	ipcMain.on('changeWinSize', (event, arg) => {
		let [w,h] = [0,0];
		w = parseInt(arg.split(",")[0]);
		h = parseInt(arg.split(",")[1]);
		win.setSize(w, h);
	})
	// 拖拽调整窗口位置
	ipcMain.on('changeWinPosition', (event, arg) => {
		let [x,y] =[0,0];
		x = arg.split(",")[0];
		y = arg.split(",")[1];
		win.setBounds({ x: win.getPosition()[0] + parseInt(x), y: win.getPosition()[1] + parseInt(y) })
	})
	ipcMain.on('changeWinPositionByScreen', (event, arg) => {
		let [win_x,win_y,_width,_height] =[0,0,0,0];
		_width = arg.split(",")[0];
		_height = arg.split(",")[1];
		win_x = arg.split(",")[2];
		win_y = arg.split(",")[3];
		win.setBounds({ x: (_width - parseInt(win_x))/2, y: (_height - parseInt(win_y))/2 })
	})
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
