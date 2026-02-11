import styles from './App.module.css';
import { ToDoForm } from './components/ToDoForm/ToDoForm';
import { ToDoList } from './components/ToDoList/ToDoList';
import { ToDoFilters } from './components/ToDoFilters/ToDoFilters';
import { useTodos } from './hooks/todo';
import { Alert } from './components/Alert/Alert';

function App() {
  const todos = useTodos();
  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src='./work-order.png' />
        <h2 className={styles.Title}> To-Do App </h2>
      </header>

      <div className={styles.AppContainer}>
        {!!todos.error.message && (
          <Alert onClear={todos.error.clear}> {todos.error.message} </Alert>
        )}
        <ToDoForm onCreate={todos.create} />
        <ToDoFilters onFilters={todos.filter} />
        <ToDoList todos={todos.data} onUpdate={todos.update} onDelete={todos.delete}/>
      </div>
    </div>
  )
}

export default App
