<template>
  <label>
    New Group
    <input
      v-model="groupName"
      name="newGroup"
      :aria-invalid="!!error || undefined"
      @input="error = ''"
      placeholder="Title"
    />
    <small v-if="error" id="invalid-helper">{{ error }}</small>
  </label>
  <div class="button-container">
    <button @click="addGroup">Add Group</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  addGroup: [name: string]
}>()

const groupName = ref('')
const error = ref('')

function addGroup() {
  if (groupName.value.trim()) {
    emit('addGroup', groupName.value)
    groupName.value = ''
  } else {
    error.value = 'Group name can not be empty'
  }
}
</script>

<style scoped>
.button-container {
  justify-content: end;
}
</style>
