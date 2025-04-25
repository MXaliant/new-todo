<template>
  <RouterView :groups="groups" @update-todos="updateTodos" @update-groups="updateGroups" />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { RouterView } from 'vue-router'
import type { Group, Task } from './types'

const GROUPS_KEY = 'my-groups'

const groups = ref<Group[]>([])

onMounted(() => {
  const saved = localStorage.getItem(GROUPS_KEY)
  if (saved) {
    groups.value = JSON.parse(saved)
  }
})

watch(groups, (newGroups) => {
  localStorage.setItem(GROUPS_KEY, JSON.stringify(newGroups))
})

function updateTodos(newList: Task[], groupId: string) {
  groups.value = groups.value.map((g) => (g.id === groupId ? { ...g, tasks: newList } : g))
}

function updateGroups(newGroups: Group[]) {
  groups.value = newGroups
}
</script>

<style>
main {
  max-width: 800px;
  margin: 1rem auto;
}
</style>
