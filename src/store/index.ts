import Vuex from 'vuex'

interface Todo {
    // Todo ID
    todo_id: number,
    title: string,
    completed: boolean,
}

interface State {
    Todo_List: Array<Todo>,
    Type: string,
    ID: number,
}

// localStorage 데이터
const local: Array<Todo> = JSON.parse(localStorage.getItem('Todo_List') as string);

const store = new Vuex.Store<State>({
    state: {
        Todo_List: local ? local : [],
        Type: 'All',
        ID: local && local.toString() !== '' ? Math.max.apply(null, local.map((ele) => ele.todo_id)) + 1 : 1,
    },

    getters: {
        // Todo List 종류 반환
        getType: function (state): string {
            return state.Type;
        },
        // Todo List 반환
        getList: function (state): Array<Todo> {
            if (state.Type === 'Active') {
                return state.Todo_List.filter(Todo_List => Todo_List.completed === false);
            }
            else if (state.Type === 'Completed') {
                return state.Todo_List.filter(Todo_List => Todo_List.completed === true);
            }
            else {
                return state.Todo_List;
            }
        },

        // 남은 Todo_List의 수 반환
        getLeftItem: function (state): number {
            return state.Todo_List.filter(Todo_List => Todo_List.completed === false).length;
        },

        // Todo_List ID 반환
        getTodoId: function (state): number {
            return state.ID;
        }
    },

    mutations: {
        // Todo_List 추가
        Add_Data: function (state, payload: Todo) {
            state.ID++;
            state.Todo_List.push(payload);
            localStorage.setItem('Todo_List', JSON.stringify(state.Todo_List));
        },
        // localStorage 최신화
        Update_Data: function (state) {
            localStorage.setItem('Todo_List', JSON.stringify(state.Todo_List));
        },
        // Todo_List 삭제
        Delete_Data: function (state, index: number) {
            state.Todo_List.splice(index, 1);
            localStorage.setItem('Todo_List', JSON.stringify(state.Todo_List));
        },
        // Todo_List 초기화
        Reset_Data: function (state) {
            localStorage.removeItem('Todo_List');
            state.Todo_List = [];
            state.ID = 1;
        },
        // 모든 Todo_List를 일괄 예정, 완료 처리 후 localStorage에 반영
        Reverse_Data: function (state, checking: boolean) {
            for (let i = 0; i < state.Todo_List.length; i++) {
                state.Todo_List[i].completed = checking;
            }
            localStorage.setItem('Todo_List', JSON.stringify(state.Todo_List));
        },
        // 타입 세팅
        setType: function (state, payload) {
            return state.Type = payload;
        },

    },

    actions: {
        // 타입 세팅
        setType: function (context, type): void {
            context.commit('setType', type);
        },
        // Todo List 추가
        addData: function (context, title: string): void {
            // ID 중복 체크
            if (!(this.state.Todo_List.map((ele) => ele.todo_id).includes(this.state.ID))) {
                context.commit('Add_Data', { 'todo_id': this.state.ID, 'title': title, 'completed': false });
            }
        },
        // Todo List 삭제
        deleteData: function (context, index?: number): void {
            // indext 미존재 시 Todo List 목록 초기화
            if (index === undefined) {
                context.commit('Reset_Data');
            }
            // index 존재 시 해당 index Todo List 삭제
            else {
                context.commit('Delete_Data', index);
            }
        },
        // Todo List 완료 미완료 최신화
        reverseData: function (context, checking?: boolean): void {
            // checking 존재 시 체크박스 전체 체크 및 해제
            if (checking !== undefined) {
                context.commit('Reverse_Data', checking);
            }
            // checking 미존재 시 completed 최신화
            else {
                context.commit('Update_Data');
            }
        }
    }
})

export default store