/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React from 'react';
import {useFieldArray, useForm } from 'react-hook-form';
import { BsTrash } from 'react-icons/bs';

import { QuizCategoryList } from '@/common/constants';
import type { Quiz} from '@/interfaces';

import ErrorMessage from '../error-message';


const CreateQuizForm = () => {
  const { control, handleSubmit, register, formState: {errors},   getValues, } = useForm<Quiz>({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      questions: [
        {
          text: '',
          options: ['', '', '', ''],
          correctOption: '',
          explain: ''
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions'
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  const optionsList = getValues('questions');
  console.log("AAAA:", getValues())
  return (
    <main className="mx-auto px-4">
      <h2 className="text-3xl font-bold mb-4">Create Quiz Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block mb-4">
          Quiz Title:
          <input
            type="text"
            {...register('title', { required: true })}
            className="input-container"
          />
               <ErrorMessage error={errors.title?.message} />
        </label>
        <label className="block mb-4">
          Quiz Description:
          <textarea
            {...register('description', { required: true })}
            className="input-container"
          />
        </label>
        <label className="block mb-4">
          Category:
          <select
    {...register('category', { required: true })}
    className="input-container"
  >
    {
      QuizCategoryList?.map((item : string,index : number)=> 
      <option value={item}>{item}</option>)
    }
    {/* Add more options as needed */}
  </select>
        </label>
        <h3 className="text-xl font-bold mt-4">Questions:</h3>
        {fields.map((question, index) => (
          <div key={question.id} className="mt-4 border rounded p-4">
            <label className="block mb-2">
              Question {index + 1}:
              <input
                {...register(`questions.${index}.text`, { required: true })}
                className="input-container"
              />
            </label>
            <div className="grid grid-cols-2 justify-center">
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex} className="block mb-2 mr-2">
                  Option {optionIndex + 1}:
                  <input
                    {...register(`questions.${index}.options.${optionIndex}`, { required: true })}
                    className="input-container"
                  />
                </label>
              ))}
            </div>
            <label className="block mb-2">
              Correct Option:
              <select
    {...register(`questions.${index}.correctOption`, { required: true })}
    className="input-container"
  >
    {question.options?.map((option, optionIndex) => (
      <option key={optionIndex} value={option}>
        {option}
      </option>
    ))}
  </select>
            </label>
            <label className="block mb-2">
              Explanation:
              <textarea
                {...register(`questions.${index}.explain`, { required: true })}
                className="input-container"
              />
            </label>
            <button
              type="button"
              onClick={() => remove(index)}
              disabled={optionsList === 1}
              className="w-fit flex items-center gap-x-4 bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-700"
            >
              <BsTrash/> <span>Remove Question</span>
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            append({
              text: '',
              options: ['', '', '', ''],
              correctOption: '',
              explain: ''
            })
          }
          className="bg-blue-500 hover:bg-blue-800 text-white text-center px-4 py-2 rounded mt-4"
        >
          Add Question
        </button>
        <br />
        <br />
        <button type="submit" className="text-center bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-700">
          Submit Quiz
        </button>
      </form>
    </main>
  );
};

export default CreateQuizForm;

