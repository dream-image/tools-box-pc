const { app, BrowserWindow, Menu, Tray } = require('electron')
// const path = require("path")

let tray = null

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  })
  mainWindow.removeMenu()
  mainWindow.setIcon(__dirname + "/public/工具箱.png")

  mainWindow.loadURL(`http://localhost:${process.env.PORT || 3000}`);
}
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    // 当运行第二个实例时,将会聚焦到 mainWindow 这个窗口

    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
      // mainWindow.show();
    }
  });
}
app.whenReady().then(() => {
  createWindow()
  tray = new Tray('./public/工具箱.png')
  const contextMenu = Menu.buildFromTemplate([
    { label: '关闭', type: 'normal',role:'quit' },
  
  ])
  tray.setToolTip('工具箱')
  tray.setContextMenu(contextMenu)
})
