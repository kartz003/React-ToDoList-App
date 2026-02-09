import styles from "./ToDoList.module.css";
import { ToDoListItem } from "../ToDoListItem/ToDoListItem";

export function ToDoList({ todos, onUpdate, onDelete }) {
  return (
    <section>
        <h3>To-Do's</h3>
        {!todos.length && <p>Sorry, you don't have any to-do's</p>}

        <ul className={styles.TodoList}>
            {todos.map((todo) => (
                <ToDoListItem key={todo.id} todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
            ))}
        </ul>
    </section>
  );
}