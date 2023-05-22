import { createWebHistory, createRouter } from "vue-router";
import AllList from "@/views/All.vue";
import ActiveList from "@/views/Active.vue";
import CompletedList from "@/views/Completed.vue";


const routes = [
  {
    path: "/",
    name: "Main",
    component: AllList,
  },
  {
    path: "/Active",
    name: "Active",
    component: ActiveList,
  },
  {
    path: "/Completed",
    name: "Completed",
    component: CompletedList,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;