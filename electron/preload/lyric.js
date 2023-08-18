const { contextBridge, ipcRenderer } = require("electron")

// preload.js
const colse=()=> {ipcRenderer.send("lyric-colse")}
const minimize=()=> {ipcRenderer.send("lyric-minize")}
const maximize=()=> {ipcRenderer.send("lyric-maximize")}
const setIgnoreMouseEvents=(...data)=> {ipcRenderer.send("lyric-setIgnoreMouseEvents",...data)}
const getPosition=()=> ipcRenderer.invoke("lyric-getPosition");
const setPosition=(...data)=> {ipcRenderer.send("lyric-setPosition",...data)}
const MainwinShow=()=> {ipcRenderer.send("lyric-mainwin-show")}


// 所有Node.js API都可以在预加载过程中使用。
contextBridge.exposeInMainWorld("MusicApp",{
    colse,minimize,maximize,setIgnoreMouseEvents,getPosition,setPosition,MainwinShow
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
    