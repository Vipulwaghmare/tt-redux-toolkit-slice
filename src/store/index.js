import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import employeeSlice from "./employeeSlice";
import todoSlice from "./todoSlice";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    counter: counterSlice,
    todos: todoSlice,
    employee: employeeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});
export default store;
