<template>
  <div class="filters">
    <button v-for="(Menu) in filters" :key="Menu.type" @click="setType(Menu.type)">{{ Menu.type }}
    </button>
    <br><br>
    <button @click="ResetData">TodoList 초기화</button>
  </div>
</template>

<script setup lang="ts">
import store from '@/store';

const filters: Array<{type : string}> = [
  { 'type': 'All' },
  { 'type': 'Active' },
  { 'type': 'Completed' }
];

const setType = (type: string) => {
  store.dispatch('setType', type);
}

const ResetData = () => {
  store.dispatch('deleteData');
}
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