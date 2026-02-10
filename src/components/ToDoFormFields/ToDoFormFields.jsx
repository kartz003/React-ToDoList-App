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
              {...register("task", { 
                required: "Task name is required", 
                minLength: {
                  value: 3,
                  message: "Task name should have min length 3 characters."
                }, 
                maxLength:  {
                  value: 50,
                  message: "Task name should have max length 50 characters."
                } })}
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
              {...register("description", { 
                maxLength: {
                  value: 200,
                  message: "Description should have max length 200 characters."
                } 
              })}
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
                {...register("deadline", {
                  min: !todo.id && { 
                    value: new Date().toISOString().split("T")[0],
                    message: "Deadline can't be a past date."
                  }
                })}
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
                {...register("priority", {
                  validate: (value) =>
                    Object.keys(PRIORITIES).includes(value) ||
                    "Priority is not valid value"
                })}>
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