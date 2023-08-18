/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable prettier/prettier */
import { QuizProps } from '@/interfaces';
import { useRouter } from 'next/router';

function QuizEntity(props: QuizProps) {
  const { title, author, id, category, questions } = props;
  const router = useRouter();
  return (
    <div
      className="item-container"
      onClick={() => router.push(`/quiz/${id}`)}
    >
      <div>
        <h1 className="text-3xl font-medium line-clamp-2">{title}</h1>
        <h2 className="font-normal italic text-gray-600">{category}</h2>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <img
            src={author?.avatar}
            className="rounded-full"
            style={{ width: 32 }}
          />
          <h2  className="text-sm">{author?.name}</h2>
        </div>
        <h2 className="font-thin text-gray-600">
            {questions.length} questions
          </h2>
      </div>
    </div>
  );
}

export default QuizEntity;
