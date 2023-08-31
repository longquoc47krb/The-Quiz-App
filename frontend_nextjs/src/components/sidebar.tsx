/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/button-has-type */
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { LuHome, LuPlus } from 'react-icons/lu';

const Sidebar = ({className} : {className: string}) => {
  const router = useRouter();
  const homeRef = useRef(null);
  const createRef = useRef(null);
  const [index, setIndex] = useState(0)
  useEffect(()=>{
    switch(router.pathname){
      case '/': {
        setIndex(0);
        break;
      }
      case '/quiz/create': {
        setIndex(1);
        break;
      }
      default: {setIndex(3);
      break;}
    }
  },[router.pathname])

  const translateYValues = ['translate-y-0', 'translate-y-[67px]', 'translate-y-[140px]', 'hidden'];

  const classNameString = `sidebar-indicator absolute active -left-2 transition-transform ease-linear -z-10 duration-300 ${translateYValues[index]}`;

  return (
    <ul className={`relative text-base w-fit md:flex flex-col hidden ${className}`}>
      <li
        ref={homeRef}  
        className={`sidebar-item ${router.pathname === '/' ? 'active-text' : ''}`}
        onClick={() => {
          router.push('/');
          setIndex(0)
        }}
      >
        <LuHome className='mx-auto' size={32} />
        <span>Home</span>
      </li>
      <li
        ref={createRef}
        className={`sidebar-item ${router.pathname === '/quiz/create' ? 'active-text' : ''}`}
        onClick={() => {
          router.push('/quiz/create');
          setIndex(1)
        }}
      >
        <LuPlus className='mx-auto' size={32} />
        <span>Create</span>
      </li>
      <span
        className={classNameString}
      />
      {/* <span className={`sidebar-item active absolute -z-20 translate-y-[${80 * index}px] duration-75 ease-linear`}/> */}
    </ul>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {},
  };
};

export default Sidebar;
