
const { BrowserWindow, screen, ipcMain } = require('electron');
const  path  = require('path');
const events=require('events')

const winconfig={
    frame:false,
    transparent:true,
    focusable:false,
    width: 800,
    height: 150,
    minWidth:800,
    minHeight:150,
    alwaysOnTop:true,
    webPreferences:{
        preload:path.join(__dirname,"../preload/lyric.js")
    }
}
class Suspendlyric extends events{
    constructor(config,mainwin){
        super()
        this.config=config;
        this.mainwin=mainwin
        this.conf=Object.assign({},winconfig,this.config)
        this.win=new BrowserWindow(this.conf);
        this.win.webContents.openDevTools()
        this.win.loadURL(`${path.join(__dirname, '../../public/html/text_lyric.html')}`);
        this.init();
    }
    init() {
        this.win.once('ready-to-show', () => {
            this.win.show()
        })
        this.win.on('show', () => {
            this.emit('show')
        })
        this.listenIpc()
    }
    listenIpc() {
        // 最小化窗口
        ipcMain.on('lyric-minize', () => {
            this.win.minimize()
        })
        // 全屏
        ipcMain.on('lyric-maximize', () => {
            if(this.win.isMaximized()){
            this.win.restore()
            }else{
            this.win.maximize()
            }
        })
        ipcMain.on('lyric-colse', () => {
            this.win.hide();
        })
        // 点击穿透
        ipcMain.on('lyric-setIgnoreMouseEvents', (event,...data) => {
            this.win.setIgnoreMouseEvents(...data)
        });
        ipcMain.handle('lyric-getPosition', (event) => this.win.getPosition());
        ipcMain.on('lyric-setPosition', (event,...data) => {
            this.win.setBounds({ x: data[0], y: data[1] })
        });
        ipcMain.on('lyric-mainwin-show', () => {
            this.mainwin.show();
        });
    }
}
module.exports = Suspendlyric