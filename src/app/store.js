import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from '../features/navigation/navigationSlice';
import todoReducer from '../features/todo/todoSlice';
import editReducer from '../features/todo/editSlice';

export default configureStore({
  reducer: {
    navigation: navigationReducer,
    todo: todoReducer,
    edit: editReducer
  },
});
