<template>
  <TransitionGroup name="list" tag="ul" class="task-list">
    <article v-for="task in tasks" :key="task.id" class="task">
      <div class="task-container">
        <input
          v-if="!task.done"
          @input="emits('toggleDone', task.id)"
          :checked="task.done"
          type="checkbox"
        />
        <div class="task-info">
          <h6 :class="{ done: task.done }">{{ task.title }}</h6>
          <p>{{ task.description }}</p>
          <small>Created at: {{ dayjs(task.createdAt).format('D MMMM YYYY HH:MM') }}</small>
          <small v-if="task.done"
            >Completed at: {{ dayjs(task.completedAt).format('D MMMM YYYY HH:MM') }}</small
          >
        </div>
      </div>
      <div class="right-container">
        <RouterLink :to="{ name: 'TaskEdit', params: { id: task.id } }">
          <button>Edit</button>
        </RouterLink>
        <button @click="emits('removeTask', task.id)" class="outline">Remove</button>
        <input
          v-if="!task.done"
          @input="emits('setFavorite', task.id)"
          :checked="task.priority"
          type="checkbox"
        />
      </div>
    </article>
  </TransitionGroup>
</template>

<script setup lang="ts">
import type { Task } from '@/types'
import dayjs from 'dayjs'

const props = defineProps<{
  tasks: Task[]
}>()

const emits = defineEmits<{
  toggleDone: [id: string]
  removeTask: [id: string]
  setFavorite: [id: string]
}>()
</script>

<style scoped>
.task-list {
  margin-top: 1rem;
}

.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-container {
  display: flex;
  align-items: center;
}

.task-info {
  display: flex;
  flex-direction: column;
}

.done {
  text-decoration: line-through;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scaleY(0.2) translateX(300px);
}

.list-move {
  transition: transform 0.5s ease;
}

.list-leave-active {
  position: absolute;
}

p {
  font-size: 0.875rem;
}

small {
  font-size: 0.75rem;
}

.right-container {
  display: flex;
  height: 100%;
  gap: 0.5rem;
}
</style>
