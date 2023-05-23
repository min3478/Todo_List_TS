<template>
  <div class="todo">
    <h1>{{ props.Todo }}</h1>
    <input type="checkbox" class="all_check" v-model="All_Check" @change="RevData" />
    <input class="new-todo" :placeholder="props.placeholder" ref="cursor" v-model="title"
      @keyup.enter="SaveData($store.getters.get_TodoId, title)" />
    <TodoList />
    <MenuList/>
  </div>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue';
import TodoList from "../components/TodoList.vue"
import MenuList from "../components/MenuList.vue"
import store from '@/store';

const props = defineProps({
  Todo: {
    type: String,
    required: false
  },
  placeholder: {
    type: String,
    required: false
  },
});

const cursor: Ref = ref();
let title: Ref<string> = ref('');
let All_Check: boolean = false;

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