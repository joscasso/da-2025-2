import './App.css'
import TodoApp from './components/TodoApp'
import axios from 'axios';

function App() {

  async function fetchAllData(userId: number): Promise<void> {
      try {
          // 1. Crear las promesas de las solicitudes (no se ejecutan inmediatamente)
          const userPromise = axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
          const todosPromise = axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
          
          // 2. Esperar a que TODAS se resuelvan simultáneamente
          const [userResp, todosResp] = await Promise.all([userPromise, todosPromise]);
          
          console.log(`Usuario: ${userResp.data.name}`);
          console.log(`Tareas pendientes: ${todosResp.data.length}`);
      } catch (error) {
          console.error('Error en las peticiones paralelas:', error);
      }
  }
  
  fetchAllData(2);


  return (
    <>
    <TodoApp />
    </>
  )
}

export default App
