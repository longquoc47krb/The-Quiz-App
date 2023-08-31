import React from 'react';

import Aid1 from '../assets/images/half.png';
import Aid3 from '../assets/images/skip.png';
import Aid2 from '../assets/images/x2.png';

function QuizHelpItem({
  name,
  messsage,
  icon,
}: {
  name: string;
  messsage: string;
  icon: string;
}) {
  return (
    <div className="rounded-full">
      <img src={icon.src} className="h-10 w-10" />
    </div>
  );
}
function QuizHelp() {
  const helper = [
    {
      name: 'half',
      message:
        "Just click on '50:50' and we'll keep 2 choices, making your decision easier. Good luck and have fun solving the quiz!",
      icon: Aid1,
    },
    {
      name: 'x2',
      message:
        "With the 'x2 Points' option, you can double the points for this question if you answer correctly. This is a great opportunity to quickly increase your score. However, be cautious! If you answer incorrectly, you will lose 10,000 points. Think carefully before deciding to use this option.",
      icon: Aid2,
    },
    {
      name: 'skip',
      message:
        "This tool is your guiding light to the right answer. When you're unsure, simply select 'Choose Correct Option' and we'll reveal the correct choice.",
      icon: Aid3,
    },
  ];
  return (
    <div className="flex items-center gap-x-4 absolute top-4">
      {helper.map((item, index) => (
        <QuizHelpItem icon={item.icon} key={index} />
      ))}
    </div>
  );
}
export default QuizHelp;
