const { Menu } = require("electron/main");

class DownloadMenu{
    constructor(mainwin,download){
        this.win=mainwin;
        this.download=download;
        this.contextMenu;
        this.uuid=null;
    }
    create(){
    //托盘
    this.contextMenu = Menu.buildFromTemplate([
      { label: '开始', click:()=>this.download.event(this.uuid,"resume")},
      { label: '暂停', click:()=>this.download.event(this.uuid,"pause")},
      { label: '删除', click:()=>this.download.event(this.uuid,"cancel")}
    ])
    }
    popup(uuid){
    this.uuid=uuid;
    this.contextMenu.popup(this.win);
    }
}
module.exports=DownloadMenu