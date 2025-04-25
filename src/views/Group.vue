<template>
  <main>
    <div class="back-container">
      <button @click="$router.back()">Back</button>
    </div>
    <TaskForm @add-task="addTask" />
    <h5 v-if="!groupedTasks.length">Add a task to get started.</h5>
    <h5 v-else>{{ totalDone }} / {{ groupedTasks.length }} tasks completed</h5>
    <div v-if="groupedTasks.length" class="button-container">
      <SortButton :current-sort="sort" sort="createdAt" @set-sort="setSort" />
      <SortButton :current-sort="sort" sort="title" @set-sort="setSort" />
      <SortButton :current-sort="sort" sort="priority" @set-sort="setSort" />
    </div>

    <div v-if="groupedTasks.length" class="completed">
      <input
        @input="isShowCompleted = !isShowCompleted"
        :checked="isShowCompleted"
        type="checkbox"
      />
      <span>Show Completed</span>
    </div>

    <TaskList
      :tasks="filteredTasks"
      @toggle-done="toggleDone"
      @remove-task="removeTask"
      @set-favorite="setFavorite"
    />
  </main>
</template>

<script setup lang="ts">
import SortButton from '@/components/SortButton.vue'
import TaskForm from '@/components/TaskForm.vue'
import TaskList from '@/components/TaskList.vue'
import type { Group, Sort, Task } from '@/types'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'

const props = defineProps<{
  groups: Group[]
  id: string
}>()

const emits = defineEmits<{
  updateTodos: [newTasks: Task[], groupId: string]
}>()

const group = computed(() => props.groups.find((g) => (g.id = props.id)))
const groupedTasks = computed(() => {
  return group.value ? group.value.tasks : []
})
const sort = ref<Sort>('createdAt')
const isShowCompleted = ref(false)

const totalDone = computed(() =>
  groupedTasks.value.reduce((total, task) => {
    if (task.done) return total + 1
    return total
  }, 0),
)

const sortedTasks = computed(() => {
  switch (sort.value) {
    case 'priority':
      return [...groupedTasks.value].sort((a, b) =>
        a.priority === b.priority ? 0 : a.priority ? -1 : 1,
      )
    default:
      return [...groupedTasks.value].sort((a, b) => {
        return a[sort.value] > b[sort.value] ? 1 : -1
      })
  }
})

const filteredTasks = computed(() => {
  // switch (filter.value) {
  //   case 'all':
  //     return tasks.value
  //   case 'todo':
  //     return tasks.value.filter((task) => !task.done)
  //   case 'done':
  //     return tasks.value.filter((task) => task.done)
  //   default:
  //     return tasks.value
  // }
  switch (isShowCompleted.value) {
    case true:
      return sortedTasks.value
    case false:
      return sortedTasks.value.filter((task) => !task.done)
  }
})

function addTask(newTask: string, taskDesc: string) {
  const newVal = groupedTasks.value.concat({
    id: crypto.randomUUID(),
    title: newTask,
    description: taskDesc,
    groupId: props.id,
    priority: false,
    done: false,
    createdAt: dayjs().valueOf(),
  })

  emits('updateTodos', newVal, props.id)
}

function toggleDone(id: string) {
  const res = groupedTasks.value.map((t) =>
    t.id === id
      ? { ...t, done: !t.done, priority: false, completedAt: dayjs().valueOf() }
      : { ...t },
  )
  emits('updateTodos', res, props.id)
}

function removeTask(id: string) {
  const res = groupedTasks.value.filter((t) => t.id !== id)
  emits('updateTodos', res, props.id)
}

function setSort(value: Sort) {
  sort.value = value
}

function setFavorite(id: string) {
  const res = groupedTasks.value.map((t) =>
    t.id === id ? { ...t, priority: !t.priority } : { ...t },
  )
  emits('updateTodos', res, props.id)
}
</script>

<style>
.button-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.completed {
  display: flex;
  justify-content: end;
  align-items: center;
}

.back-container {
  display: flex;
  justify-content: end;
}
</style>
