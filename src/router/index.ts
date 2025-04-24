import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/Home.vue')
const TodoPage = () => import('../views/Todo.page.vue')
const Group = () => import('../views/Group.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/todo/:id', component: TodoPage, name: 'TaskEdit', props: true },
  { path: '/group/:id', component: Group, name: 'Group', props: true },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
