import { useField } from 'formik';
import clsx from 'clsx';
import './style.css';

export const CustomInput = ({ ...inputProps }) => {
    const [field, meta] = useField(inputProps);
    const inputClass = clsx('form-field', {
        'form-field-error': meta.touched && meta.error,
        'form-field-correct': meta.touched && !meta.error && field.value,
    });

    return (
        <div className="container">
            <input className={inputClass} {...field} {...inputProps} />
            {meta.touched && meta.error && <span className="meta-error">{'Email is not correct'}</span>}
        </div>
    );
};
