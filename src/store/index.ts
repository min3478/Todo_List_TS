import Vuex from 'vuex'

interface Todo {
    todo_id: number,
    title: string,
    completed: boolean,
}

interface State {
    Todo_List: Array<{
        todo_id: number,
        title: string,
        completed: boolean
    }>,
}

const local : Array<Todo> = JSON.parse(localStorage.getItem('Todo_List') as string);

const store = new Vuex.Store<State>({
    state: {
        Todo_List: local ? local : [],
    },

    getters: {
        // 모든 Todo_List 반환
        getData_All: function (state): Object {
            return state.Todo_List;
        },
        // 수행해야될 Todo_List 반환
        getData_Active: function (state): Object {
            return state.Todo_List.filter(Todo_List => Todo_List.completed === false);
        },
        // 수행된 Todo_List 반환
        getData_Completed: function (state): Object {
            return state.Todo_List.filter(Todo_List => Todo_List.completed === true);
        },
        // 수행해야 될 남은 Todo_List의 숫자 반환
        get_LeftItem: function (state): Number {
            return state.Todo_List.filter(Todo_List => Todo_List.completed === false).length
        },
        // Todo_List ID 반환
        get_TodoId: function (state): Number {
            return state.Todo_List.length
        }
    },

    mutations: {
        // 추가된 Todo_List를 localStorage에 반영
        Update_Data: function (state, payload: Todo) {
            state.Todo_List.push(payload);
            localStorage.setItem('Todo_List', JSON.stringify(state.Todo_List));
        },
        // 삭제된 Todo_List를 localStorage에 반영
        Delete_Data: function (state, index: number) {
            state.Todo_List.splice(index, 1);
            localStorage.setItem('Todo_List', JSON.stringify(state.Todo_List));
        },
        // 모든 Todo_List를 일괄 예정, 완료 처리 후 localStorage에 반영
        Reverse_Data: function (state, checking: boolean) {
            if (checking === true) {
                for (let i = 0; i < state.Todo_List.length; i++) {
                    state.Todo_List[i].completed = true;
                }
            } else if (checking === false) {
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