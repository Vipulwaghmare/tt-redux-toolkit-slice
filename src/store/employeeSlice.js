import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getEmployees = createAsyncThunk(
  "employee/getEmployees",
  async () => {
    const { data } = await axios.post("http://localhost:4000/employee", {
      query: "{\n\temployees{\n    name,\n    gender,\n    id\n  }\n}",
      variables: null,
    });
    return data;
  },
);

export const getEmployee = createAsyncThunk(
  "employee/getEmployee",
  async (id) => {
    const { data } = await axios.post("http://localhost:4000/employee", {
      query: `{\n\temployee(id: ${id}){\n    name,\n    gender,\n    id\n  }\n}`,
      variables: null,
    });
    return data;
  },
);

const initialState = {
  employees: [],
  employee: null,
  loading: false,
  error: false,
};

const employeeSlice = createSlice({
  initialState,
  name: "employee",
  extraReducers: (builder) => {
    builder
      .addCase(getEmployees.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getEmployees.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.employees = payload.data.employees;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getEmployee.fulfilled, (state, { payload }) => {
        state.employee = payload.data.employee;
      })
      .addCase(getEmployee.rejected, (state, { payload }) => {
        state.error = true;
      });
  },
  reducers: {},
});

// export const {} = employeeSlice.actions;
export default employeeSlice.reducer;
