import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import type { Post } from '../types'; 

const PostViewer = () => {
  const [postId, setPostId] = useState(1); // Estado para el ID
  const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

  // La dependencia [url] en useFetch hará que se ejecute una nueva petición
  const { data: post, loading, error } = useFetch<Post>(url);

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newId = parseInt(e.target.value);
    if (newId >= 1 && newId <= 100) { // La API solo tiene 100 posts
      setPostId(newId);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Visor Asíncrono de Posts</h1>
      <label>
        ID del Post (1-100):
        <input 
          type="number" 
          min="1" 
          max="100" 
          value={postId} 
          onChange={handleIdChange}
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </label>
      <hr/>

      {loading && <p style={{ color: 'blue' }}>Cargando Post #{postId}...</p>}
      {error && <p style={{ color: 'red' }}>🚨 Error al cargar el post: {error}</p>}

      {post && !loading && (
        <div style={{ border: '1px solid #ccc', padding: '15px' }}>
          <h2>Post #{post.id}: {post.title}</h2>
          <p>{post.body}</p>
          <small>User: {post.userId}</small>
        </div>
      )}
    </div>
  );
};

export default PostViewer;
