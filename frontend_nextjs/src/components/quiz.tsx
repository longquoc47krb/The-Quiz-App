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
      className="quiz-container cursor-pointer"
      onClick={() => router.push(`/quiz/${id}`)}
    >
      <div>
        <h1 className="text-3xl font-bold line-clamp-2">{title}</h1>
        <h2 className="font-medium text-gray-600">{category}</h2>
        <h2 className="font-medium text-gray-600">
          {questions.length} câu hỏi
        </h2>
      </div>
      <div className="flex items-center gap-x-4 absolute bottom-2">
        <img
          src={author?.avatar}
          className="rounded-full"
          style={{ width: 48 }}
        />
        <h2>{author?.name}</h2>
      </div>
    </div>
  );
}

export default QuizEntity;
