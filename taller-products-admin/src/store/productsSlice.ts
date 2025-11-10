import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios, { type AxiosInstance } from 'axios';
import type { Product, ProductsState } from '../types';

// Configuración de Supabase (Clave real utilizada)
const SUPABASE_URL = 'https://qkclmecrwnaqmrplcroq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrY2xtZWNyd25hcW1ycGxjcm9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1OTQ1OTIsImV4cCI6MjA3NzE3MDU5Mn0.gaKXvANpaTD3PQpin2kJqn3g_itawi5N5XMtojXwkYM'; 

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`,
  headers: {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Prefer': 'return=representation',
  },
});

// *** 1. Operaciones Asíncronas (Thunks para CRUD) ***

// FETCH (Read All)
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axiosInstance.get<Product[]>('products?select=*&order=id.desc');
  return response.data;
});

// CREATE
export const createProduct = createAsyncThunk('products/createProduct', async (newProduct: Omit<Product, 'id' | 'created_at' >) => {
    const response = await axiosInstance.post<Product[]>('products', newProduct);
    return response.data[0]; // Devuelve el nuevo producto con ID
});

// DELETE
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId: string) => {
    // Eliminación del producto (siempre devuelve 200)
    await axiosInstance.delete(`products?id=eq.${productId}`);
    return productId;
});

// UPDATE
export const updateProduct = createAsyncThunk('products/updateProduct', async (product: Product) => {
    // Nota: Devuelve el objeto actualizado
    const response = await axiosInstance.put<Product[]>(`products?id=eq.${product.id}`, product);
    return response.data[0]; // Devuelve el producto actualizado
});


// *** 2. Definición del Slice y Reducers ***

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Reducers síncronos si fueran necesarios
  },
  extraReducers: (builder) => {
    builder
      // FETCH Users
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload; // Carga los productos
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar los productos';
      })

      // DELETE User
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.products = state.products.filter(product => product.id !== action.payload); // Elimina de la lista
      })

      // CREATE User
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload); // Añade el nuevo producto
      })

      // UPDATE User
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.products.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload; // Reemplaza el producto actualizado
        }
      });
  },
});

export default productsSlice.reducer;
