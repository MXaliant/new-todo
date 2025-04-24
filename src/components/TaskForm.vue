<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  addTask: [newTask: string, taskDesc: string]
}>()

// type Coordinates = [number, number|null]

// const coor1: Coordinates = [100, null]
// const listOfCoordinates: Coordinates[] = []
// listOfCoordinates.push([1,2])

const newTask = ref('')
const taskDesc = ref('')
const error = ref('')

function formSubmitted() {
  if (newTask.value.trim() && taskDesc.value.trim()) {
    emit('addTask', newTask.value, taskDesc.value)
    newTask.value = ''
    taskDesc.value = ''
  } else {
    error.value = 'task can not be empty'
  }
}
</script>

<template>
  <form @submit.prevent="formSubmitted">
    <label>
      New Task
      <input
        v-model="newTask"
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
      <button>Add</button>
    </div>
  </form>
</template>

<style scoped>
.button-container {
  justify-content: end;
}
</style>
