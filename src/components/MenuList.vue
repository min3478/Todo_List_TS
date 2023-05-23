<template>
  <div class="filters">
    <router-link :to="'/' + kind.path" v-for="kind in filters" :key="kind.name" :class="kind.name">{{ kind.name
    }}</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchPage',
  data: function () {
    const filters : Array<{path : string, name : string}>= [
      { 'path': '', 'name': 'All' },
      { 'path': 'Active', 'name': 'Active' },
      { 'path': 'Completed', 'name': 'Completed' },
    ]
    return {
      filters
    }
  },
});
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
