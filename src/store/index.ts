import Vuex from 'vuex'

interface Todo {
    todo_id: number,
    title: string,
    completed: boolean
}

interface State {
    Todo_List: Array<{
        todo_id: number,
        title: string,
        completed: boolean
    }>,
}

const local = JSON.parse(localStorage.getItem('Todo_List') as string);

const store = new Vuex.Store<State>({
    state: {
        Todo_List: local ? local : [],
    },
    getters: {
        getData_All: function (state) {
            return state.Todo_List;
        },
        getData_Active: function (state) {
            return state.Todo_List.filter(Todo_List => Todo_List.completed === false);
        },
        getData_Completed: function (state) {
            return state.Todo_List.filter(Todo_List => Todo_List.completed === true);
        },
    },
    mutations: {
        Update_Data: function (state, payload : Todo) {
            state.Todo_List.push(payload);
            localStorage.setItem('Todo_List', JSON.stringify(state.Todo_List));
        },
        Delete_Data: function (state, index : number) {
            state.Todo_List.splice(index, 1);
            localStorage.setItem('Todo_List', JSON.stringify(state.Todo_List));
        },
        Reverse_Data: function (state, checking: boolean) {
            if (checking === true) {
                for (let i = 0; i < state.Todo_List.length; i++) {
                    state.Todo_List[i].completed = true;
                }
            } else if(checking === false){
                for (let i = 0; i < state.Todo_List.length; i++) {
                    state.Todo_List[i].completed = false;
                }
            }
            localStorage.setItem('Todo_List', JSON.stringify(state.Todo_List));
        },
    },
    actions: {
    }
})

export default store