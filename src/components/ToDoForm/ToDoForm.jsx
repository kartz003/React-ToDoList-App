import { useState } from "react";
import styles from "./ToDoForm.module.css";
import { PRIORITY_DEFAULT } from "../../constants/priorities";
import { ToDoFormFields } from "../ToDoFormFields/ToDoFormFields";

export function ToDoForm({ onCreate }) {
    const [showAllFields, setShowAllFields] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const { elements } = event.target;

    if (elements?.task?.value === "") return;

    onCreate ({
      task: elements.task.value,
      description: elements?.description?.value ?? "",
      deadline: elements?.deadline?.value ?? "",
      priority: elements?.priority?.value ?? PRIORITY_DEFAULT,
      completed: false,
    });

    event.target.reset();
  }

  return (
    <section>
      <h3 className={styles.Title}>New To-Do
        <button onClick={() => setShowAllFields(!showAllFields)}> { showAllFields ? 'Hide' : 'Show' } all fields </button>
      </h3>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <ToDoFormFields showAllFields={showAllFields} />
        <input type="submit" value="Add" />
      </form>
    </section>
  );
}