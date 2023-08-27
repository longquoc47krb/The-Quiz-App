import React from 'react';

import Gift from './gift';

function Reward() {
  const rewards = [
    'Lamborghini',
    'Rolex',
    'Macbook Air',
    'Iphone 15 Pro Max',
    'Quoc Long',
    'Nokia 1280',
  ];
  return (
    <div className="grid grid-cols-3 gap-4 rounded-lg cursor-pointer p-4 h-fit w-50 mr-4 text-sky-600 dark:text-violet-400 bg-violet-950">
      {rewards.map((item, index) => (
        <Gift key={index} name={item} />
      ))}
    </div>
  );
}

export default Reward;
