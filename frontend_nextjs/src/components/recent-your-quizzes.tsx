/* eslint-disable prettier/prettier */
/* eslint-disable unused-imports/no-unused-vars */
import { useEffect, useState } from 'react';

import { fetchResultsByPlayerId } from '@/apis/resultServices';
import { useAuth } from '@/hooks/useAuthContext';
import type { Result } from '@/interfaces';

import ResultEntity from './result';

const RecentYourQuizzes = () => {
  const [results, setResult] = useState([]);
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  useEffect(()=>{
    async function getResults(){
      try {
        setLoading(true)
        const response = await fetchResultsByPlayerId(user?.id);
        setResult(response)
        setLoading(false)
      } catch (err){
        console.log({err})
        setLoading(false)
      }
      
    }
    getResults()
  },[])
  const reversedArray = results?.map((_, index, array) => array[array.length - 1 - index]) ?? [];
  if(loading){
    return <div className='w-screen p-4'><span>Loading ...</span></div>
  }
  return <>
    {results?.length > 0 
    && 
    <>
      <h1 className="m-4 text-2xl text-gray-400 font-medium">Recent</h1>
      <div className='m-4 w-[calc(100vw-10rem) grid grid-cols-[24rem_24rem_24rem] gap-4'>
      {
        reversedArray.slice(0, 3).map((props: Result) => (
          <ResultEntity  key={props.id} {...props}/>
        ))
      }
        </div>
        <button className='m-4 hover:bg-transparent rounded-lg w-screen hover:text-gray-400 hover:translate-x-2 hover:duration-150 hover:ease-linear'>View more ▶</button>
    </>
  
  }
  </>
  
};



export default RecentYourQuizzes;
