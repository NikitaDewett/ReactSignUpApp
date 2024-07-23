import clsx from 'clsx';
import './style.css';

export const PasswordValidatorInfo = ({ desc, isCorrect, wasInputStarted }) => {
    const validatorStyle = isCorrect ? 'password-validator-correct' : 'password-validator-error';
    return <span className={clsx('password-validator', wasInputStarted ? validatorStyle : '')}>{desc}</span>;
};
