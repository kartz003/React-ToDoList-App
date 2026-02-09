import styles from './App.module.css';
import { useState } from 'react';
import { ToDoForm } from './components/ToDoForm/ToDoForm';
import { ToDoList } from './components/ToDoList/ToDoList';
import { ToDoFilters } from './components/ToDoFilters/ToDoFilters';

const TODOS_DEFAULT = [
  {
    id: "1",
    task: "Buy an Ice Cream",
    description: "The white one with chocolate",
    deadline: "2025-02-09",
    priority: "low",
    completed: false,
  },
  {
    id: "2",
    task: "Sell old MacBook Pro 2025",
    description: "Try to sell it on OLX",
    deadline: "2025-02-28",
    priority: "high",
    completed: false,
  },
  {
    id: "3",
    task: "Charge Powerbank",
    description: "For the next travelling",
    deadline: "2025-02-15",
    priority: "medium",
    completed: true,
  },
  {
    id: "4",
    task: "Test Todo onlye with a name",
    description: "",
    deadline: "",
    priority: "none",
    completed: false,
  },
];

function App() {
  const [todos, setToDos] = useState(TODOS_DEFAULT);
  const [filters, setFilters] = useState({});

  function handleCreate(newTodo) {
    setToDos((prevTodos) => [
      ...prevTodos,
      {id: `${prevTodos.length + 1}`, ...newTodo}
    ]);
  }

  function handleUpdate(id, newTodo) {
    setToDos((prevTodos) => prevTodos.map((todo) => todo.id === id ? newTodo : todo));
  }

  function handleDelete(id) {
    setToDos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function filterToDos(todo) {
    const {completed, priority} = filters;
    return (
      (completed === "" || todo.completed === completed) && (priority === "" || todo.priority === priority)
    )
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
        <ToDoList todos={todos.filter(filterToDos)} onUpdate={handleUpdate} onDelete={handleDelete}/>
      </div>
    </div>
  )
}

export default App
