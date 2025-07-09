import { useEffect, useState } from 'react';
import validator from 'validator';



interface UseValidateProps {
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
}

interface ValidationResult {
    isValid: boolean,
    errors: {
        email: boolean,
        password: boolean,
        firstName?: boolean,
        lastName?:boolean
    };
}

const useValidateFields = ({
    email, 
    password,
    firstName,
    lastName
}: UseValidateProps): ValidationResult => {
    const [res, setRes] = useState<ValidationResult>({
        isValid: false,
        errors: {
            email: false,
            password: false,
            firstName: false,
            lastName: false
        },
    });

    useEffect(() => {
        const isEmailValid = validator.isEmail(email.trim());
        const isPasswordValid = 
            password.trim().length >= 8 && !password.includes(' ');
        const isFirstNameValid = firstName === undefined || firstName.trim().length > 0;
        const isLastNameValid = lastName === undefined || lastName.trim().length > 0;

        setRes({
            isValid: isEmailValid && isPasswordValid && isFirstNameValid && isLastNameValid,
            errors: {
                email: !isEmailValid,
                password: !isPasswordValid,
                firstName: !isFirstNameValid,
                lastName: !isLastNameValid
            },
        });
    }, [email, password, firstName, lastName])

    return res;
};

export default useValidateFields;