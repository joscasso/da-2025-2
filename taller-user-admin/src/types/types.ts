// Dato de un usuario
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}


// Estado de la aplicación
export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}