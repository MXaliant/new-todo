<template>
  <label>
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
</template>

<script setup lang="ts">
import type { Task } from '@/types'
import { ref } from 'vue'

const props = defineProps<{
  id: string
  todos: Task[]
}>()

const emits = defineEmits<{
  updateTask: [id: string, task: Task]
}>()

const tasks = ref(props.todos)
const task = tasks.value.find((task) => task.id === props.id)

const title = ref('')
const taskDesc = ref('')

if (task !== undefined) {
  title.value = task.title
  taskDesc.value = task.description
}

const error = ref('')

function formSubmitted() {
  if (task === undefined) return
  const editedTask = { ...task, title: title.value, description: taskDesc.value }
  if (title.value.trim() && taskDesc.value.trim()) {
    emits('updateTask', props.id, editedTask)
    alert('Task updated successfully!')
  } else {
    error.value = 'task can not be empty'
  }
}
</script>

<style scoped></style>
