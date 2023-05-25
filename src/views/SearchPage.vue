<template>
  <div class="todo">
    <h1>{{ props.todo }}</h1>
    <input
      type="checkbox"
      class="allCheck"
      v-model="allCheck"
      @change="revData"
    />
    <input
      class="newTodo"
      :placeholder="props.placeholder"
      ref="cursor"
      v-model="title"
      @keyup.enter="addData(title)"
    />
    <TodoList />
    <MenuList />
  </div>
</template>

<script setup lang='ts'>
  import { Ref, onMounted, ref } from 'vue';
  import TodoList from '../components/TodoList.vue';
  import MenuList from '../components/MenuList.vue';
  import store from '@/store';

  const cursor: Ref = ref();
  // 추가할 Todo_List 제목
  let title: Ref<string> = ref('');
  // 체크박스 전체 체크 및 해제
  let allCheck: boolean = false;

  const props = defineProps({
    // 입력창 상단 Text
    todo: {
      type: String,
      required: false,
    },

    // Input 박스가 입력되지 않았을 경우 들어갈 Text
    placeholder: {
      type: String,
      required: false,
    },
  });

  onMounted(() => {
    // input-box 포커스
    cursor.value.focus();
  });

  // // Todo_List 추가
  function addData(todo_title: string) {
    if (todo_title.trim().length > 0) {
      if (store.getters.isDuplicate) {
        store.dispatch('addData', todo_title);
        title.value = '';
      } else {
        store.dispatch('setMaxTodoId');
      }
    }
  }

  // Todo_List 전체 체크 및 해제
  function revData() {
    !allCheck;
    store.dispatch('reverseData', allCheck);
  }

  // // 중복 체크
  // function isDuplicate(): boolean {
  //   const set: Set<boolean> = new Set(
  //     (store.getters.getListAll as Array<Todo>).map((ele) => ele.completed)
  //   );
  //   if (Array.from(set).length === store.getters.getListAll.lenth) {
  //     return false;
  //   }
  //   return true;
  // }
</script>

<style scoped>
  .todo h1 {
    font-size: 60px;
    color: rgba(175, 47, 47, 0.15);
  }

  .allCheck {
    width: 30px;
    height: 30px;
  }

  .newTodo {
    width: 500px;
    height: 50px;
    font-size: 25px;
  }

  .newTodo ::placeholder {
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
