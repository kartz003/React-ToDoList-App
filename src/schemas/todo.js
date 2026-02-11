import * as Yup from 'yup';
import { PRIORITIES } from '../constants/priorities';

export function getToDoScehma({ isNew = false } = {}) {
    const deadlineRule = Yup.string()
        .nullable()
        .transform((value, originalValue) => originalValue === "" ? null : value)
        .matches(/^\d{4}-\d{2}-\d{2}$/, "Deadline should be valid date in YYYY-MM-DD format")
    return Yup.object().shape({
        task: Yup.string()
            .required("Task name is required.")
            .min(3, "Task name should have min length 3 characters.")
            .max(50, "Task name should have max length 50 characters."),
        description: Yup.string()
            .max(200, "Description should have max length 200 characters."),
        deadline: isNew ? 
            deadlineRule.test("is-future-date", "Deadline can't be a date in the past.", (value) => {
                const today = new Date().toISOString().split("T")[0]
                return value ? value >= today : true
            }) : deadlineRule,
        priority: Yup.string()
            .required("Priority is not valid value").oneOf(Object.keys(PRIORITIES), "Priority is not valid value")
    })
}