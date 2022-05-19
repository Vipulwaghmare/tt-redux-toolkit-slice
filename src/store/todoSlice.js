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
      state.selected =
        payload === null ? null : { ...state.todos[payload], index: payload };
    },
    deleteTodo: (state, { payload }) => {
      state.todos = state.todos.filter((todo) => todo.id !== payload);
    },
    toggleTodo: (state, { payload }) => {
      state.todos[payload]["isComplete"] = !state.todos[payload]["isComplete"];
    },
    editTodo: (state, { payload }) => {
      state.todos[payload.index]["title"] = payload.title;
    },
  },
});

export const { createToDo, selectTodo, deleteTodo, toggleTodo, editTodo } =
  todosSlice.actions;
export default todosSlice.reducer;
