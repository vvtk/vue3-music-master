<template>
  <div class="grid grid-flow-row grid-cols-8 2xl:grid-cols-12 gap-2.5">
    <div class="button-dc" @click="catClick('全部')">全部</div>
    <template v-if="!!tags">
      <div v-for="tag in tags" :key="tag.id" class="button-dc" @click="catClick(tag.name)">{{ tag.name }}</div>
    </template>

    <template v-else>
      <div v-for="tag in 34" :key="tag" class="button-dc" ></div>
    </template>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {usePlaylistHighqualityTags} from "@/utils/api";
import {useRouter} from "vue-router";
import type {PlaylistHighqualityTag} from "@/models/playlist";

const emit = defineEmits<{
  (e: 'catChange', cat: string): void,
}>()

const catClick = (cat: string) => {
  emit('catChange', cat)
}

const router = useRouter();
const tags = ref<PlaylistHighqualityTag[]>()

onMounted(async () => {
  tags.value = await usePlaylistHighqualityTags()
})
</script>

<style lang="scss">
.t {

}
</style>
