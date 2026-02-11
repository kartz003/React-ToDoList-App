import styles from './App.module.css';
import { useEffect, useState } from 'react';
import { ToDoForm } from './components/ToDoForm/ToDoForm';
import { ToDoList } from './components/ToDoList/ToDoList';
import { ToDoFilters } from './components/ToDoFilters/ToDoFilters';
import { api } from './api';

function App() {
  const [todos, setToDos] = useState([]);
  const [filters, setFilters] = useState({});

  function fetchTodos() {
    api.todos.getAll(filters).then(setToDos);
  }

  useEffect(() => {
    fetchTodos();
  }, [filters])

  function handleCreate(newTodo) {
    api.todos.create(newTodo).then(fetchTodos);
  }

  function handleUpdate(id, newTodo) {
    api.todos.update(id, newTodo).then(fetchTodos);
  }

  function handleDelete(id) {
    api.todos.delete(id).then(fetchTodos);
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
