<template>
 <div class="pl-5 pr-5 music">
        <h1 class="text-3xl font-bold pt-8 pb-2">本地与下载</h1>
        <el-tabs class="mt-3" v-model="tab">
            <el-tab-pane lazy :label="`本地歌曲 ${localList.length}`" name="localSongs"><tabLocalSongs/></el-tab-pane>
            <el-tab-pane lazy label="下载歌曲" name="DownloadSongs" />
            <el-tab-pane lazy label="下载视频" name="DownloadVideo" />
            <el-tab-pane lazy :label="`正在下载 ${DownloadList.length}`" name="Download"><Download/></el-tab-pane>
        </el-tabs>
    </div>
</template>
<script setup lang="ts">
import tabLocalSongs from "@/views/localDownload/localSongs.vue"
import Download from "@/views/localDownload/Download/Download.vue"
import {useDownload} from "@/stores/download"
import { onMounted, ref,toRefs } from 'vue';
import { storeToRefs } from "pinia";
import { uselocalMusic } from "@/stores/localMusic";
const tab = ref("localSongs")
const {DownloadList}=toRefs(useDownload())
const { localList } = storeToRefs(uselocalMusic());
</script>
<style lang="less">
    
</style>