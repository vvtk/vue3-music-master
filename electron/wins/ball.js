
const { BrowserWindow } = require('electron');
const  path  = require('path');
const events=require('events')

const winconfig={
    frame:false,
    transparent:true,
    alwaysOnTop:true,
    focusable:false,
    resizable:false,
    width: 300,
    height: 300,
    // webPreferences:{
    //     preload:path.join(__dirname,"../src/package/ballprekoad.js")
    // }
}
class SuspendBall extends events{
    constructor(config){
        super()
        this.config=config;
        this.conf=Object.assign({},winconfig,this.config)
        this.win=new BrowserWindow(this.conf);
        this.win.loadURL(
            process.env.NODE_ENV === 'development'
        ? 'http://127.0.0.1:3001/html/ball_loading.html'
        :`file://${path.join(__dirname, '../html/ball_loading.html')}`
        )
        this.init()
    }
    init() {
        this.win.once('ready-to-show', () => {
            this.win.show()
        })
        this.win.on('show', () => {
            this.emit('show')
        })
        // this.listenIpc()
    }
}
module.exports = SuspendBall