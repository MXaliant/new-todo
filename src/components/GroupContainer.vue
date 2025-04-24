<template>
  <article class="group">
    <div class="horizontal-container">
      <div v-if="hasPrio" class="prio">{Prioritized}</div>
      <h6>{{ group.name }}</h6>
    </div>
    <div class="horizontal-container">
      <RouterLink :to="{ name: 'Group', params: { id: group.id } }">
        <button>Tasks</button>
      </RouterLink>
      <button @click="emits('removeGroup', group.id)" class="outline">Remove</button>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Group } from '@/types'

const props = defineProps<{
  group: Group
  hasPrio: boolean
}>()

const emits = defineEmits<{
  removeGroup: [id: string]
}>()
</script>

<style scoped>
.group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.horizontal-container {
  display: flex;
  height: fit-content;
  gap: 0.5rem;
}
</style>
