<template>
    <!-- ------------------------- -->
    <div class="justify-self-stretch gap-x-2 pt-2 flex items-center">
        <button class="w-32 button">
            <IconPark :icon="PlayOne" size="22" class="mr-1" />
            <span>播放全部</span>
        </button>
        <button class="w-32 button-outline">
            <Add :icon="Like" size="18" class="mr-1" />
            <span>添加</span>
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
    <template v-for="songs in localList" :key="songs.id">
        <song-list-item :song="songs.info" show-ar-name show-al-name />
    </template>
    <p class="mx-1 text-center  text-xs text-gray-400 mt-6" v-if="!localList.length">没有播放过歌曲</p>
</template>
<script setup lang="ts">
import { Like, More, PlayOne, Add } from '@icon-park/vue-next'
import SongListItem from "@/components/common/SongListItem.vue";
import IconPark from "@/components/common/IconPark.vue";
import { useUserStore } from "@/stores/user_code";
import { toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import { uselocalMusic } from '@/stores/localMusic';
 uselocalMusic().getlocalList();
const { localList } = storeToRefs(uselocalMusic());
const { profile } = storeToRefs(useUserStore())

</script>
<style lang="">
    
</style>