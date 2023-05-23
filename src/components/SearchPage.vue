<template>
  <div class="todo">
    <h1>todos</h1>
    <!-- <h1>{{ props.Todo }}</h1> -->
    <input type="checkbox" class="all_check" v-model="All_Check" @change="RevData" />
    <input class="new-todo" placeholder="What needs to be done?" ref="cursor" v-model="title"
      @keyup.enter="SaveData($store.getters.get_TodoId, title)" />
    <router-view></router-view>
    <MenuList />
  </div>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue';
import MenuList from './MenuList.vue';
import store from '@/store';

let title: Ref<string> = ref('');
let All_Check: boolean = false;
const cursor: Ref = ref();

// const props = defineProps<{
//   Todo?: string,
//   placeholder?: string,
// }>()

const SaveData = (id: number, todo_title: string) => {
  if (todo_title.trim().length > 0) {
    store.commit('Update_Data', { 'todo_id': id, 'title': todo_title, 'completed': false });
    title.value = '';
  }
};
const RevData = () => {
  !All_Check;
  store.commit('Reverse_Data', All_Check);
}

onMounted(() => {
  cursor.value.focus();
});

</script>

<style scoped>
.todo h1 {
  font-size: 60px;
  color: rgba(175, 47, 47, 0.15);
}

.all_check {
  width: 30px;
  height: 30px;
}

.new-todo {
  width: 500px;
  height: 50px;
  font-size: 25px;
}

.new-todo ::placeholder {
  text-align: center;
}

.filters {
  padding: 15px;
  border-radius: 5px;
}

.filters a {
  padding: 10px;
}
</style>