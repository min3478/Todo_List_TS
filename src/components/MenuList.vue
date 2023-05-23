<template>
  <div class="filters">
    <!-- <router-link :to="'/' + kind.path" v-for="kind in filters" :key="kind.name" :class="kind.name">{{ kind.name
    }}</router-link> -->
    <button v-for="(Menu) in filters" :key="Menu.name" @click="setType(Menu.type)">{{ Menu.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
import store from '@/store';

interface Todo {
  name: string,
  type: string,
}

// defineProps({
//   'type': { type: String, required: true }
// });

const filters: Array<Todo> = [
  { 'name': 'All', 'type': '' },
  { 'name': 'Active', 'type': 'Active' },
  { 'name': 'Completed', 'type': 'Completed' }
];

const setType = (type : string) => {
  console.log(type)
  store.dispatch('Set_Type', type);}
// const getType = (type : string) : string => {
//   console.log(type)
//   return type;
// }
// const filters: Array<Todo> = [
//   { 'path': '', 'name': 'All' },
//   { 'path': 'Active', 'name': 'Active' },
//   { 'path': 'Completed', 'name': 'Completed' }
// ];
</script>
 
<style scoped>
.filters {
  padding: 15px;
  border-radius: 5px;
}

.filters a {
  padding: 10px;
}
</style>