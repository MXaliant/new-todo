<template>
  <article class="group">
    <div class="horizontal-container">
      <div v-if="hasPrio" class="prio">{Prioritized}</div>
      <h6>{{ group.name }}</h6>
    </div>
    <div class="horizontal-container">
      <small class="task-amount">{{ completedAmount }} / {{ tasksAmount }} completed.</small>
      <RouterLink :to="{ name: 'Group', params: { id: group.id } }">
        <button>Tasks</button>
      </RouterLink>
      <button @click="emits('removeGroup', group.id)" class="outline">Remove</button>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Group } from '@/types'
import { computed } from 'vue'

const props = defineProps<{
  group: Group
}>()

const emits = defineEmits<{
  removeGroup: [id: string]
}>()

const hasPrio = computed(() => props.group.tasks.some((t) => t.priority))
const tasksAmount = computed(() => props.group.tasks.length)
const completedAmount = computed(() =>
  props.group.tasks.reduce((amount, t) => {
    if (t.done) return amount + 1
    return amount
  }, 0),
)
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

.task-amount {
  align-self: flex-end;
}
</style>
