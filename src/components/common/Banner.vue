<template>
  <el-skeleton style="width: auto" :loading="banners.length == 0" animated>
    <!-- 骨架屏 -->
    <template #template>
      <Swiper slides-per-group-auto slides-per-view="auto" :navigation="true" :grab-cursor="true"  >
        <SwiperSlide v-for="item in 6" :key="item">
          <el-skeleton-item class="banner-image"  style="height: 200px;" />
        </SwiperSlide>
    </Swiper>
    </template>
    <!-- 默认显示 -->
    <template #default>
    <Swiper slides-per-group-auto slides-per-view="auto" :navigation="true" :grab-cursor="true" >
      <SwiperSlide v-for="item in banners" :key="item.bannerId">
        <img :src="item.pic" class="banner-image" @click="onClick(item)" v-lazy="item.pic" style="height: 200px;object-fit: fill;"  />
      </SwiperSlide>
    </Swiper>
    </template>
  </el-skeleton>
</template>
 
<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { onMounted, toRefs } from "vue";
import { usePlayerStore } from "@/stores/player";
import { useCommonStore } from "@/stores/common";
import type { Banner } from "@/models/banner";

const { banners } = toRefs(useCommonStore())
console.log(banners)
const { getBanners } = useCommonStore()

// 异步获取轮播数据
onMounted(async () => {
  await getBanners()
})

console.log(banners)

const { play } = usePlayerStore()

const onClick = (banner: Banner) => {
  if (banner.targetType === 1) {
    play(banner.targetId)
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  @apply -mx-2.5;
  .swiper-slide {
    @apply w-full lg:w-1/2 xl:w-1/3 2xl:w-1/4 px-2.5;
  }
}

.banner-image {
  @apply rounded-lg cursor-pointer transition-all object-cover;
  @apply hover:shadow hover:opacity-80;
}
</style>
