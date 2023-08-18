<template>
  <RouterView v-if="isInit"/>
  <Host v-else/>
</template>

<script setup lang="ts">
import 'element-plus/es/components/message/style/css'
import {userPlayerInit} from "@/stores/player";
import {toRefs} from "vue";
import {useHostStore} from "@/stores/host";
import Host from "@/Host.vue";
import {useDownload} from "@/stores/download"
userPlayerInit();
const {isInit} = toRefs(useHostStore());
const {setHost} = useHostStore();
import.meta.env.NODE_ENV==="development"?setHost("http://127.0.0.1:3000/"):setHost("http://114.132.199.130/");
(window as any).MusicApp&&useDownload().create();

</script>
<style lang="scss">

</style>
