import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./ToDoForm.module.css";
import { PRIORITY_DEFAULT } from "../../constants/priorities";
import { ToDoFormFields } from "../ToDoFormFields/ToDoFormFields";
import { yupResolver } from "@hookform/resolvers/yup";
import { getToDoScehma } from "../../schemas/todo";

export function ToDoForm({ onCreate }) {
  const [showAllFields, setShowAllFields] = useState(false);
  const { register, handleSubmit, reset, formState: {errors} } = useForm({
    resolver: yupResolver(getToDoScehma({ isNew: true })),
    defaultValues: {
      description: "",
      deadline: "",
      priority: PRIORITY_DEFAULT,
      completed: false
    }
  });

  function handleCreate(data) {
    onCreate (data);
    reset();
  }

  return (
    <section>
      <h3 className={styles.Title}>New To-Do
        <button onClick={() => setShowAllFields(!showAllFields)}> { showAllFields ? 'Hide' : 'Show' } all fields </button>
      </h3>
      <form className={styles.Form} onSubmit={handleSubmit(handleCreate)}>
        <ToDoFormFields showAllFields={showAllFields} register={register} errors={errors} />
        <input type="submit" value="Add" />
      </form>
    </section>
  );
}