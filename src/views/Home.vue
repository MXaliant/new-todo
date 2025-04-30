<script setup lang="ts">
import { firebaseDeleteGroup, firebaseUpsertGroup } from '@/assets/repository'
import type { Group, Task, Sort, GroupUpsertForm } from '../types'
import GroupContainer from '@/components/GroupContainer.vue'
import GroupForm from '@/components/GroupForm.vue'

const props = defineProps<{
  groups: Group[]
}>()

const emits = defineEmits<{
  updateTodos: [list: Task[]]
  updateGroups: [newGroups: Group[]]
}>()

function addGroup(newGroup: string) {
  const newId = crypto.randomUUID()
  const newVal: Group = {
    id: newId,
    name: newGroup,
    tasks: [],
  }
  const newGroups = props.groups.concat(newVal)

  firebaseUpsertGroup(newVal)
  // emits('updateGroups', newGroups)
}

function removeGroup(id: string) {
  const r = confirm(
    'Are you sure you want to delete group? This action will remove all tasks within the group.',
  )
  switch (r) {
    case true: {
      firebaseDeleteGroup(id)
      // const groupsRes = props.groups.filter((g) => g.id !== id)
      // emits('updateGroups', groupsRes)
    }
    case false:
      return
  }
}
</script>

<template>
  <main>
    <h1>Tasks App</h1>
    <GroupForm @add-group="addGroup" />
    <h5 v-if="!groups.length">Add a task group to get started.</h5>
    <TransitionGroup name="group-list" tag="ul" class="list">
      <GroupContainer
        v-for="group in groups"
        :group="group"
        @remove-group="removeGroup"
        :key="group.id"
      />
    </TransitionGroup>
  </main>
</template>

<style>
.button-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.list {
  margin-top: 1rem;
}

.completed {
  display: flex;
  justify-content: end;
  align-items: center;
}

.group-list-enter-active,
.group-list-leave-active {
  transition: all 0.5s ease;
}

.group-list-enter-from,
.group-list-leave-to {
  opacity: 0;
  transform: scaleY(0.2) translateX(300px);
}

.group-list-move {
  transition: transform 0.5s ease;
}

.group-list-leave-active {
  position: absolute;
}
</style>
