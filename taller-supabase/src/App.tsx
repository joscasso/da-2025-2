// src/App.tsx
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import type { Post } from './types' 

// 🛑 ¡IMPORTANTE! REEMPLAZA ESTE UUID POR EL QUE OBTUVISTE EN EL PASO 3 NUMERAL 4.
const TEST_USER_ID = "352f4e32-af0f-451f-b93c-31edf3174b70"; 

// Función para formatear la fecha (opcional)
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', { 
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
  });
}

function App() {
  const [posts, setPosts] = useState<Post[] | null>(null)
  const [loading, setLoading] = useState(true)
  // Nuevo estado para el contenido del nuevo post
  const [newPostContent, setNewPostContent] = useState<string>('') 
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 1. OBTENER POSTS (Lógica anterior, sin cambios)
  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    // ... lógica de fetchPosts anterior ...
    setLoading(true)
    const { data, error } = await supabase
      .from('posts')
      .select(`
        id, content, created_at, user_id, 
        profiles ( username ) 
      `)
      .order('created_at', { ascending: false }) 
    
    if (error) {
      console.error('Error fetching posts:', error);
      alert('Error al cargar publicaciones: ' + error.message);
    } else {
      setPosts(data as unknown as Post[]); 
    }
    setLoading(false)
  }

  // 2. FUNCIÓN PARA CREAR EL POST 🚀
   const handleCreatePost = async () => {
    if (!newPostContent.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const { data, error } = await supabase
      .from('posts')
      .insert([
        { 
          content: newPostContent, 
          user_id: TEST_USER_ID // Usamos el ID de prueba 
        }
      ])
      .select(`
        id, content, created_at, user_id, 
        profiles ( username ) 
      `);

    if (error) {
      console.error('Error creating post:', error);
      alert('Error al crear la publicación: ' + error.message);
    } else {
      // Éxito: Limpiar el formulario y recargar la lista de posts
      setNewPostContent(''); 

      //await fetchPosts();
      if (posts) {
        posts.push(data[0])
      }
    }
    setIsSubmitting(false);
  }

  // 3. FUNCIÓN PARA ACTUALIZAR EL POST 🚀
  const handleUpdatePost = async (id: string, newContent: string|null) => {
    if (!newContent || isSubmitting) return;

    setIsSubmitting(true);

    const { error } = await supabase
      .from('posts')
       .update({ content: newContent.trim() })
      .eq('id', id).select(); // Condición de filtrado por ID

    if (error) {
      console.error('Error updating post:', error);
      alert('Error al actualizar la publicación: ' + error.message);
    } else {
      
      //await fetchPosts();
      if (posts) {
        setPosts(posts.map((post) => {return post.id != id ? post : {...post, content: newContent}}))
      }
    }
    setIsSubmitting(false);
  }

  // 4. FUNCIÓN PARA BORRAR EL POST 🚀
  const handleDeletePost = async (id: string) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id); // Condición de filtrado por ID

    if (error) {
      console.error('Error deleting post:', error);
      alert('Error al borrar la publicación: ' + error.message);
    } else {
      
      //await fetchPosts();
      if (posts) {
        setPosts(posts.filter((post) => {return post.id != id}))
      }
    }
    setIsSubmitting(false);
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1>Feed de la Red Social 🚀</h1>
      
      {/* Nuevo Componente de Formulario de Creación */}
      <div style={formContainerStyle}>
        <h3>Crear nueva publicación</h3>
        <textarea
          style={textareaStyle}
          placeholder="¿Qué quieres compartir?"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          rows={4}
          disabled={isSubmitting}
        />
        <div className="mb-4">
             <label className="block text-gray-700 font-semibold mb-2">Archivos:</label>
             <input type="file" id="multiArchivo" multiple className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100">
             </input>
             <p className="mt-2 text-xs text-gray-500">Puedes seleccionar más de uno (con la propiedad 'multiple').</p>
        </div>
        <button 
          onClick={handleCreatePost} 
          disabled={isSubmitting || !newPostContent.trim()}
          style={buttonStyle}
        >
          {isSubmitting ? 'Publicando...' : 'Publicar'}
        </button>
      </div>

      <button onClick={fetchPosts} disabled={loading || isSubmitting} style={buttonStyle}>
        {loading ? 'Cargando...' : 'Recargar Publicaciones'}
      </button>

      {loading && <p>Cargando datos...</p>}

      <div style={{ marginTop: '20px' }}>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} style={postCardStyle}>
              <p style={{ fontWeight: 'bold' }}>
                @{post.profiles.username}
              </p>
              <p>{post.content}</p>
              <span style={{ fontSize: '0.8em', color: '#cac7c7ff' }}>
                Publicado el {formatDate(post.created_at)}
              </span>
              <p><button 
                      onClick={() => { const newContent = window.prompt("Por favor, ingresa la nueva publicación:"); 
                                       handleUpdatePost(post.id, newContent)
                                     }
                              }
                      style={buttonStyle}>
                    Actualizar
                  </button>
                  <button 
                      onClick={() => { if (window.confirm(`¿Estás seguro de eliminar el post con ID: ${post.id}?`)) 
                                        {
                                          handleDeletePost(post.id) 
                                        }
                                      } 
                                    }
                      style={{...buttonStyle, backgroundColor: 'gray'}}>
                    Borrar
                  </button>
              </p>
            </div>
          ))
        ) : (
          !loading && <p>No hay publicaciones para mostrar.</p>
        )}
      </div>
    </div>
  )
}

// Estilos adicionales
const formContainerStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '20px',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  background: '#615d5dff'
}

const textareaStyle: React.CSSProperties = {
  width: '100%',
  marginBottom: '10px',
  padding: '10px',
  boxSizing: 'border-box',
  borderRadius: '4px',
  border: '1px solid #ccc',
  color: 'white'
}

const buttonStyle: React.CSSProperties = {
  padding: '10px 15px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  margin: '15px'
}

const postCardStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: '15px',
  borderRadius: '8px',
  marginBottom: '10px',
  backgroundColor: '#615d5dff'
}

export default App