import { createSlice } from "@reduxjs/toolkit";
import { giveMeId } from "utils/helpers";

const initialState = {
  todos: [],
  selected: null,
};

const todosSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    createToDo: (state, { payload }) => {
      state.todos.push({
        id: giveMeId(),
        title: payload,
        isComplete: false,
      });
    },
    selectTodo: (state, { payload }) => {
      state.selected = state.todos.find((todo) => todo.id === payload);
    },
    deleteTodo: (state, { payload }) => {
      state.todos = state.todos.filter((todo) => todo.id !== payload);
    },
    toggleTodo: (state, { payload }) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id !== payload) return todo;
        return {
          ...todo,
          isComplete: !todo.isComplete,
        };
      });
    },
    editTodo: (state, { payload }) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id !== payload.id) return todo;
        return {
          ...todo,
          title: payload.title,
        };
      });
    },
  },
});

export const { createToDo, selectTodo, deleteTodo, toggleTodo, editTodo } =
  todosSlice.actions;
export default todosSlice.reducer;
