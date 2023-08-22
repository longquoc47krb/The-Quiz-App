import type { ReactNode } from 'react';

import Header from '@/components/header';
import ProfileSidebar from '@/components/profile-sidebar';
import { ThemeProvider } from '@/components/theme-provider';

type IProfileProps = {
  meta: ReactNode;
  children: ReactNode;
};
const ProfileLayout = (props: IProfileProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="px-1 text-gray-700 antialiased">
        {props.meta}
        <Header />
        <div className="flex justify-center">
          <ProfileSidebar className="m-4" />
          <main className="content py-5 text-xl w-full min-h-[80vh] my-2">
            {props.children}
          </main>
        </div>
        <footer className="border-t-[1px] border-t-gray-800 py-8 text-center text-sm">
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

export { ProfileLayout };
