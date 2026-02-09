import { PRIORITIES, PRIORITY_DEFAULT } from "../../constants/priorities";
import styles from './ToDoFormFields.module.css';

export function ToDoFormFields({ todo = {}, showAllFields = true }) {
    return (
        <div className={styles.FormFields}>
          <div className={styles.FormField}>
            <input
              type="text"
              aria-label="Task*"
              placeholder="Task*"
              name="task"
              autoComplete="off"
              defaultValue={todo.task}
              required
              minLength={3}
              maxLength={50}
            />
          </div>

          { showAllFields && <> <div className={styles.FormField}>
            <textarea
              aria-label="Description"
              placeholder="Description"
              name="description"
              rows="3"
              defaultValue={todo.description}
              maxLength={200}
            />
          </div>

          <div className={styles.FormGroup}>
            <div className={styles.FormField}>
              <label htmlFor="deadline">Deadline</label>
              <input type="date" id="deadline" name="deadline" defaultValue={todo.deadline} min={new Date().toISOString().split("T")[0]}/>
            </div>

            <div className={styles.FormField}>
              <label htmlFor="priority">Priority</label>
              <select defaultValue={todo.priority ?? PRIORITY_DEFAULT} id="priority" name="priority">
                {Object.entries(PRIORITIES).map(([key, {label}]) => (
                    <option key={key} value={key}> {label} </option>
                ))}
              </select>
            </div>
          </div> </> 
          }

        </div>
    )
}