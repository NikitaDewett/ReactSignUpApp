import { useField, useFormikContext } from 'formik';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import '../CustomInput/style.css';
import { useState } from 'react';

export const PasswordInput = ({ toggleShowPassword, showPassword, setWasInputStarted, wasInputStarted, ...inputProps }) => {
    const [field, meta] = useField(inputProps);

    const inputClass = clsx('form-field', {
        'form-field-error': meta.touched && meta.error,
        'form-field-correct': meta.touched && !meta.error && field.value,
    });

    const handleChange = () => {
        if (!wasInputStarted) {
            setWasInputStarted(true);
        }
    };

    return (
        <div className="container">
            <div className="password-input-wrapper">
                <input onKeyUp={handleChange} className={inputClass} type={showPassword ? 'text' : 'password'} {...field} {...inputProps} />
                <button
                    type="button"
                    className="password-toggle-button"
                    onClick={toggleShowPassword}
                    aria-label="Toggle password visibility"
                >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} color="#6F91BC" />
                </button>
            </div>
            {meta.touched && meta.error && (
                <span className="meta-error">
                    {"This password doesn't look right."}
                    <br />
                    {'Please try again or reset it now.'}
                </span>
            )}
        </div>
    );
};
