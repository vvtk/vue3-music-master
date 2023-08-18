const { app } = require('electron');
const Store = require('electron-store');
const path = require('path');
 
let option={
    name:"config",//文件名称,默认 config
    fileExtension:"json",//文件后缀,默认json
    cwd:app.getPath('userData'),//文件位置,尽量不要动，默认情况下，它将通过遵循系统约定来选择最佳位置。C:\Users\xxx\AppData\Roaming\test\config.json
//    encryptionKey:"aes-256-cbc" ,//对配置文件进行加密
    clearInvalidConfig:true, // 发生 SyntaxError  则清空配置,
}

// console.log('size', electronStore.size) // 获取项目总个数
// console.log('path', electronStore.path) // 获取存储文件的路径
// console.log('store', electronStore.store) // 获取所有数据作为对象或将当前数据替换为对象
// console.log('set', electronStore.set()) // 存储数据
// console.log('get', electronStore.get()) // 获取数据
// console.log('delete', electronStore.delete()) // 删除某项数据
// console.log('clear', electronStore.clear()) // 清除所有store数据
// console.log('has', electronStore.has()) // 检测是否存在某条数据
const  store = new Store(option);
!store.get("DownloadPath")&&store.set("DownloadPath",path.join(app.getPath('downloads'),'music'))
module.exports=store;