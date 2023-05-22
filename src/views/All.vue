<template>
  <ul class="Todo-List">
    <li v-for="(item, index) in $store.state.Todo_List" :key="index" 
      :class="{ completed: item.completed === true, active: item.completed === false }">
      <div>
        <input type="checkbox" class="check-box" v-model="item.completed" @change="ChangeData">
        <label>{{ item.title }}</label>
        &nbsp;&nbsp;&nbsp;<button class="del-todo" @click="DelData(index)">X</button>
      </div>
    </li>
  </ul>
  <span>{{ $store.state.Todo_List.length }} itmes left</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import store from '../store'

export default defineComponent({
  name: 'AllList',
  data: function () {
    // const todo_cnt: number = 1;
    const type: String = 'All';

    return {
      // todo_cnt,
      type,
    }
  },
  methods: {
    ChangeData: function (): void {
      localStorage.setItem('Todo_List', JSON.stringify(store.state.Todo_List));
    },

    DelData: function (index: number): void {
      // 해당 Todo 삭제
      store.commit('Delete_Data', index)
    },
  },
});
</script>

<style>
ul {
  list-style: none;
  padding-left: 0px;
  align-items: left;
}

.check-box {
  width: 20px;
  height: 20px;
}

ul li {
  height: 35px;
  font-size: 25px;
}
</style>