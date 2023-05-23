<template>
  <div class="filters">
    <router-link :to="'/' + kind.path" v-for="kind in filters" :key="kind.name" :class="kind.name">{{ kind.name
    }}</router-link>
  </div>
</template>

<script setup lang="ts">
interface Todo {
  path: string,
  name: string,
}

const filters: Array<Todo> = [
  { 'path': '', 'name': 'All' },
  { 'path': 'Active', 'name': 'Active' },
  { 'path': 'Completed', 'name': 'Completed' }
];
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