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
export const validateUpdatePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .test(
      'currentPassword',
      'Password must contain at least 1 special character, number, and uppercase letter',
      (value) =>
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+]).{6,}$/.test(
          value || '',
        ),
    ),
  newPassword: yup
    .string()
    .required('New Password is required')
    .min(6, 'Password must be at least 6 characters')
    .test(
      'newPassword',
      'Password must contain at least 1 special character, number, and uppercase letter',
      (value) =>
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+]).{6,}$/.test(
          value || '',
        ),
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm Password is required'),
});
export const validateQuestion = (question: any) => {
  return (
    question &&
    typeof question.text === 'string' &&
    typeof question.picture === 'string' &&
    Array.isArray(question.options) &&
    question.options.length === 4 &&
    question.options.every((option) => typeof option === 'string') &&
    typeof question.correctOption === 'string' &&
    typeof question.explain === 'string'
  );
};
export const quizSchema = yup.object().shape({
  title: yup.string(),
  description: yup.string(),
  category: yup.string().required('Category is required'),
  questions: yup.array().of(
    yup.object().shape({
      text: yup.string().required('Question text is required'),
      options: yup
        .array()
        .of(yup.string().nullable())
        .min(2, 'At least 2 options are required'),
      correctOption: yup.string().required('Correct option is required'),
      explain: yup.string().nullable(),
      picture: yup.string().nullable(),
    }),
  ),
});
