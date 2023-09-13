const { Menu, Tray } = require("electron")

class win_Tray{
    constructor(){
    }
    create(){
    //托盘
    this.tray = new Tray("./public/icon/music.png")
    const contextMenu = Menu.buildFromTemplate([
      { label: '开始播放', type: 'radio'},
      { label: '停止播放', type: 'radio'},
      { label: '上一首歌', type: 'radio'},
      { label: '下一首歌', type: 'radio'},
      { label: '设置', type: 'radio'},
      { label: '退出',role:"quit"},
    ])
    this.tray.setToolTip('音乐程序')
    this.tray.setContextMenu(contextMenu)
    console.log(this.tray.getBounds());
    }
}
module.exports=win_Tray