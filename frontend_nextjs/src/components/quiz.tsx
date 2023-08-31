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
import { deleteQuizById } from "@/apis/quizServices";
import { useAuth } from "@/hooks/useAuthContext";
import { QuizProps } from "@/interfaces";
import { useRouter } from "next/router";
import { FaGamepad } from "react-icons/fa";
import { LuCheckCircle, LuEdit, LuTrash2 } from "react-icons/lu";

function QuizEntity(props: QuizProps) {
  const { title, author, id, category, questions, isUpdate, participants, totalParticipants } = props;
  const router = useRouter();
  const { user } = useAuth()
  const isCompleted = participants?.length > 0 && user && participants.some(participant => participant.id === user.id);
  return (
    <div
      className="item-container relative"
      onClick={() =>
        isUpdate ? router.push(`/quiz/stats/${id}`) : router.push(`/quiz/${id}`)
      }
    >
      {isUpdate && (
        <LuEdit
          className="absolute top-6 right-4 text-2xl"
          onClick={(e) => {
            e.stopPropagation()
            router.push(`/quiz/update/${id}`);
          }}
        />
      )}
      {isUpdate && (
        <LuTrash2
          className="absolute top-14 right-4 text-red-700 text-2xl"
          onClick={async(e) => {
            e.stopPropagation()
            await deleteQuizById(id)
          }}
        />
      )}
      {
        isCompleted && <span className="absolute top-6 right-4 text-green-500"><LuCheckCircle className="inline-block mb-1 mr-1"/>Completed</span>
      }
      <div>
        <h1 className="text-3xl font-medium line-clamp-1 w-[90%]">{title}</h1>
        <h2 className="font-normal italic text-gray-600">{category}</h2>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <img
            src={author?.avatar}
            className="rounded-full"
            style={{ width: 32 }}
          />
          <h2 className="text-sm">{author?.name}</h2>
        </div>
        <h2 className="font-thin text-gray-600">
          <FaGamepad className="inline-block mr-2"/>{totalParticipants || 0}
        </h2>
      </div>
    </div>
  );
}

export default QuizEntity;
