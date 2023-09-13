<template>
  <Title title="推荐新音乐"/>
  <el-skeleton style="width: auto" :loading="personalizedNewSong.sampleSize(10).length == 0" animated>
    <!-- 骨架屏 -->
    <template #template>
       <div class="grid grid-flow-row grid-cols-2 lg:grid-cols-2 gap-5">
          <div  v-for="item in 10" :key="item">
            <el-skeleton-item class="banner-image"  style="height: 50px;width: 15%;" />
            <div style="height: 50px;width: 80%;display: inline-block; margin-left: 5%;" >
              <el-skeleton-item style="width: 50%;"  />
              <el-skeleton-item  style="width: 80%;" />
            </div>
          </div>
       </div>
    </template>
    <!-- 默认显示 -->
    <template #default>
      <div class="grid grid-flow-row grid-cols-2 2xl:grid-cols-5 gap-y-2.5 gap-x-5 cursor-pointer">
    <div v-for="(item,index) in personalizedNewSong" :key="index"
         class="hover-bg-view transition-all flex items-center" @click="play(item.id)">
      <img :src="item.picUrl" alt="" class="w-12 h-12 object-cover rounded flex-shrink-0" v-lazy="item.picUrl"/>
      <div class="px-2 text-xs flex-auto flex flex-col w-1/3">
        <div class="text-xs flex-1 truncate ">
          {{ item.name }}
        </div>
        <div class="mt-1.5 text-dc">
          {{ item.song.artists[0].name }}
        </div>
      </div>
    </div>
  </div>
    </template>
  </el-skeleton>


 
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, toRefs} from "vue";
import Title from "@/components/common/Title.vue";
import {usePlayerStore} from "@/stores/player";
import {useMusicStore} from "@/stores/music";


const {play} = usePlayerStore()
const router = useRouter();
const {personalizedNewSong} = toRefs(useMusicStore())
const {getPersonalizedNewSong} = useMusicStore()

onMounted(async () => {
  await getPersonalizedNewSong()
})
</script>

<style lang="scss">

</style>
