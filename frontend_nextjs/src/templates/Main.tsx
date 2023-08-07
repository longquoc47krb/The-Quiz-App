import type { ReactNode } from 'react';

import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import useAuth from '@/hooks/useAuth';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};
const Main = (props: IMainProps) => {
  const { user } = useAuth();
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="w-screen px-1 text-gray-700 antialiased">
        {props.meta}
        <Header user={user} />
        <div className="flex justify-center">
          <Sidebar className="m-4" />
          <main className="content py-5 text-xl w-full min-h-screen">
            {props.children}
          </main>
        </div>
        <footer className="border-t border-gray-300 py-8 text-center text-sm">
          © Copyright {new Date().getFullYear()}
          <a
            href="https://www.facebook.com/longquoc47k1"
            target="_blank"
            rel="noreferrer"
            className="inline-block"
          >
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
    </ThemeProvider>
  );
};

export { Main };
