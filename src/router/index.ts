import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import StudentList from "../views/StudentList.vue";
import StudentForm from "../views/StudentForm.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: StudentList },
  { path: "/cadastro", component: StudentForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
