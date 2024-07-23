import * as Yup from 'yup';

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validateMinLength = (value) => /^[^\s]{8,}$/.test(value);
export const validateCase = (value) => /[a-z]/.test(value) && /[A-Z]/.test(value);
export const validateDigit = (value) => /\d/.test(value);

export const validationSchema = Yup.object({
    email: Yup.string().matches(emailRegex, 'Invalid email format').required('Email is required'),
})