/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prettier/prettier */
/* eslint-disable unused-imports/no-unused-vars */
import { Splide } from "@splidejs/react-splide";
import { useQuery } from "@tanstack/react-query";
import { isArray } from "lodash";
import type { GetServerSideProps } from "next";

import { fetchResultsByPlayerId } from "@/apis/resultServices";
import { useAuth } from "@/hooks/useAuthContext";
import type { Result } from "@/interfaces";
import store from "@/middlewares/store";

import ResultEntity from "./result";
import ResultItemWrap from "./splide";

export const getServerSideProps: GetServerSideProps<{
  results: Result[];
}> = async () => {
  try {
    const { user } = store.getState().quizSession;
    const results = await fetchResultsByPlayerId(user?.id);
    return {
      props: { results },
    };
  } catch (error) {
    console.error("Error fetching results:", error);
    return {
      props: { results: [] }, // Handle the error case appropriately
    };
  }
};
const RecentYourQuizzes = () => {
  const { user } = useAuth();
  const { data: results, isLoading } = useQuery({
    queryKey: ["resultsByPlayerId"],
    queryFn: () => {
      if (!user) {
        // Handle the case when user is undefined or null
        return Promise.resolve([]); // You can return an empty array or any default value
      }
      return fetchResultsByPlayerId(user.id);
    },
    refetchInterval: 10000
  });
  if (isLoading) {
    return (
      <div className="w-screen p-4">
        <span>Loading ...</span>
      </div>
    );
  }
  const reversedArray = isArray(results?.data)
    ? results.data.map((_, index, array) => array[array.length - 1 - index])
    : [];
  const resultArrayLength = isArray(results?.data) ? results?.data.length : 0;
  return (
    <>
      {resultArrayLength > 0 && (
        <>
          <h1 className="m-4 text-2xl text-gray-400 font-medium section">Recent</h1>
            <Splide options={{start:0, perPage: 3, gap: "1rem" , width: 'calc(100vw - 8rem)', arrows: false, height: "100%"}} tag="div" style={{paddingTop: "1em", paddingLeft: 8}}>
              {reversedArray.map((props: Result) => (
                <ResultItemWrap>
                  <ResultEntity key={props.id} {...props} />
                </ResultItemWrap>
              ))}
            </Splide>
        </>
      )}
    </>
  );
};

export default RecentYourQuizzes;
