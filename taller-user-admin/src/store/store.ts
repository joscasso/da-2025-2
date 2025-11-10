import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

// Tipos para usar en la aplicación
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


