<template>
  <button
    class="secondary"
    @click="emits('setSort', sort)"
    :class="{
      contrast: currentSort === sort,
    }"
  >
    {{ sort }}
  </button>
</template>

<script setup lang="ts">
import type { Sort } from '@/types'

const props = defineProps<{
  sort: Sort
  currentSort: Sort
}>()

const emits = defineEmits<{
  setSort: [sort: Sort]
}>()
</script>

<style scoped>
button {
  text-transform: capitalize;
}
</style>
