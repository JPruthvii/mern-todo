import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/todos')
      .then((response) => setTodos(response.data))
      .catch((error) => console.error('Error fetching todos:', error));
  }, []);

  const addTodo = async () => {
    try {
      const response = await axios.post('http://localhost:5000/todos', {
        text,
      });
      setTodos([...todos, response.data]);
      setText('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
  const markTodoCompleted = async (todoId) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/todos/${todoId}`,
        {
          completed: !todos.find((todo) => todo._id === todoId).completed,
        }
      );

      setTodos(
        todos.map((todo) => (todo._id === todoId ? response.data : todo))
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className='container'>
      <h1>Todo App</h1>
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => markTodoCompleted(todo._id)}
              className='toggle-btn'
            >
              Toggle Completed
            </button>
            <button onClick={() => deleteTodo(todo._id)} className='delete-btn'>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
