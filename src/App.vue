<template>
  <SearchPage :Todo="Todo" :placeholder="placeholder" />
  <!-- <SearchPage/> -->
</template>

<script setup lang="ts">
import SearchPage from './views/SearchPage.vue'

const Todo: string = "todos";
const placeholder: string = "What needs to be done?"
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
