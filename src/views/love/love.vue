<template>
  <div class="playlist">
    <div class="p-5" v-if="songs">
      <Info :playlist="playlist" :play-all="() => playAll()" />
      <el-tabs class="mt-3" v-model="tab">
        <el-tab-pane lazy :label="`歌曲 ${songs?.length}`" name="tracks">
          <SongList :songs="songs" />
        </el-tab-pane>
        <el-tab-pane lazy label="评论" name="comments" />
      </el-tabs>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { uselikelist, useDetailList, useuserPlaylist } from "@/utils/api";
import Info from "@/views/love/info.vue";
import SongList from "@/views/playlist/SongList.vue";

import type { Song } from "@/models/song";
import { usePlayerStore } from "@/stores/player";
import { useUserStore } from "@/stores/user_code";
import { storeToRefs } from "pinia";
import type { userPlaylist } from "@/models/userPlaylist";
const tab = ref('tracks')
const route = useRoute();
const playlist = ref<undefined|userPlaylist>();
const songs = ref<Song[]>([]);
const {login_after}=useUserStore();
const { profile } = storeToRefs(useUserStore())
const { pushPlayList, play } = usePlayerStore()

const playAll = () => {
  pushPlayList(true, ...songs.value)
  play(songs.value.first().id)
}

const getData = () => {
  useuserPlaylist(profile?.value?.userId).then(res => {
    if (res.code==200) 
    playlist.value=res.playlist
    console.log(res);

    })
  uselikelist(profile?.value?.userId).then(res => {
    const ids = res.ids.join(',')
    useDetailList(ids).then(res => {
      songs.value = res
    })
  })
}
onMounted(()=>login_after(()=>{
  getData()
}))

</script>
  
<style lang="scss">
.playlist {
  .el-tabs__nav-wrap::after {
    height: 0;
  }

  .el-tabs__header {
    @apply m-0;
  }
}
</style>
  