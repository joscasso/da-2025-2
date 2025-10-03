// Define la estructura de una reseña
export interface Review {
  usuario: string;
  texto: string;
  fecha: string;
}

// Define la estructura de un producto
export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  reseñas: Review[];
}
