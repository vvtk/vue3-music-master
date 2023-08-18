<template>
    <div class="pl-5 pr-5 music">
        <h1 class="text-3xl font-bold pt-8 pb-2">最近播放</h1>
        <el-tabs class="mt-3" v-model="tab">
            <el-tab-pane lazy :label="`歌曲 ${songList.length}`" name="songs">
                <!-- ------------------------- -->
                <div class="justify-self-stretch gap-x-2 pt-2 flex items-center">
                    <button class="w-32 button">
                        <IconPark :icon="PlayOne" size="22" class="mr-1" />
                        <span>播放全部</span>
                    </button>
                    <button class="w-20 button-outline">
                        <Install :icon="Like" size="18" class="mr-1" />
                        <span>下载</span>
                    </button>
                    <button class="button-outline w-8">
                        <IconPark :icon="More" />
                    </button>
                </div>
                <!-- ------------------------- -->
                <div class="flex text-xs text-gray-400 py-2 mt-2">
                    <div class="flex-auto">歌曲</div>
                    <div class="w-1/4">歌手</div>
                    <div class="w-1/4">专辑</div>
                    <div class="w-20">时长</div>
                </div>
                <template v-for="songs in songList" :key="songs.id">
                    <song-list-item :song="songs.song" show-ar-name show-al-name />
                </template>
                <p class="mx-1 text-center  text-xs text-gray-400 mt-6" v-if="!songList.length">没有播放过歌曲</p>
            </el-tab-pane>
            <el-tab-pane lazy label="视频" name="comments" />
        </el-tabs>
    </div>
</template>
<script setup lang="ts">
import { Like, More, PlayOne, Install } from '@icon-park/vue-next'
import SongListItem from "@/components/common/SongListItem.vue";
import IconPark from "@/components/common/IconPark.vue";
import { useUserStore } from "@/stores/user_code";
import { onMounted, ref } from 'vue';
import { useuserrecord } from '@/utils/api';
import { storeToRefs } from 'pinia';
import type { Song } from '@/models/song';
const tab = ref("songs")
const { login_after } = useUserStore();
const songList = ref<Array<any>>([])
const { profile } = storeToRefs(useUserStore())
onMounted(() => login_after(() => {
    useuserrecord(profile?.value?.userId).then(set => {
        console.log(songList.value.length);
        if (set.code == 200){
            console.log( songList.value,set.allData);
            songList.value = set.allData;
            console.log(songList.value);
        }
    })
}))
</script>
<style lang="scss"></style>