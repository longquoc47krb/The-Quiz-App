/* eslint-disable prettier/prettier */
/* eslint-disable react/button-has-type */
// pages/quiz/[id].js

import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector  } from 'react-redux';

import { fetchQuizById } from '@/apis/quizServices';
import Loading from '@/components/loading';
import Modal from '@/components/modal';
import MultichoiceQuestionSection from '@/components/multi-choice-section';
import QuizStartForm from '@/components/quiz-start-form';
import type { Quiz } from '@/interfaces';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { shuffleArray } from '@/utils';

function QuizDetailPage({ quizData }: QuizDetailPageProps) {
  const router = useRouter();
  const { id } = router.query;
  const isStart = useSelector(state => state.quizSession.isStart);
  if (!quizData) {
    return <Loading />;
  }
  const [modalOpen, setModalOpen] = useState(true);
  const currentQuestion = useSelector(state => state.quizSession.currentQuestion)
  const closeModal = () => {
    setModalOpen(false);
  }
  return (
    <Main
      meta={
        <Meta
          title={`Quizaka | ${quizData?.title}`}
          description={`${quizData?.title}`}
        />
      }
     >
      <Modal isOpen={modalOpen} onClose={()=> {
        closeModal()
        router.push('/')
        }}>
        <QuizStartForm quizData={quizData} onClose={closeModal}/>
      </Modal>
        {isStart && <MultichoiceQuestionSection quiz={quizData} currentQuestion={currentQuestion}/> }
       
     </Main>
  );
}
interface QuizDetailPageProps {
  quizData: Quiz;
}
export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  function shuffleQuestionsAndOptions(data) {
    const shuffledData = { ...data }; // Create a copy of the original data
  
    // Shuffle questions
    shuffleArray(shuffledData.questions);
  
    // Shuffle options for each question
    for (const question of shuffledData.questions) {
      shuffleArray(question.options);
    }
  
    return shuffledData;
  }
  
  try {
    const response = await fetchQuizById(id);
    const shuffledQuiz = shuffleQuestionsAndOptions(response.data);

    return {
      props: {
        quizData: shuffledQuiz,
      },
    };
  } catch (error) {
    console.error('Error fetching quiz data:', error);

    return {
      props: {
        quizData: null,
      },
    };
  }
}
export default QuizDetailPage;
