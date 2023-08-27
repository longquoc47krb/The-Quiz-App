/* eslint-disable react/no-array-index-key */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import { usePrevious } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { FormProvider , useFieldArray, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { BsTrash } from "react-icons/bs";

import { createQuiz, updateQuiz } from "@/apis/quizServices";
import { QuizCategoryList } from "@/common/constants";
import type { CreateQuizDto, Quiz, UpdateQuizDto } from "@/interfaces";

import SlideAnimation from "../animation/slider";
import ErrorMessage from "../error-message";
import ExportJSONButton from "../export-json-button";
import GridPagination from "../grid-pagination";
import UploadFile from "../upload-file";
import ImageUpload from "../upload-image";

interface CreateUpdateQuizProps {
  isUpdate ?: boolean;
  data ?: Quiz
}
const CreateQuizForm = (props: CreateUpdateQuizProps) => {
  const { isUpdate, data: existingQuizData } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    setValue,
    methods,
    watch
  } = useForm<Quiz>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      questions: [
        {
          
          text: "",
          options: ["", "", "", ""],
          correctOption: "",
          explain: "",
          picture:""
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });
  // if data exists

  useEffect(() => {
    if (isUpdate && existingQuizData) {
      // Set the form data with existing quiz data for update
      setValue("title", existingQuizData.title)
      setValue("description", existingQuizData.description)
      setValue("category", existingQuizData.category)
      setValue("questions", existingQuizData.questions)
    }
  }, [isUpdate]);


  // reorder question using drag-n-drop
  const [step, setStep] = useState(1);
  const previousStep = usePrevious(step);
  const [numQuestions, setNumQuestions] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState(-1);
  const [isUploadFromDevice, setIsUploadFromDevice] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const questionsPerPage = 1;
  const totalPages = Math.ceil(fields.length / questionsPerPage);
  const handleDataUpload = (data: any, error?: string) => {
    if (error) {
      setErrorMessage(error);
    } else {
      setIsUploadFromDevice(true);
      setValue("questions", data);
      setErrorMessage(null);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const defaultQuestions = Array.from({ length: numQuestions }, () => ({
    text: "",
    options: ["", "", "", ""],
    correctOption: "",
    explain: "",
    picture: ""
  }));
  useEffect(() => {
    if (!isUploadFromDevice && !isUpdate) {
      setValue("questions", defaultQuestions);
    }
  }, [isUploadFromDevice]);

  const values = getValues();
  const { questions } = values;
  console.log({questions})
  const onUpdateSubmit: SubmitHandler<UpdateQuizDto> = async (
    data: UpdateQuizDto
  ) => {
    if (step === 2 && isSubmitting) {
      try {
        const response: any = await updateQuiz(existingQuizData?.id, data);
        toast.success("Updated quiz successful!"); // Display success toast
        setIsSubmitting(false);
      } catch (error) {
        toast.error("Updated quiz failed. Try again"); // Display error toast
      } finally {
        setIsSubmitting(false); // Reset the flag after submission (success or failure)
      }
    }
  };
  const onCreateSubmit: SubmitHandler<CreateQuizDto> =  async (
    data: CreateQuizDto
  ) => {
    if (step === 2 && isSubmitting) {
      try {
        const response: any = await createQuiz(data);
        toast.success("Created quiz successful!"); // Display success toast
        setIsSubmitting(false);
      } catch (error) {
        console.log({error})
        toast.error("Create quiz failed. Try again"); // Display error toast
      } finally {
        setIsSubmitting(false); // Reset the flag after submission (success or failure)
      }
    }
  };

  const goToNextStep = () => {
    setStep(step + 1);
  };

  const goToPreviousStep = () => {
    setStep(step - 1);
  };
  const renderStep = () => {
    return (
      <SlideAnimation
      direction={step > previousStep ? 1 : -1}
      currentPage={step}
      className="mx-auto"
    >
        {step === 1 && (
          <div
            key="step1"
            className="w-[calc(100vw-20rem)]">
            <label className="block mb-4">
              Quiz Title:
              <input
                type="text"
                {...register("title", { required: false })}
                className="input-container"
              />
              <ErrorMessage error={errors.title?.message} />
            </label>
            <label className="block mb-4">
              Quiz Description (Optional)
              <textarea
                {...register("description", { required: false })}
                className="input-container"
              />
            </label>
            <label className="block mb-4">
              Category:
              <select
                {...register("category", { required: true })}
                className="input-container"
              >
                {QuizCategoryList?.map((item: string, index: number) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="block mb-4">
              Number of questions:
              <input
                type="number"
                className="input-container"
                step="1"
                value={numQuestions}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNumQuestions(Number(e.target.value))
                }
              />
              <button
                type="button"
                onClick={goToNextStep}
                className="text-center dark:bg-active bg-primary text-white px-4 py-2 rounded mt-4 hover:bg-violet-950"
              >
                Next
              </button>
            </label>
          </div>
        )}
        {step === 2 && (
            <div
              className="flex items-start"
              key="step2"
            >
              <div>
                <h3 className="text-xl font-bold mt-4">Questions:</h3>
                <div className="flex items-center gap-x-4">
                  <UploadFile onDataUpload={handleDataUpload} /> {isUpdate && <ExportJSONButton data={values} />}
                </div>
                {fields
                  .slice(
                    currentPage * questionsPerPage,
                    (currentPage + 1) * questionsPerPage
                  )
                  ?.map((question, index) => (
                    <div key={question.id} className="mt-4 border rounded p-4">
                      <label className="block mb-2">
                        Question {currentPage + 1}:
                        <input
                          {...register(`questions.${currentPage}.text`, {
                            required: true,
                          })}
                          className="input-container"
                        />
                      </label>
                      <label className="block mb-2">
                        Picture (Optional):
                        <ImageUpload name={`questions.${currentPage}.picture`} value={questions[currentPage]?.picture} setValue={setValue}/>
                      </label>
                      <div className="grid grid-cols-2 justify-center">
                        {question.options.map((option, optionIndex) => (
                          <label key={optionIndex} className="block mb-2 mr-2">
                            Option {optionIndex + 1}:
                            <input
                              {...register(
                                `questions.${currentPage}.options.${optionIndex}`,
                                { required: false }
                              )}
                              className="input-container"
                            />
                          </label>
                        ))}
                      </div>
                      <label className="block mb-2">
                        Correct Option:
                        <select
                          {...register(`questions.${currentPage}.correctOption`, {
                            required: true,
                          })}
                          className="input-container"
                        >
                          {/* {getValues(`questions.${currentPage}.options`)?.map( */}
                          {getValues(`questions.${currentPage}.options`)?.map(
                            (option, optionIndex) => (
                              <option key={optionIndex} value={option}>
                                {option}
                              </option>
                            )
                          )}
                        </select>
                      </label>
                      <label className="block mb-2">
                        Explanation (Optional)
                        <textarea
                          {...register(`questions.${currentPage}.explain`, {
                            required: false,
                          })}
                          className="input-container"
                        />
                      </label>
                      <div className="flex justify-center items-center">
                        <button
                          type="button"
                          onClick={() => remove(currentPage)}
                          disabled={questions?.length === 1}
                          className="w-fit flex items-center gap-x-4 bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-700 disabled:cursor-not-allowed"
                        >
                          <BsTrash /> <span>Remove Question</span>
                        </button>
                      </div>
                    </div>
                  ))}
                <div className="mt-4" />
                <button
                  type="button"
                  onClick={() =>
                    append({
                      text: "",
                      options: ["", "", "", ""],
                      correctOption: "",
                      explain: "",
                    })
                  }
                  className="bg-primary dark:bg-active text-white text-center px-4 py-2 rounded mt-4"
                >
                  Add Question
                </button>
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  className="text-center dark:bg-orange-500 text-gray-800 px-4 py-2 rounded mt-4 hover:bg-gray-400 dark:text-gray-300"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  onClick={() => setIsSubmitting(true)}
                  className="text-center bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-700"
                >
                  Submit Quiz
                </button>
              </div>
              <div className="mt-8">
                <GridPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                  handleNextPage={handleNextPage}
                  handlePrevPage={handlePrevPage}
                />
              </div>
            </div>
        )}
      </SlideAnimation>
    );
  };
  return (
    <main className="mx-auto px-4">
      <h2 className="text-3xl font-bold mb-4">{isUpdate ? "Update" : "Create"} Quiz Form</h2>
      <FormProvider {...methods}>
      <form
        onSubmit={isUpdate ? handleSubmit(onUpdateSubmit) : handleSubmit(onCreateSubmit)}
        // className='w-[calc(100vw-15rem)]'
      >
        {renderStep()}
      </form>
      </FormProvider>
      <Toaster />
    </main>
  );
};

export default CreateQuizForm;
