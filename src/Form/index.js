import { useState } from 'react';
import { Formik, Form } from 'formik';

import { CustomInput } from './CustomInput';
import { PasswordInput } from './PasswordInput';
import { validateMinLength, validateCase, validateDigit, validationSchema } from './utils';
import './style.css';
import { PasswordValidatorInfo } from './PasswordValidatorInfo';

const validateForm = (values) => {
    const errors = {};
    const validationErrors = {
        minLength: !validateMinLength(values.password),
        case: !validateCase(values.password),
        digit: !validateDigit(values.password),
    };

    if (validationErrors.minLength) {
        errors.password = 'Password must be at least 8 characters long and cannot contain spaces';
    }
    if (validationErrors.case) {
        errors.password = 'Password must include both uppercase and lowercase letters';
    }
    if (validationErrors.digit) {
        errors.password = 'Password must include at least one digit';
    }

    return { errors, validationErrors };
};

export const BasicForm = () => {
    const [validationErrors, setValidationErrors] = useState({
        minLength: false,
        case: false,
        digit: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [wasInputStarted, setWasInputStarted] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = (_values, { resetForm }) => {
        alert('Sign Up Success!');
        resetForm();
        setWasInputStarted(false);
    };

    return (
        <div className="basic-form">
            <span className="form-header">Sign up</span>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={validationSchema}
                validate={(values) => {
                    const { errors, validationErrors } = validateForm(values);
                    setValidationErrors(validationErrors);
                    return errors;
                }}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form className="custom-form">
                        <CustomInput
                            name="email"
                            type="text"
                            placeholder="Email"
                        />
                        
                        <PasswordInput
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Create your password"
                            toggleShowPassword={toggleShowPassword}
                            showPassword={showPassword}
                            /**
                             * Need that for live tracking user's input for PasswordValidatorInfo components
                             * without that flag our PasswordValidatorInfo will work only with Late validation
                             */
                            wasInputStarted={wasInputStarted}
                            setWasInputStarted={setWasInputStarted}
                        />

                        <div className="info-block">
                            <PasswordValidatorInfo
                                desc="8 characters or more (no spaces)"
                                isCorrect={!validationErrors.minLength}
                                wasInputStarted={wasInputStarted}
                            />
                            <PasswordValidatorInfo
                                desc="Uppercase and lowercase letters"
                                isCorrect={!validationErrors.case}
                                wasInputStarted={wasInputStarted}
                            />
                            <PasswordValidatorInfo
                                desc="At least one digit"
                                isCorrect={!validationErrors.digit}
                                wasInputStarted={wasInputStarted}
                            />
                        </div>
                        <button type="submit" className="submit-btn">
                            Sign Up
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
