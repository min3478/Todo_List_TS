<template>
  <div class="todo">
    <h1>{{ Todo }}</h1>
    <input type="checkbox" class="all_check" v-model="All_Check" @change="RevData" />
    <input class="new-todo" :placeholder=placeholder ref="cursor" v-model="title"
      @keyup.enter="SaveData($store.state.Todo_List.length, title)" />
    <router-view></router-view>
    <MenuList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MenuList from './MenuList.vue';
import store from '@/store';

export default defineComponent({
  name: 'SearchPage',
  props: {
    Todo: String,
    placeholder: String,
  },
  // setup : function(){
  // const Todo_List = computed(()=> store.state.Todo_List);
  // const todo_id = computed(() => store.state.Todo_Id);
  // return {Todo_List, todo_id};
  // },
  data: function () {
    const title: string = '';
    const All_Check: boolean = false;
    return {
      title,
      All_Check,
    }
  },
  methods: {
    AutoFocus: function () {
      (this.$refs.cursor as HTMLInputElement).focus();
    },
    SaveData: function (id: number, title: string) {
      if (title.trim().length > 0) {
        store.commit('Update_Data', { 'todo_id': id, 'title': title, 'completed': false });
        this.title = ''
      }
    },
    RevData: function () {
      !this.All_Check;
      store.commit('Reverse_Data', this.All_Check);
    }
  },
  mounted: function () {
    this.AutoFocus();
  },
  components: {
    MenuList
  }
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