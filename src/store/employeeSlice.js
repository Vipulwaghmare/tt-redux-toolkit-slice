import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getEmployees = createAsyncThunk("employee/getEmployees", () => {
  const response = axios.post("http://localhost:4000/employee", {
    query: "{\n\temployees{\n    name,\n    gender,\n    id\n  }\n}",
    variables: null,
  });
  return response;
});

export const getEmployee = createAsyncThunk("employee/getEmployee", (id) => {
  const response = axios.post("http://localhost:4000/employee", {
    query: `{\n\temployee(id: ${id}){\n    name,\n    gender,\n    id\n  }\n}`,
    variables: null,
  });
  return response;
});

const initialState = {
  employees: [],
  employee: null,
  loading: false,
  error: false,
  errorDetails: null,
};

const employeeSlice = createSlice({
  initialState,
  name: "employee",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployees.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getEmployees.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.employees = payload.data.data.employees;
      })
      .addCase(getEmployees.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.errorDetails = payload;
      })
      .addCase(getEmployee.fulfilled, (state, { payload }) => {
        state.employee = payload.data.data.employee;
      })
      .addCase(getEmployee.rejected, (state, { payload }) => {
        state.errorDetails = payload;
        state.error = true;
      });
  },
});

// export const {} = employeeSlice.actions;
export default employeeSlice.reducer;
