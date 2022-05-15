import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import employeeSlice from "./employeeSlice";
import todoSlice from "./todoSlice";

const store = configureStore({
  reducer: {
    counter: counterSlice,
    todos: todoSlice,
    employee: employeeSlice,
  },
});
export default store;
