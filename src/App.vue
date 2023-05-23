<template>
  <SearchPage Todo="todos" placeholder="What needs to be done?" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchPage from './components/SearchPage.vue'

export default defineComponent({
  name: 'App',
  components: {
    SearchPage
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
