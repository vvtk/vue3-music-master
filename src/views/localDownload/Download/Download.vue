<template>
    <!-- ------------------------- -->
    <div class="justify-self-stretch gap-x-2 pt-2 flex items-center">
        <button class="w-32 button" @click="resumeAll">
            <IconPark :icon="PlayOne" size="22" class="mr-1" />
            <span>全部开始</span>
        </button>
        <button class="w-32 button-outline" @click="pauseAll">
            <Pause :icon="Like" size="18" class="mr-1" />
            <span >全部暂停</span>
        </button>
        <button class="button-outline w-32" @click="cancelAll">
            <Delete :icon="Like" size="18" class="mr-1" />
            <span>清空</span>
        </button>
    </div>
    <!-- ------------------------- -->
    <!-- <div class="flex text-xs text-gray-400 py-2 mt-2">
            <div class="flex-auto">歌曲</div>
            <div class="w-1/4">歌手</div>
            <div class="w-1/4">专辑</div>
            <div class="w-20">时长</div>
        </div>
        <template v-for="songs in songList" :key="songs.id">
            <song-list-item :song="songs.song" show-ar-name show-al-name />
        </template> -->
    <el-table :data="DownloadList" header-row-class-name="text-xs text-gray-400" height="390" style="width: 100%" @row-contextmenu="popup">
        <el-table-column prop="info.name" label="歌曲" max-width="180"  />
        <el-table-column prop="schedule" label="进度" min-width="130" >
            <template #default="scope">
                <el-progress  :percentage="Number((scope.row.schedule*100).toFixed(2))" :format="()=>formatFun(Number((scope.row.schedule*100).toFixed(2)),scope.row.state)"  style="width: 100%;"/>
            </template>
        </el-table-column>
        <el-table-column  label="下载速度" min-width="50" align="center"   max-width="50" >
            <template #default="scope">
                <p >{{ `${speed(scope.row.speed).value}/S` }}</p>
                <!-- <p v-if="scope.row.state==0">开始</p>
                <p v-if="scope.row.state==2">停止</p>
                <p v-if="scope.row.state==3">断开</p> -->
            </template>
        </el-table-column>
        <el-table-column  label="文件大小" min-width="50" align="center"  max-width="80" >
            <template #default="scope">
                {{ `${speed(scope.row.zise).value}` }}
            </template>
        </el-table-column>
        <template #empty>
            <p class="mx-1 text-center  text-xs text-gray-400 mt-6">没有正在下载的歌曲</p>
        </template>
    </el-table>
</template>
<script setup lang="ts">
import { Like, Delete, PlayOne, Pause, Windows } from '@icon-park/vue-next'
import SongListItem from "@/components/common/SongListItem.vue";
import IconPark from "@/components/common/IconPark.vue";
import { useUserStore } from "@/stores/user_code";
import { onMounted, ref, toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import { useDownload } from '@/stores/download';
const { login_after } = useUserStore();
const songList = ref<Array<any>>([])
const { profile } = storeToRefs(useUserStore())
const {DownloadList}=toRefs(useDownload());
const {speed,popup,resumeAll,pauseAll,cancelAll}=useDownload();
const formatFun=(percentage:Number,state:Number) => {
    switch (state) {
        case 0:
            return "开始";
        case 1:
            return `${percentage}%`;
        case 2:
            return "停止";
        case 3:
            return "已中断";
        case 4:
            return "完成";
        default:
            return "错误"
    }
}
</script>
<style lang="">
    
</style>