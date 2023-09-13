<template>
  <RouterView v-if="isInit"/>
  <Host v-else/>
</template>

<script setup lang="ts">
import 'element-plus/es/components/message/style/css'
import {userPlayerInit} from "@/stores/player";
import {toRefs} from "vue";
import {useHostStore} from "@/stores/host";

// 就是路由不存在时，显示的组件
import Host from "@/Host.vue";
// 下载页面组件共享数据
import {useDownload} from "@/stores/download"
userPlayerInit();
const {isInit} = toRefs(useHostStore());
(window as any).MusicApp&&useDownload().create();

</script>
<style lang="scss">
 
</style>
