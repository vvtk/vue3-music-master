<template>
  <Title title="推荐电台" class="mt-5"/>
  <el-skeleton style="width: auto" :loading="djProgram.length == 0" animated>
    <!-- 骨架屏 -->
    <template #template>
       <div class="grid grid-flow-row grid-cols-2 lg:grid-cols-4 gap-5">
          <div  v-for="item in 6" :key="item">
            <el-skeleton-item class="banner-image"  style="height: 200px;width: 60%;" />
          <el-skeleton-item class="banner-image" style="width: 60%;"   />
          </div>
       </div>
    </template>
    <!-- 默认显示 -->
    <template #default>
      <div class="grid grid-flow-row grid-cols-3 lg:grid-cols-6 gap-5">
        <div v-for="item in djProgram" :key="item.id" @click="router.push({name:'video',query:{id:item.id}})">
          <CoverPlay :pic-url="item.picUrl" :name="item.name" :play-count="0"/>
          <div class="truncate text-xs mt-2">{{ item.name }}</div>
        </div>
      </div>
    </template>
  </el-skeleton>
 
</template>

<script setup lang="ts">
import {onMounted, toRefs} from "vue";
import {useVideoStore} from "@/stores/video";
import CoverPlay from "@/components/common/CoverPlay.vue";
import {useRouter} from "vue-router";
import {usePersonalizedStore} from "@/stores/personalized";

const {djProgram} = toRefs(usePersonalizedStore())
const {getDjProgram} = usePersonalizedStore()

const router = useRouter()

onMounted(async () => {
  await getDjProgram()
})
</script>
<style lang="scss">

</style>
