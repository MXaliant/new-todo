<template>
  <RouterView :groups="groups" @update-todos="updateTodos" @update-groups="updateGroups" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterView } from 'vue-router'
import type { Group, Task } from './types'
import { firebaseGetGroups, firebaseObserveGroups, firebaseUpdateTodos } from './assets/repository'

const GROUPS_KEY = 'my-groups'

const groups = ref<Group[]>([])

let unsubGroups: () => void

onMounted(() => {
  // const saved = localStorage.getItem(GROUPS_KEY)
  // if (saved) {
  //   groups.value = JSON.parse(saved)
  // }
  // groups.value = await firebaseGetGroups()
  unsubGroups = firebaseObserveGroups((liveGroups) => {
    groups.value = liveGroups
  })
})

onUnmounted(() => {
  if (unsubGroups) {
    unsubGroups()
  }
})

watch(groups, (newGroups) => {
  localStorage.setItem(GROUPS_KEY, JSON.stringify(newGroups))
})

function updateTodos(newList: Task[], groupId: string) {
  firebaseUpdateTodos(newList, groupId)
  // groups.value = groups.value.map((g) => (g.id === groupId ? { ...g, tasks: newList } : g))
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
