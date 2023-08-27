/* eslint-disable prettier/prettier */
/* eslint-disable react/button-has-type */
// pages/quiz/[id].js


import { fetchQuizById } from '@/apis/quizServices';
import CreateQuizForm from '@/components/quiz/createQuiz';
import type { Quiz } from '@/interfaces';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { shuffleArray } from '@/utils';

function UpdateQuizPage({ quizData }: QuizDetailPageProps) {
  return (
    <Main
      meta={
        <Meta
          title="Update quiz"
          description="Update quiz"
        />
      }
     >
        <CreateQuizForm data={quizData} isUpdate/>
       
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

    return {
      props: {
        quizData: response.data,
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
export default UpdateQuizPage;
