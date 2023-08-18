<template>
    <div class="flex items-stretch">
      <img :src="playlist?.first()?.coverImgUrl" alt="" class="w-44 h-44 object-cover rounded-xl flex-shrink-0">
      <div class="pl-5 flex flex-col py-1 flex-1">
        <div>
          <div class="text-2xl font-bold">{{ playlist?.first()?.name }}</div>
          <div class="flex items-center text-xs text-dc pb-2 pt-3">
            <el-avatar :src="playlist?.first()?.creator?.avatarUrl" size="small" round/>
            <span class="ml-2">{{ playlist?.first()?.creator?.nickname }}</span>
            <div class="ml-5 flex text-dc">
              <div class="ml-2 hover-text">{{ new Date(playlist?.first()?.createTime).toLocaleDateString() }}创建</div>
            </div>
          </div>
        </div>
        <div class="justify-self-stretch mt-5 gap-x-2 flex items-center">
          <button class="w-32 button"  @click="playAll">
            <IconPark :icon="PlayOne" size="22" class="mr-1"/>
            <span>播放全部</span>
          </button>
          <button class="w-20 button-outline">
            <Share :icon="Like" size="18" class="mr-1"/>
            <span>分享</span>
          </button>
          <button  class="button-outline w-8">
            <IconPark :icon="More"/>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import {PlayOne, Like, More,Share} from '@icon-park/vue-next'
  import IconPark from "@/components/common/IconPark.vue";
import type { userPlaylist } from '@/models/userPlaylist';
  
  defineProps<{
    playlist: userPlaylist|undefined,
    playAll?: () => void,
  }>()
  </script>
  