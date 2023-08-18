
import type { Song } from "@/models/song";
import { usedownloadurl } from "@/utils/api";
import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
import { ref,computed } from "vue";

export const useDownload= defineStore("download",{
    state: () => {
        return {
         DownloadList:[] as any,
         Interval:null as any,
        };
      },
    actions: {
        create(){
            (window as any).MusicApp.Download.DownloadInit();
            (window as any).MusicApp.ElMessage((data:any)=>{ElMessage(data)});
            (window as any).MusicApp.Download.DownloadInfoStart(()=>{
                this.Interval&&clearInterval(this.Interval)
                this.Interval=setInterval(async ()=>{
                    this.DownloadList=await (window as any).MusicApp.Download.DownloadInfo();
                    console.log(this.DownloadList);
                    
                    if (!Object.keys(this.DownloadList).length) 
                        clearInterval(this.Interval)
                },1000)
            });
        },
        speed:(speed:number)=>computed(()=>{
            let i=0;
            let speedString=["B","KB","MB","GB"]
            while(speed>1024){
                speed=speed/1024;
                i++;
            }
            const speeds=speed.toFixed(2)+speedString[i]
            return speeds
        }),
        Paused:(row:any)=>console.log((window as any).MusicApp.Download.Paused(row.id)),
        colse:()=>(window as any).MusicApp.Download.cancel(),
        popup:(row:any)=>(window as any).MusicApp.Download.popup(row.id),
        resumeAll:()=>(window as any).MusicApp.Download.resumeAll(),
        pauseAll:()=>(window as any).MusicApp.Download.pauseAll(),
        cancelAll:()=>(window as any).MusicApp.Download.cancelAll(),
        openDownload:(song:Song)=>usedownloadurl(song.id).then(async itmes=>{
            for (const iterator of itmes.data) {
                if (iterator.url){
                    const  info:any=JSON.parse(JSON.stringify( Object.assign( await song,await iterator)));
                    (window as any).MusicApp.Download.DownloadStart(info);
                    ElMessage.success("开始下载")
                }else
                ElMessage.warning("下载错误")
            }
           
        })
    }
})

