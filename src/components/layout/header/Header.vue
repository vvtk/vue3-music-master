<template>
  <div class="flex items-center justify-between drag h-14 app-region">
    <div class="flex items-center pl-5">
      <IconPark :icon="Left" :size="iconSize" :stroke-width="2" class="icon-button" @click="router.back()" />
      <IconPark :icon="Right" :size="iconSize" :stroke-width="2" class="icon-button" />
      <div class="search no-drag ml-2">
        <SearchPop />
      </div>
    </div>
    <div class="flex items-center mr-5">
      <UserInfo />
      <IconPark :icon="Mail" :stroke-width="2" class="icon-button" />
      <IconPark :icon="Platte" :stroke-width="2" class="icon-button" @click="changeThemeMode" />
      <IconPark :icon="HamburgerButton" :stroke-width="2" class="icon-button" />
      <el-divider direction="vertical" />
      <IconPark :icon="Minus" @click.stop="minimize" :stroke-width="2" class="icon-button" />
      <IconPark :icon="FullScreen" @click.stop="maximize" :stroke-width="2" class="icon-button" />
      <IconPark :icon="Close" @click.stop="close"  :stroke-width="2" class="icon-button" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { HamburgerButton, Left, Mail, Platte, Right, Search, Close, Minus, FullScreen } from '@icon-park/vue-next'
import { useRouter } from "vue-router";
import IconPark from "@/components/common/IconPark.vue";
import UserInfo from "@/components/layout/header/UserInfo.vue";
import { useSearchStore } from "@/stores/search";
import { storeToRefs } from "pinia";
import SearchPop from "@/components/layout/header/SearchPop.vue";
import { ref } from "vue";

const iconSize = 22;

const router = useRouter();

const { showSearchView, searchKeyword } = storeToRefs(useSearchStore())

const mode = ref(false)

const changeThemeMode = () => {
  window.document.documentElement.setAttribute('data-theme', mode.value ? 'dark' : 'light')
  mode.value = !mode.value;
}
const close=()=>(window as any).MusicApp.colse()
const minimize=()=>(window as any).MusicApp.minimize()
const maximize=()=>(window as any).MusicApp.maximize()
</script>
<style lang="scss" scoped>
.search {
  @apply text-xs;
  :deep(.el-input__inner) {
    @apply rounded-full text-xs bg-slate-100 dark:bg-stone-900;
  }
}
.icon-button {
  @apply p-2 cursor-pointer;
  @apply hover:text-emerald-400 ;
}
</style>
