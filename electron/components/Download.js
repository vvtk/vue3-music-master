const {
    ipcMain,
    app,
    dialog
} = require("electron")
const path = require("path");
const DownloadMenu = require("../menu/Download");
const store=require("./ElectronStore")
const fs = require("fs");
module.exports = function () {
    const mainwin=this;
    const download=new downloadClass(mainwin)
    const Menu=new DownloadMenu(mainwin,download)
    Menu.create()
    download.create()
    ipcMain.on("mainwin-Download-Start", (every, data) => {
        if(data.id&&data.url){
            download.flielist.push({info:data});
            this.webContents.downloadURL(data.url);
        }
    })
  
    ipcMain.handle('downloadInfo', (event) => {
        const listinfo=Object.values(download.flieinfo)
        const ReceivedAll=eval(listinfo.map(itme=>itme.Received).join("+"))
        const ziseAll=eval(listinfo.map(itme=>itme.zise).join("+"))
        mainwin.setProgressBar(ziseAll/ReceivedAll)
        return listinfo;
    })
    ipcMain.handle('getDownloadPath', (event) => download.oldPath)
    ipcMain.handle("Paused",(event,uuid)=> download.event(uuid,'isPaused')?download.event(uuid,'resume'):download.event(uuid,'pause'))
    ipcMain.handle("cancel",(event,uuid)=> download.event(uuid,'cancel'))
    ipcMain.on("DownloadMenuPopup",(event,uuid)=>Menu.popup(uuid))
    ipcMain.handle('openFileDialog', (event, oldPath) => {
        const pathurl=openFileDialog(mainwin,oldPath);
        path.join(app.getPath('downloads'),path.join(pathurl))
        download.oldPath=pathurl;
        return pathurl;
    })
    ipcMain.on("resumeAll",()=>download.eventAll("resume"))
    ipcMain.on("pauseAll",()=>download.eventAll("pause"))
    ipcMain.on("cancelAll",()=>download.eventAll("cancel"))
    // 持久存储
    ipcMain.handle("getlocal",()=>download.get())
}

class downloadClass {
    constructor(win){
        this.oldPath=store.get("DownloadPath") ?? path.join(app.getPath('downloads'),'music')
        this.flielist=[]
        this.flieinfo={}
        this.sender=null
        this.win=win
    }
    create(){
        ipcMain.handle('DownloadInit', (event) => {
            this.sender=event.sender;
            return ''
        })
        this.win.webContents.session.on("will-download", (event, item, webContents) => {
            // state 0:开始,1:下载中,2:停止,3:已中断,4:完成
            const urlPath=path.join(this.oldPath,item.getFilename())
            item.setSavePath(path.join(this.oldPath,item.getFilename()));
            let fliesIndex=this.flielist.findIndex(finditme=>finditme.info.url==item.getURL())
            let info=this.flielist[fliesIndex].info
            console.log("info",info.id,item.getURL());
            this.flielist[fliesIndex]={id:info.id,flie:item,url:item.getURL(),info:info}
            let prevReceivedBytes = 0;//速度缓存
            this.info_default(info,item,{state:0,path:urlPath})
            this.sender.send("DownloadInfoStart",this.flieinfo)
            item.on('updated', (event, state) => {
                if (state === 'interrupted') {
                    this.info_default(info,item,{state:3,path:urlPath})
                } else if (state === 'progressing') {
                    if (item.isPaused()) {
                        this.info_default(info,item,{state:2,path:urlPath})
                    } else {
                        this.info_default(info,item,{state:1,speed: item.getReceivedBytes() - prevReceivedBytes,path:urlPath})
                        prevReceivedBytes=item.getReceivedBytes();
                    }
                }
            })
            item.once('done', (event, state) => {
                if (state === 'completed') {
                    this.info_default(info,item,{state:4,path:urlPath})
                     this.push(Object.assign(this.flieinfo[info.id]))
                    setTimeout(()=>{delete this.flieinfo[info.id];},1200)
                } else if(state==="interrupted") {
                    delete this.flieinfo[info.id];
                    this.sender.send("ElMessage",{
                        message: '下载错误',
                        type: 'warning',
                      })
                } else {
                    delete this.flieinfo[info.id];
                }
            })
        })
    }
    info_default(info,item,data={},state=null){
        this.flieinfo[info.id]=Object.assign({id:info.id,info,name:item.getFilename(),url:item.getURL(),state,speed:0,schedule:item.getReceivedBytes() / item.getTotalBytes(),Received:item.getReceivedBytes(),zise:item.getTotalBytes(),StartTime:item.getStartTime()},data)
    }
    event(uuid,event){
       const flies=this.flielist.find(itme=>itme.id==uuid)
        if (flies) {
            return  flies.flie[event]()
        }else{
        return false
        }
    }
    eventAll(event){
        for (const iterator of this.flielist) {
            iterator.flie[event]()
        }
    }
    /** 持久存储 */
    push(data){
        const getdata=store.get("download")??[]
        getdata.push(data)
        store.set("download",getdata)
    }
    /** 持久存储 过滤文件存在*/
    get(){
        const getdata=store.get("download")??[]
        const list=[]
        for (const item of getdata) {
            if (fs.existsSync(item.path)) {
                list.push(item)
            }
        }
        return list;
    }

}

/**
 * 打开文件选择框
 * @param oldPath - 上一次打开的路径
 */
const openFileDialog = async (win,oldPath = store.get("DownloadPath")) => {
    if (!win) return oldPath;
    console.log(win);
    const {
        canceled,
        filePaths
    } = await dialog.showOpenDialog(win,{
        title: '选择保存位置',
        properties: ["openDirectory", 'createDirectory',"promptToCreate"],
        defaultPath: oldPath
    })
    return !canceled ? filePaths[0] : oldPath
}