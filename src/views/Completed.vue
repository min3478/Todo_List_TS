<template>
  <ul class="Todo-List">
    <template v-for="(item, index) in $store.getters.getData_Completed" :key="item.todo_id">
      <li :class="{ completed: item.completed === true, active: item.completed === false }">
        <div>
          <input type="checkbox" class="check-box" v-model="item.completed" @change="ChangeData">
          <label>{{ item.title }}</label>
          &nbsp;&nbsp;&nbsp;<button class="del-todo" @click="DelData(index)">X</button>
        </div>
      </li>
    </template>
  </ul>
  <span>{{ $store.getters.get_LeftItem }} itmes left</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import store from '../store'

export default defineComponent({
  name: 'CompletedList',
  data: function () {
    return {
    }
  },
  methods: {
    ChangeData: function (): void {
      localStorage.setItem('Todo_List', JSON.stringify(store.getters.getData_All));
    },

    DelData: function (index: number): void {
      // 해당 Todo 삭제
      store.commit('Delete_Data', index)
    },
  }
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