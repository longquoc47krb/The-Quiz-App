/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
/* eslint-disable react/button-has-type */
import { usePrevious } from "@uidotdev/usehooks";
import { countBy } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateParticipants } from "@/apis/quizServices";
import { createResult } from "@/apis/resultServices";
import { congratSound, correctPaths, incorrectPaths, playMusic, playRandomSound , stopMusic } from "@/common/sounds";
import type { Quiz } from "@/interfaces";
import {
  isStart,
  pushToResults,
  setCurrentQuestion,
  setEndTime,
  setQuizSession,
  setTimePerQuestion,
  timePerQuestionSelector
} from "@/middlewares/slices/quizSessionSlice";
import { checkCorrectAnswer, checkOptionIsCorrectOrNot, validateOptionClassName } from "@/utils";

import SlideAnimation from "./animation/slider";
import Countdown from "./countdown";
import Modal from "./modal";
import MultiChoiceQuestions from "./multi-choice-questions/multi-choice-questions";
import ResultModal from "./resultModal";


function MultichoiceQuestionSection({
  quiz,
  currentQuestion,
  onHandleFinish
}: {
  quiz: Quiz;
  currentQuestion: number;
  onHandleFinish: any
}) {
  const time = 30 * quiz?.questions?.length;
  // sounds
  const correctRef = useRef<HTMLAudioElement | null>(null);
  const incorrectRef = useRef<HTMLAudioElement | null>(null);
  const congratsRef = useRef<HTMLAudioElement | null>(null);
  const streakRef = useRef<HTMLAudioElement | null>(null);
  const timePerQuestion = useSelector(timePerQuestionSelector);
  const [selectOption, setSelectOption] = useState("");
  const [isFinish, setIsFinish] = useState(false);
  const [isFillMissing, setIsFillMissing] = useState(false);
  const [isShowExplain, setIsShowExplain] = useState(false);
  const [isPause, setIsPause] = useState(false)
  const questions = useSelector((state) => state.quizSession.quiz.questions);
  const dispatch = useDispatch();
  const results = useSelector((state) => state.quizSession.results);
  const previousQuestion = usePrevious(currentQuestion);
  const user = useSelector((state) => state.quizSession.user);
  const startTime = useSelector((state) => state.quizSession.startTime);
  const endTime = useSelector((state) => state.quizSession.endTime);
  const streak = useSelector((state) => state.quizSession.streak)
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const numberCorrectAnswer = countBy(results, "correct").true || 0;
  async function submitResult() {
    await createResult({
      player_id: user.id,
      quiz_id: quiz.id,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      result: results,
    });
    await updateParticipants(quiz.id, user.id);
  }
  useEffect(() => {
    if (isFillMissing) {
      submitResult()
    }
  }, [isFillMissing]);
  useEffect(() => {
    if (isFinish) {
      const questionsLength = quiz?.questions?.length || 0;

      if (results.length !== questionsLength) {
        const diff = questionsLength - results.length;

        for (let i = 0; i < diff; i++) {
          const newQuestionIndex = results.length + i;
          const newQuestion = quiz?.questions?.[newQuestionIndex];

          if (newQuestion) {
            const { correctOption, options, text, explain, picture } = newQuestion;

            dispatch(
              pushToResults({
                yourChoice: "",
                correct: false,
                answer: correctOption,
                picture,
                options,
                time: 0,
                title: text,
                explain,
              })
            );
          }
        }
      }
      setIsFillMissing(true);
    }
  }, [isFinish]);
  // end sound
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(setTimePerQuestion(timePerQuestion + 1)); // Dispatch the action to update timer
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, timePerQuestion, currentQuestion]);
  useEffect(()=> {
    if(streak % 5 === 0 && streak > 0){
      playMusic(streakRef, `${router.basePath}/assets/sounds/streak.wav`)
      setTimeout(()=> {
        stopMusic(streakRef)
      }, 3000)
    }
  },[streak])
  const handleFinish = () => {
    if (!isFinish && !modalIsOpen) {
      dispatch(setEndTime(new Date()));
      setIsFinish(true);
      onHandleFinish(true)
      setModalIsOpen(true);
      setIsPause(true)
      // congratSound.play();
      playMusic(congratsRef, congratSound)
      dispatch(setQuizSession(null));
    }
  };
  const resetSelection = () => {
    setSelectOption("");
    setIsShowExplain(false);
    dispatch(setTimePerQuestion(0));
  };
  const resetQuizSession = () => {
    dispatch(setCurrentQuestion(0));
    dispatch(isStart(false));
  };
  const handleNextQuestion = () => {
    // Move to the next question and reset relevant states

    const lastQuestionIndex = questions.length - 1;
    if (currentQuestion < lastQuestionIndex) {
      resetSelection();
      dispatch(setCurrentQuestion(currentQuestion + 1));
    } else if (currentQuestion === lastQuestionIndex) {
      handleFinish();
    }
  };
  // console.log({yourAnswers})
  const handleAnswer = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    const selected = e.currentTarget.value;
    setSelectOption(selected);
    const isAnswerCorrect = checkCorrectAnswer(
      quiz?.questions[currentQuestion]?.options,
      quiz?.questions[currentQuestion]?.correctOption
    );
    setIsShowExplain(true);
    if (
      checkOptionIsCorrectOrNot(
        selected,
        quiz?.questions[currentQuestion]?.correctOption
      )
    ) {
      playRandomSound(correctRef, correctPaths)
    } else {
      playRandomSound(incorrectRef, incorrectPaths)
    }
    setTimeout(() => {
      handleNextQuestion();
    }, 2000);
  };

  const redirectToQuizDetail = () => {
    resetQuizSession();
    router.push(`/quiz/${quiz.id}`);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div className="flex flex-col items-center justify-center relative">
       <audio ref={correctRef} className="hidden"/>
       <audio ref={incorrectRef} className="hidden"/>
       <audio ref={congratsRef} className="hidden"/>
       <audio ref={streakRef} className="hidden"/>
      <h1>
        Question {currentQuestion + 1} of {questions?.length}
      </h1>
      <Countdown seconds={time} onCountdownComplete={handleFinish} isPaused={isPause} onPause={setIsPause} />
      <SlideAnimation
        direction={currentQuestion > previousQuestion ? 1 : -1}
        currentPage={currentQuestion}
        className="mx-auto top-[10vh] w-[80vw]"
      >
        <MultiChoiceQuestions
          key={currentQuestion}
          question={quiz?.questions[currentQuestion]}
          isFinish={isFinish}
          isShowExplain={isShowExplain}
          selectOption={selectOption}
          handleAnswer={handleAnswer}
          validateOptionClassName={validateOptionClassName}
        />
      </SlideAnimation>
      {isFinish && (
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-md w-fit hover:bg-red-700 mt-8"
          onClick={redirectToQuizDetail}
        >
          Finish
        </button>
      )}
      
        <Modal isOpen={modalIsOpen} onClose={closeModal}>
                <ResultModal
                  numberCorrectAnswer={numberCorrectAnswer}
                  questions={questions}
                  quiz={quiz}
                />
        </Modal>
    </div>
  );
}

export default MultichoiceQuestionSection;
