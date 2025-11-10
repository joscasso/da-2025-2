// Dato de un producto
export interface Product {
  id: string;
  created_at: Date;
  name: string;
  description: string;
  stock: number;
  price: number;
}


// Estado de la aplicación
export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}
