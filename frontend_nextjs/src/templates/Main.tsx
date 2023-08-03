import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { ReactNode } from 'react';

import { getMe } from '@/apis/userServices';
import Header from '@/components/header';
import type { User } from '@/interfaces';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  user: InferGetServerSidePropsType<typeof getServerSideProps>;
};
export const getServerSideProps: GetServerSideProps<{
  user: User;
}> = async () => {
  const user = await getMe();
  return {
    props: { user },
  };
};
const Main = (props: IMainProps) => {
  return (
    <div className="w-screen px-1 text-gray-700 antialiased">
      {props.meta}
      <Header />
      <main className="content py-5 text-xl w-full min-h-screen">
        {props.children}
      </main>

      <footer className="border-t border-gray-300 py-8 text-center text-sm">
        © Copyright {new Date().getFullYear()}
        <a href="www.facebook.com/longquoc47k1" className="inline-block">
          Long Quoc Nguyen
        </a>
        .
        {/*
         * PLEASE READ THIS SECTION
         * I'm an indie maker with limited resources and funds, I'll really appreciate if you could have a link to my website.
         * The link doesn't need to appear on every pages, one link on one page is enough.
         * For example, in the `About` page. Thank you for your support, it'll mean a lot to me.
         */}
      </footer>
    </div>
  );
};

export { Main };
