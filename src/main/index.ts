import { app, shell, BrowserWindow, ipcMain, session } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

let splash: BrowserWindow | null = null
let mainWindow: BrowserWindow | null = null

function createWindow(): void {
  // Crear splash screen
  splash = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    icon,
    show: true
  })

  splash.loadFile(join(__dirname, '../../resources/splash.html'))

  // Crear ventana principal
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    resizable: true,
    icon,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  if (!is.dev) {
    session.defaultSession.webRequest.onBeforeRequest(
      { urls: ['*://*/*'] },
      (details, callback) => {
        const url = details.url

        if (url.startsWith('file://') && url.includes('/api/')) {
          const apiPath = url.split('/api/')[1]
          const newUrl = `http://10.147.17.37:5000/api/${apiPath}`
          callback({ redirectURL: newUrl })
        } else {
          callback({})
        }
      }
    )
  }


  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // Mostrar cuando esté lista
  mainWindow.webContents.on('did-finish-load', () => {
    setTimeout(() => {
      splash?.destroy()
      splash = null
      mainWindow?.show()
    }, 500)
  })
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
