import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { User, UsersState } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

// *** 1. Operaciones Asíncronas (Thunks para CRUD) ***

// FETCH (Read All)
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get<User[]>(API_URL);
  return response.data;
});

// CREATE
export const createUser = createAsyncThunk('users/createUser', async (newUser: Omit<User, 'id'>) => {
    // Nota: jsonplaceholder simula la creación, devuelve el objeto + id (siempre 11)
    const response = await axios.post<User>(API_URL, newUser);
    return response.data; // Devuelve el nuevo usuario con ID
});

// DELETE
export const deleteUser = createAsyncThunk('users/deleteUser', async (userId: number) => {
    // jsonplaceholder simula la eliminación (siempre devuelve 200)
    await axios.delete(`${API_URL}/${userId}`);
    return userId;
});

// UPDATE
export const updateUser = createAsyncThunk('users/updateUser', async (user: User) => {
    // Nota: jsonplaceholder simula la actualización, devuelve el objeto actualizado
    const response = await axios.put<User>(`${API_URL}/${user.id}`, user);
    return response.data; // Devuelve el usuario actualizado
});


// *** 2. Definición del Slice y Reducers ***

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Reducers síncronos si fueran necesarios
  },
  extraReducers: (builder) => {
    builder
      // FETCH Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload; // Carga los usuarios
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar usuarios';
      })

      // DELETE User
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.users = state.users.filter(user => user.id !== action.payload); // Elimina de la lista
      })

      // CREATE User
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload); // Añade el nuevo usuario (simulado)
      })

      // UPDATE User
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload; // Reemplaza el usuario actualizado
        }
      });
  },
});

export default usersSlice.reducer;
