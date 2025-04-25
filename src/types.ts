type Task = {
  id: string
  title: string
  description: string
  groupId: string
  priority: boolean
  done: boolean
  createdAt: number
  completedAt?: number
}

type Sort = 'title' | 'createdAt' | 'priority'

type Group = {
  id: string
  name: string
  tasks: Task[]
}

export type { Task, Group, Sort }
