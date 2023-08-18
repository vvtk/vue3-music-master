
import type { Song } from "@/models/song";
import { usedownloadurl } from "@/utils/api";
import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
import { ref,computed } from "vue";

export const uselocalMusic= defineStore("localMusic",{
    state: () => {
        return {
            localList:[] as Array<any>
        };
      },
    actions: {
     async getlocalList(){
            this.localList= await (window as any).MusicApp.Download.getlocal()
        }
    }
})
