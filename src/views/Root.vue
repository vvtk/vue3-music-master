<!-- APP界面 -->
<template>
  <div class="w-screen h-screen flex items-stretch overflow-hidden">
    <div class="w-56 h-screen flex-shrink-0">
      <!-- 菜单 -->
      <Menu />
    </div>
    <div class="flex-1 flex flex-col ">
      <div class="h-14">
        <!-- 头部内容 -->
        <Header />
      </div>
      <div class="flex-1 overflow-hidden">
        <!-- 可滚动容器 -->
        <ElScrollbar>
          <div class="container mx-auto">
            <!-- 展示窗口 -->
            <RouterView/>
          </div>
        </ElScrollbar>
      </div>
      <div class="h-20">
        <!-- 底部播放栏 -->
        <Footer/>
      </div>
    </div>

    <!-- 右侧播放列表 -->
    <PlayList/>
  </div>
</template>

<script setup lang="ts">
import Menu from "@/components/layout/menu/Menu.vue";
import Header from "@/components/layout/header/Header.vue";
import Footer from "@/components/layout/footer/Footer.vue";
import PlayList from "@/components/layout/playList/PlayList.vue";
</script>
<style lang="scss">
</style>
