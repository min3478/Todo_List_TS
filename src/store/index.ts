import Vuex from 'vuex'

interface Todo {
	// Todo ID
	todoId: number,
	title: string,
	completed: boolean,
}

interface State {
	todo_list: Array<Todo>,
	type: string,
	id: number,
}

// localStorage 데이터
const local: Array<Todo> = JSON.parse(localStorage.getItem('todo_list') as string);

const store = new Vuex.Store<State>({
	state: {
		todo_list: local ? local : [],
		type: 'All',
		id: local && String(local) !== '' ? Math.max.apply(null, local.map(ele => ele.todoId)) + 1 : 1,
	},

	getters: {
		// Todo List 반환
		getList(state): Array<Todo> {
			if (state.type === 'Active') {
				return state.todo_list.filter(todo_list => todo_list.completed === false);
			} else if (state.type === 'Completed') {
				return state.todo_list.filter(todo_list => todo_list.completed === true);
			} else {
				return state.todo_list;
			}
		},

		// 모든 Todo List 반환
		getListAll(state): Array<Todo> {
			return state.todo_list;
		},

		// 남은 todo_list의 수 반환
		getLeftItem(state): number {
			return state.todo_list.filter(todo_list => todo_list.completed === false).length;
		},

		// todo_list ID 반환
		getTodoId(state): number {
			return state.id;
		},

		// Todo List 종류 반환
		getType(state): string {
			return state.type;
		},

		// todoId 중복 체크
		isDuplicate(state): boolean{
			const set = new Set(
				state.todo_list.map((ele) => ele.todoId)
			);
			if (Array.from(set).length === state.todo_list.length) {
				return true;
			}

			return false;
		}
	},

	mutations: {
		// todo_list 추가
		ADD_TODO_LIST(state, payload: Todo) {
			state.id++;
			state.todo_list.push(payload);
			localStorage.setItem('todo_list', JSON.stringify(state.todo_list));
		},

		// localStorage 최신화
		UPDATE_TODO_LIST(state) {
			localStorage.setItem('todo_list', JSON.stringify(state.todo_list));
		},

		// todo_list 삭제
		DELETE_TODO_LIST(state, index: number) {
			state.todo_list.splice(index, 1);
			localStorage.setItem('todo_list', JSON.stringify(state.todo_list));
		},

		// todo_list 초기화
		RESET_TODO_LIST(state) {
			localStorage.removeItem('todo_list');
			state.todo_list = [];
			state.id = 1;
		},

		// 모든 todo_list를 일괄 예정, 완료 처리 후 localStorage에 반영
		REVERSE_TODO_LIST(state, checking: boolean) {
			for (let i = 0; i < state.todo_list.length; i++) {
				state.todo_list[i].completed = checking;
			}
			localStorage.setItem('todo_list', JSON.stringify(state.todo_list));
		},

		// 타입 세팅
		SET_TYPE(state, payload): string {
			return state.type = payload;
		},

		// todoId 중복 시 todoId의 max값 + 1
		SET_MAX_TODO_ID(state): number {
			return state.id = Math.max.apply(null, state.todo_list.map(ele => ele.todoId)) + 1;
		},
	},

	actions: {
		// Todo List 추가
		addData(context, title: string): void {
			context.commit('ADD_TODO_LIST', { 'todoId': this.state.id, 'title': title, 'completed': false });
		},

		// Todo List 삭제
		deleteData(context, index?: number): void {
			// indext 미존재 시 Todo List 목록 초기화, 존재 시 해당 Todo List 삭제
			if (index === undefined) {
				context.commit('RESET_TODO_LIST');
			} else {
				context.commit('DELETE_TODO_LIST', index);
			}
		},

		// Todo List 완료 미완료 최신화
		reverseData(context, checking?: boolean): void {
			// checking 존재 시 체크박스 전체 체크 및 해제, 미존재 시 completed 최신화
			if (checking !== undefined) {
				context.commit('REVERSE_TODO_LIST', checking);
			} else {
				context.commit('UPDATE_TODO_LIST');
			}
		},

		// 타입 세팅
		setType(context, type): void {
			context.commit('SET_TYPE', type);
		},

		// todoId 중복시 todoId의 max값 + 1
		setMaxTodoId(context): void {
			context.commit('SET_MAX_TODO_ID')
		}
	}
})

export default store