/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
/* eslint-disable react/button-has-type */
// pages/quiz/[id].js

import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { fetchQuizById } from "@/apis/quizServices";
import {
  fetchResultsByPlayerIdAndQuizId,
  fetchResultsByQuizId,
} from "@/apis/resultServices";
import { backgroundSound, playMusic, stopMusic } from "@/common/sounds";
import Loading from "@/components/loading";
import MultichoiceQuestionSection from "@/components/multi-choice-section";
import OverviewResult from "@/components/quiz/overviewResult";
import ResultTable from "@/components/result-table";
import Tabs from "@/components/tabs";
import { useAuth } from "@/hooks/useAuthContext";
import type { Quiz } from "@/interfaces";
import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import { getRandomItemFromArray, shuffleArray } from "@/utils";

function QuizDetailPage({ quizData }: QuizDetailPageProps) {
  const router = useRouter();
  const { user } = useAuth();
  const isStart = useSelector((state) => state.quizSession.isStart);
  const [results, setResults] = useState([]);
  const [globalResults, setGlobalResults] = useState([]);
  if (!quizData) {
    return <Loading />;
  }
  const [currentTab, setCurrentTab] = useState(0);
  const handleSwitchTab = (tab) => {
    setCurrentTab(tab);
  };
  const [isFinish, setIsFinish] = useState(false);
  const currentQuestion = useSelector(
    (state) => state.quizSession.currentQuestion
  );
  // bg sound
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const BGSound = useMemo(
    () => getRandomItemFromArray(backgroundSound),
    [isStart]
  );
  const playBGMusic = useCallback(
    () => playMusic(audioRef, BGSound, 0.5, true),
    [isStart]
  );
  const stopBGMusic = useCallback(() => stopMusic(audioRef), [isStart]);
  useEffect(() => {
    if (isStart) {
      playBGMusic();
    }
    if (isFinish) {
      stopBGMusic();
    }
  }, [isStart, isFinish, BGSound]);

  useEffect(() => {
    async function fetchResults() {
      const communicatiyResponse = await fetchResultsByQuizId(quizData.id);
      setGlobalResults(communicatiyResponse.data);
      if (!user) {
        // Handle the scenario where the user is null (optional)
        console.log("User is null. Cannot fetch results.");
        setResults([]);
        return;
      }

      const response = await fetchResultsByPlayerIdAndQuizId(
        user.id,
        quizData.id
      );
      setResults(response.data);
      
      
    }

    if (quizData) {
      fetchResults();
    }
}, [user, quizData]);

  // tabs
  const tabs = ["My recent quiz", "Community"];
  return (
    <Main
      meta={
        <Meta
          title={`Quizaka | ${quizData?.title}`}
          description={`${quizData?.title}`}
        />
      }
    >
      <audio ref={audioRef} className="hidden" />
      {!isStart && (
        <div className="m-4">
          <OverviewResult quizData={quizData} results={results} />
          <Tabs tabs={tabs} onSwitchTab={handleSwitchTab}>
            {currentTab === 0 ? 
              <ResultTable results={results} symbol={false} />
               : <ResultTable results={globalResults} symbol/>}
          </Tabs>
        </div>
      )}
      {isStart && (
        <MultichoiceQuestionSection
          quiz={quizData}
          currentQuestion={currentQuestion}
          onHandleFinish={setIsFinish}
        />
      )}
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
    console.error("Error fetching quiz data:", error);

    return {
      props: {
        quizData: null,
      },
    };
  }
}
export default QuizDetailPage;
