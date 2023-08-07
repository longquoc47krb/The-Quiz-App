import React from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Ranking: React.FC = () => {
  return (
    <Main meta={<Meta title="Login" description="Login" />}>
      <div className="flex justify-center items-center h-full w-full">
        Ranking
      </div>
    </Main>
  );
};

export default Ranking;
