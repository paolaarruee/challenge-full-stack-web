import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router"
import StudentList from "../views/StudentList.vue"

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/students' },
  { path: '/students', component: StudentList },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router