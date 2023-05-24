<template>
  <ul class="Todo-List">
    <template v-for="(item, index) in $store.getters.getList" :key="item.todo_id">
      <li :class="{ completed: item.completed === true, active: item.completed === false }">
        <div>
          <input type="checkbox" class="check-box" v-model="item.completed" @change="ChangeData">
          <label>{{ item.title }}</label>
          &nbsp;&nbsp;&nbsp;<button class="del-todo" @click="DelData(index)">X</button>
        </div>
      </li>
    </template>
  </ul>
  <span>{{ $store.getters.getLeftItem }} itmes left</span>
</template>

<script setup lang="ts">
import store from '../store';

// 해당 Todo 상태 변경
const ChangeData = (): void => {
  store.dispatch('reverseData');
};

// 해당 Todo 삭제
const DelData = (index: number): void => {
  store.dispatch('deleteData', index);
};
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