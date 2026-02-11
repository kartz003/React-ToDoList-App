import { PRIORITIES, PRIORITY_DEFAULT } from "../../constants/priorities";
import styles from './ToDoFormFields.module.css';

export function ToDoFormFields({ todo = {}, showAllFields = true, register, errors = {} }) {
    return (
        <div className={styles.FormFields}>
          <div className={styles.FormField}>
            <input
              type="text"
              aria-label="Task*"
              placeholder="Task*"
              autoComplete="off"
              defaultValue={todo.task}
              aria-invalid={!!errors.task}
              {...register("task")}
            />
            {!!errors.task && (
              <span className={styles.FormFieldError}> {errors.task.message} </span>
            )}
          </div>

          { showAllFields && <> <div className={styles.FormField}>
            <textarea
              aria-label="Description"
              placeholder="Description"
              rows="3"
              defaultValue={todo.description}
              aria-invalid={!!errors.description}
              {...register("description")}
            />
            {!!errors.description && (
              <span className={styles.FormFieldError}> {errors.description.message} </span>
            )}
          </div>

          <div className={styles.FormGroup}>
            <div className={styles.FormField}>
              <label htmlFor="deadline">Deadline</label>
              <input 
                type="date" 
                id="deadline"
                defaultValue={todo.deadline}
                aria-invalid={!!errors.deadline}
                {...register("deadline")}
                />
                {!!errors.deadline && (
                  <span className={styles.FormFieldError}> {errors.deadline.message} </span>
                )}
            </div>

            <div className={styles.FormField}>
              <label htmlFor="priority">Priority</label>
              <select 
                defaultValue={todo.priority ?? PRIORITY_DEFAULT}
                aria-invalid={!!errors.priority}
                id="priority" 
                {...register("priority")}>
                {Object.entries(PRIORITIES).map(([key, {label}]) => (
                    <option key={key} value={key}> {label} </option>
                ))}
              </select>
              {!!errors.priority && (
                <span className={styles.FormFieldError}> {errors.priority.message} </span>
              )}
            </div>
          </div> </> 
          }

        </div>
    )
}