import * as yup from 'yup';

export const validateSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  username: yup
    .string()
    .required('Username is required')
    .test(
      'no-whitespace',
      'Username must not contain whitespace',
      (value: any) => {
        return value && !/\s/.test(value);
      },
    )
    .test(
      'no-special-symbol',
      'Username must not contain special symbols',
      (value: any) => {
        return value && !/[^a-zA-Z0-9]/.test(value);
      },
    ),
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .test(
      'password',
      'Password must contain at least 1 special character, number, and uppercase letter',
      (value) =>
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+]).{6,}$/.test(
          value || '',
        ),
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});
export const validateQuestion = (question: any) => {
  return (
    question &&
    typeof question.text === 'string' &&
    Array.isArray(question.options) &&
    question.options.length === 4 &&
    question.options.every((option) => typeof option === 'string') &&
    typeof question.correctOption === 'string' &&
    typeof question.explain === 'string'
  );
};
