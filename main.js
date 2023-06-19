const {app, BrowserWindow, ipcMain, Menu} = require('electron')
const path = require('path')

let win

const isDev = process.env.NODE_ENV !== undefined && process.env.NODE_ENV === "development"? true:false

function createWindow(){
    win = new BrowserWindow({
        width: 1920,
        height: 1080,
        fullscreen: true,
        show: false,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
        },
    })

    win.loadFile('./src/index.html')
    if(isDev){
        win.webContents.openDevTools()
    }

    win.once('ready-to-show', ()=>{
        win.show()
    })

    ipcMain.on('redirect-to-client', () => {
        const newPath = path.join(__dirname, 'client.html');
        win.loadFile(newPath);
    })

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
}

app.whenReady().then(()=>{
    createWindow()
})

app.on('window-all-closed', ()=>{
    console.log("Todas as janelas foram fechadas!")
    app.quit()
})

app.on('activate', ()=>{
    if(BrowserWindow.getAllWindows().length === 0){
        createWindow()
    }
})

const menuTemplate = [

]