const { ipcRenderer } = require("electron")
//修改文件路径
const openFileDialog=()=>ipcRenderer.invoke("openFileDialog")
//下载模块
const DownloadInfo=()=> ipcRenderer.invoke("downloadInfo")
const DownloadInfoStart=(fun)=> ipcRenderer.on("DownloadInfoStart",(event) =>fun())
const DownloadInit=()=> ipcRenderer.invoke("DownloadInit")
const getDownloadPath=()=> ipcRenderer.invoke("getDownloadPath")
const DownloadStart=(data)=> ipcRenderer.send("mainwin-Download-Start",data)
const Paused=(id)=>ipcRenderer.invoke("Paused",id)
const cancel=(id)=>ipcRenderer.invoke("cancel",id)
const popup=(id)=>ipcRenderer.send("DownloadMenuPopup",id)
const resumeAll=()=>ipcRenderer.send("resumeAll")
const pauseAll=()=>ipcRenderer.send("pauseAll")
const cancelAll=()=>ipcRenderer.send("cancelAll")
const getlocal=()=>ipcRenderer.invoke("getlocal")
const Download={DownloadInfo,DownloadStart,getDownloadPath,openFileDialog,DownloadInit,DownloadInfoStart,cancel,Paused,popup,resumeAll,pauseAll,cancelAll,getlocal}
module.exports=Download