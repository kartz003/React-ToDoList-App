import styles from './App.module.css';
import { useEffect, useState } from 'react';
import { ToDoForm } from './components/ToDoForm/ToDoForm';
import { ToDoList } from './components/ToDoList/ToDoList';
import { ToDoFilters } from './components/ToDoFilters/ToDoFilters';
import { api } from './api';

function App() {
  const [todos, setToDos] = useState([]);
  const [filters, setFilters] = useState({});

  async function fetchTodos() {
    try {
      const data = await api.todos.getAll(filters);
      setToDos(data);
    } catch(error) {
      console.log("Failed to get todo's. Please try again later.");
    }
  }

  useEffect(() => {
    fetchTodos();
  }, [filters])

  async function handleCreate(newTodo) {
    try {
      await api.todos.create(newTodo);
      await fetchTodos();
    } catch(error) {
      console.log("Failed to create todo. Please try again later.");
    }
  }

  async function handleUpdate(id, newTodo) {
    try {
      await api.todos.update(id, newTodo);
      await fetchTodos();
    } catch(error) {
      console.log("Failed to update todo. Please try again later.");
    }
  }

  async function handleDelete(id) {
    try {
      await api.todos.delete(id);
      await fetchTodos();
    } catch(error) {
      console.log("Failed to delete todo. Please try again later.");
    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src='./work-order.png' />
        <h2 className={styles.Title}> To-Do App </h2>
      </header>

      <div className={styles.AppContainer}>
        <ToDoForm onCreate={handleCreate} />
        <ToDoFilters onFilters={setFilters} />
        <ToDoList todos={todos} onUpdate={handleUpdate} onDelete={handleDelete}/>
      </div>
    </div>
  )
}

export default App
