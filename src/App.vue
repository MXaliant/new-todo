<template>
  <RouterView
    :todos="todos"
    :groups="groups"
    @update-global="updateGlobal"
    @update-task="updateSingle"
    @update-todos="updateTodos"
    @update-groups="updateGroups"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import type { Group, Task } from './types'

const todos = ref<Task[]>([])
const groups = ref<Group[]>([])

function updateGlobal(newTasks: Task[], newGroups: Group[]) {
  ;(todos.value = newTasks), (groups.value = newGroups)
}

function updateSingle(id: string, task: Task) {
  todos.value.map((t) => {
    if (t.id === id) return { ...t, ...task }
    else return { ...t }
  })
}

function updateTodos(newList: Task[]) {
  todos.value = newList
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
