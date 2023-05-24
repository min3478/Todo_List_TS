<template>
  <div class="todo">
    <h1>{{ props.Todo }}</h1>
    <input type="checkbox" class="all_check" v-model="All_Check" @change="RevData" />
    <input class="new-todo" :placeholder="props.placeholder" ref="cursor" v-model="title" @keyup.enter="AddData(title)" />
    <TodoList />
    <MenuList />
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
// 추가할 Todo_List 제목
let title: Ref<string> = ref('');
// 체크박스 전체 체크 및 해제
let All_Check: boolean = false;

// // Todo_List 추가
const AddData = (todo_title: string) => {
  if (todo_title.trim().length > 0) {
    store.dispatch('addData', todo_title);
    title.value = '';
  }
};

// Todo_List 전체 체크 및 해제
const RevData = () => {
  !All_Check;
  store.dispatch('reverseData', All_Check)
}

onMounted(() => {
  // input-box 포커스
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