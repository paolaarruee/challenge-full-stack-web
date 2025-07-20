import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import StudentList from "../views/StudentList.vue";
import StudentForm from "../views/StudentForm.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/students" },
  { path: "/students", component: StudentList },
  { path: "/cadastro-de-alunos", component: StudentForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
