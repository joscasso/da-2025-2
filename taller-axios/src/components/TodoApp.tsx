import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

const TodoApp: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');

    const fetchTodos = async () => {
        const res = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=5');
        setTodos(res.data);
    };

    const addTodo = async () => {
        const res = await axios.post<Todo>('https://jsonplaceholder.typicode.com/todos', {
            title: newTodo,
            completed: false,
        });
        setTodos([res.data, ...todos]);
        setNewTodo('');
    };

    const deleteTodo = async (id: number) => {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
        setTodos(todos.filter(t => t.id !== id));
    };

    const updTodo = async (id: number) => {
        await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`);
        setTodos(todos.map(t => t.id == id ? { ...t, title: newTodo} : t));
        setNewTodo('');
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div>
            <h2>Lista de Tareas</h2>
            <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
            <button onClick={addTodo}>Agregar</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.title}
                        <button onClick={() => deleteTodo(todo.id)}>Eliminar</button>
                        <button onClick={() => updTodo(todo.id)}>Actualizar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;