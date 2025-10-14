import { useState, useEffect } from 'react';

// Interfaz para la respuesta genérica del Hook
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Hook genérico (T) que acepta una URL
function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Función asíncrona para la petición
    const fetchData = async () => {
      setState(prev => ({ ...prev, loading: true, error: null })); // Iniciar carga

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const json: T = await response.json();
        
        // Promesa resuelta con éxito
        setState(prev => ({ ...prev, data: json, loading: false })); 
        
      } catch (err) {
        // Promesa rechazada (manejo de error)
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      }
    };

    fetchData();
  }, [url]); // **IMPORTANTE:** La dependencia [url] asegura que la petición se haga nuevamente si la URL cambia

  return state;
};

export default useFetch;
