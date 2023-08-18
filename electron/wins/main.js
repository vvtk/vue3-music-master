const {
    BrowserWindow,
    ipcMain,
    app
} = require('electron');
const path = require('path');
const events = require('events')
const Download=require("../components/Download")
const winconfig = {
    frame: false,
    transparent: false,
    alwaysOnTop: true,
    focusable: true,
    show: false,
    width: 1024,
    height: 625,
    minWidth: 850,
    minHeight: 520,
    webPreferences: {
        // NodeIntegration: true,
        // contextIsolation: false,
        contextIsolation: true,
        preload: path.join(__dirname, '../preload/preload.js')
    }
}
class Suspendmain extends events {
    constructor(config) {
        super()
        this.config = config;
        this.conf = Object.assign({}, winconfig, this.config)
        this.win = new BrowserWindow(this.conf);
        this.win.loadURL(
            process.env.NODE_ENV === 'development' ?
            'http://127.0.0.1:3001/vue3-music' :
            // 'https://zlq520.gitee.io/music/#/likeMusic' :
            `http://127.0.0.1:1024/index.html`
        )
        // 打开开发工具
        if (process.env.NODE_ENV === "development") {
            this.win.webContents.openDevTools()
        }
        this.init()
    }
    init() {
        this.win.once('ready-to-show', () => {
            setTimeout(()=>{this.win.show()},2000)
        })
        this.win.once('show', () => {
            this.emit('show')
        })
        this.listenIpc()
    }
    listenIpc() {
        // 最小化窗口
        ipcMain.on('mainwin-minize', () => {
            this.win.minimize()
        })
        // 全屏
        ipcMain.on('mainwin-maximize', () => {
            if(this.win.isMaximized()){
            this.win.restore()
            }else{
            this.win.maximize()
            }
        })
        ipcMain.on('mainwin-colse', () => {
            // app.quit()
            this.win.hide()
        })
        this.win.setAspectRatio(1024/625)
        Download.bind(this.win)()
    }
}
module.exports = Suspendmain