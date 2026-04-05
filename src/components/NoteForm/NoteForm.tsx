import { useId } from 'react';
import type { Note, NoteBody } from '../../types/note';
import css from './NoteForm.module.css'
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import * as Yup from "yup";

interface NoteFormProps {
    onCancel: () => void;
    onSubmit: (note: NoteBody) => void
}

interface NoteFormValues {
    title: string;
    content: string;
    tag: Note['tag']
}

const initialValues: NoteFormValues = {
    title: "",
    content: "",
    tag: 'Todo'
};

const NoteFormSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, "Title must be at least 3 characters")
        .max(50, "Title is too long")
        .required("Title is required"),
    content: Yup.string()
        .max(500, "Content is too long"),
    tag: Yup.string()
        .oneOf(["Work", "Personal", "Meeting", "Shopping", "Todo"], "Invalid tag")
        .required("Tag is required")
});

export default function NoteForm({ onCancel, onSubmit }: NoteFormProps) {
    const handleSubmit = (values: NoteFormValues,
        actions: FormikHelpers<NoteFormValues>) => {
        actions.resetForm()
        onSubmit(values)
    }
    const fieldId = useId();

    return (

        <Formik initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={NoteFormSchema}>
            <Form className={css.form}>
                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-title`}>Title</label>
                    <Field type="text" name="title" id={`${fieldId}-title`}
                        className={css.input} />
                    <ErrorMessage name="title" component="span" className={css.error} />
                </div>
                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-content`}>Content</label>
                    <Field as="textarea" name="content" id={`${fieldId}-content`}
                        rows={8} className={css.textarea} />
                    <ErrorMessage name="content" component="span" className={css.error} />
                </div>
                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-tag`}>Tag</label>
                    <Field as="select" name="tag" id={`${fieldId}-tag`}
                        className={css.select} >
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </Field>
                    <ErrorMessage name="tag" component="span" className={css.error} />
                </div>
                <div className={css.actions}>
                    <button type="button"
                        className={css.cancelButton}
                        onClick={onCancel}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={css.submitButton}
                        disabled={false}
                    >
                        Create note
                    </button>
                </div>
            </Form>
        </Formik>
    )
}