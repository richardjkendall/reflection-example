import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

export const editSlice = createSlice({
  name: 'edit',
  initialState: {
    selectedDate: moment(new Date()).utc().toISOString(),
    priority: "",
    task: "",
    taskError: "",
    priorityError: "",
    dateError: ""
  },
  reducers: {
    setDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setPriority: (state, action) => {
      state.priority = action.payload;
    },
    setTask: (state, action) => {
      state.task = action.payload;
    },
    setTaskError: (state, action) => {
      state.taskError = action.payload;
    },
    setPriorityError: (state, action) => {
      state.priorityError = action.payload;
    },
    setDateError: (state, action) => {
      state.dateError = action.payload;
    },
    clearAll: state => {
      state.selectedDate = moment(new Date()).utc().toISOString();
      state.task = "";
      state.priority = "";
      state.taskError = "";
      state.priorityError = "";
      state.dateError = "";
    }
  },
});

export const { setDate, setPriority, setTask, setTaskError, setPriorityError, setDateError, clearAll } = editSlice.actions;

export const selectDate = state => state.edit.selectedDate;
export const selectPriority = state => state.edit.priority;
export const selectTask = state => state.edit.task;
export const selectTaskError = state => state.edit.taskError;
export const selectPriorityError = state => state.edit.priorityError;
export const selectDateError = state => state.edit.dateError;

export default editSlice.reducer;