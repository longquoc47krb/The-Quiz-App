/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/button-has-type */
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiHomeAlt } from 'react-icons/bi';
import { MdOutlineLeaderboard } from 'react-icons/md';

const Sidebar = ({className} : {className: string}) => {
  const router = useRouter();
  const homeRef = useRef(null);
  const createRef = useRef(null);
  return (
    <ul className={`w-fit flex flex-col inline-block ${className}`}>
      <li
        ref={homeRef}
        className={`sidebar-item ${router.pathname === '/' ? 'active' : ''}`}
        onClick={() => {
          router.push('/');
        }}
      >
        <BiHomeAlt className='mx-auto' size={32} />
        <span>Home</span>
      </li>
      <li
        ref={createRef}
        className={`sidebar-item ${router.pathname === '/quiz/create' ? 'active' : ''}`}
        onClick={() => {
          router.push('/quiz/create');
        }}
      >
        <AiOutlinePlus className='mx-auto' size={32} />
        <span>Create</span>
      </li>
      <li
        ref={createRef}
        className={`sidebar-item ${router.pathname === '/ranking' ? 'active' : ''}`}
        onClick={() => {
          router.push('/ranking');
        }}
      >
        <MdOutlineLeaderboard className='mx-auto' size={32} />
        <span>Ranking</span>
      </li>
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
