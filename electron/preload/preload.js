const { ipcRenderer, contextBridge } = require("electron")
const Download=require("./download")
// preload.js
const colse=()=> {ipcRenderer.send("mainwin-colse")}
const minimize=()=> {ipcRenderer.send("mainwin-minize")}
const maximize=()=> {ipcRenderer.send("mainwin-maximize")}
const ElMessage=(fun)=> ipcRenderer.on("ElMessage",(event,data) =>fun(data))


// 所有Node.js API都可以在预加载过程中使用。
contextBridge.exposeInMainWorld("MusicApp",{
  colse,minimize,maximize,Download,ElMessage
})
// 它拥有与Chrome扩展一样的沙盒。
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  })
  