<template>
  <main>
    <div class="button-container">
      <button @click="$router.back()">Back</button>
    </div>
    <label>
      Edit Task
      <input
        v-model="title"
        name="newTask"
        :aria-invalid="!!error || undefined"
        @input="error = ''"
        placeholder="Title"
      />
      <input
        v-model="taskDesc"
        name="taskDesc"
        :aria-invalid="!!error || undefined"
        @input="error = ''"
        placeholder="Description"
      />
      <small v-if="error" id="invalid-helper">{{ error }}</small>
    </label>
    <div class="button-container">
      <button @click="formSubmitted">Save</button>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { Group, Task } from '@/types'
import { ref } from 'vue'

const props = defineProps<{
  id: string
  groups: Group[]
  groupId: string
}>()

const emits = defineEmits<{
  updateTodos: [newList: Task[], groupId: string]
}>()

const group = props.groups.find((g) => (g.id = props.groupId))
const tasks = group ? group.tasks : []
const task = tasks.find((task) => task.id === props.id)

const title = ref('')
const taskDesc = ref('')

if (task !== undefined) {
  title.value = task.title
  taskDesc.value = task.description
}

const error = ref('')

function formSubmitted() {
  if (task === undefined) return

  if (title.value.trim() && taskDesc.value.trim()) {
    const editedTask = { ...task, title: title.value, description: taskDesc.value }
    const editedTasks = tasks.map((t) => (t.id === editedTask.id ? { ...editedTask } : { ...t }))
    emits('updateTodos', editedTasks, props.groupId)
    alert('Task updated successfully!')
  } else {
    error.value = 'task can not be empty'
  }
}
</script>

<style scoped>
label {
  margin-top: 1rem;
}

.button-container {
  display: flex;
  justify-content: end;
}
</style>
