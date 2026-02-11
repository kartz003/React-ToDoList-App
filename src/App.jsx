import styles from './App.module.css';
import { useEffect, useState } from 'react';
import { ToDoForm } from './components/ToDoForm/ToDoForm';
import { ToDoList } from './components/ToDoList/ToDoList';
import { ToDoFilters } from './components/ToDoFilters/ToDoFilters';

function App() {
  const [todos, setToDos] = useState([]);
  const [filters, setFilters] = useState({});

  function fetchTodos() {
    const searchParams = new URLSearchParams(filters).toString();
    fetch(`${import.meta.env.VITE_MOCKAPI_BASE_URL}/todos?${searchParams}`, {
    method: 'GET',
    headers: {'content-type':'application/json'},
    })
      .then((response) => {
        if (response.ok) return response.json();
          if (response.status === 404) return [];
      })
      .then(setToDos).
      catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    fetchTodos();
  }, [filters])

  function handleCreate(newTodo) {
    fetch(`${import.meta.env.VITE_MOCKAPI_BASE_URL}/todos`, {
    method: 'POST',
    headers: {'content-type':'application/json'},
    body: JSON.stringify(newTodo)
    })
      .then((response) => !!response.ok && response.json())
      .then(fetchTodos).
      catch(error => {
        console.log(error);
      })
  }

  function handleUpdate(id, newTodo) {
    fetch(`${import.meta.env.VITE_MOCKAPI_BASE_URL}/todos/${id}`, {
    method: 'PUT',
    headers: {'content-type':'application/json'},
    body: JSON.stringify(newTodo)
    })
      .then((response) => !!response.ok && response.json())
      .then(fetchTodos).
      catch(error => {
        console.log(error);
      })
  }

  function handleDelete(id) {
    fetch(`${import.meta.env.VITE_MOCKAPI_BASE_URL}/todos/${id}`, {
    method: 'DELETE',
    })
      .then((response) => !!response.ok && response.json())
      .then(fetchTodos).
      catch(error => {
        console.log(error);
      })
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
