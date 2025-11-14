// Tipo para la tabla 'profiles' (solo las columnas que vamos a usar)
export interface Profile {
  id: string;
  username: string;
}

// Tipo para la tabla 'posts' (incluye la relación anidada con Profile)
export interface Post {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  // Supabase devuelve el objeto de relación anidado
  profiles: Profile; 
}
