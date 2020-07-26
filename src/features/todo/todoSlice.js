import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

export const fetchAll = createAsyncThunk(
  'todo/fetchAll',
  async (thunkAPI) => {
    const response = await axios.get("http://localhost:5000/task?return_attributes=true");
    var tasks = [];
    response.data.forEach(element => {
      var task = element.data;
      task["id"] = element.id;
      tasks.push(task);
    });
    return tasks;
  }
)

export const deleteItems = createAsyncThunk(
  "todo/deleteItems",
  async (items, thunkAPI) => {
    items.forEach(async item => {
      const response = await axios.delete("http://localhost:5000/task/" + item);
    });
    return items;
  }
)

export const createItem = createAsyncThunk(
  "todo/createItem",
  async (item, thunkAPI) => {
    const response = await axios.put("http://localhost:5000/task", {
      task: item.task,
      created: item.created,
      due: item.due,
      priority: item.priority
    });
    return {
      task: item.task,
      created: item.created,
      due: item.due,
      priority: item.priority,
      id: response.data.id
    }
  }
)

const todoSlice = createSlice({
  name: 'todo',
  initialState: { 
    tasks: [], 
    loading: 'idle', 
    error: '',
    order: 'asc',
    orderBy: 'task',
    selected: [],
    page: 0,
    rowsPerPage: 5,
    formOpen: false
  },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setOrderBy: (state, action) => {
      state.orderBy = action.payload
    },
    setSelected: (state, action) => {
      state.selected = action.payload
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    setRowsPerPage: (state, action) => {
      state.rowsPerPage = action.payload
    },
    setOpenForm: (state, action) => {
      state.formOpen = action.payload
    }
  },
  extraReducers: {
    [fetchAll.fulfilled]: (state, action) => {
      state.loading = 'idle';
      state.error = '';
      state.tasks = action.payload;
    },
    [fetchAll.pending]: state => {
      state.loading = "yes";
    },
    [fetchAll.rejected]: (state, action) => {
      state.loading = "idle";
      state.error = action.error.message;
    },
    [deleteItems.fulfilled]: (state, action) => {
      var tasks = [];
      state.tasks.forEach(task => {
        if(!action.payload.includes(task.id)) {
          tasks.push(task);
        }
      });
      state.tasks = tasks;
    },
    [createItem.fulfilled]: (state, action) => {
      state.tasks.push(action.payload);
    },
  }
})

export const { setOrder, setOrderBy, setSelected, setPage, setRowsPerPage, setOpenForm } = todoSlice.actions;

export const selectTasks = state => state.todo.tasks;
export const selectOrder = state => state.todo.order;
export const selectOrderBy = state => state.todo.orderBy;
export const selectSelected = state => state.todo.selected;
export const selectPage = state => state.todo.page;
export const selectRowsPerPage = state => state.todo.rowsPerPage;
export const selectOpenForm = state => state.todo.formOpen;

export default todoSlice.reducer;