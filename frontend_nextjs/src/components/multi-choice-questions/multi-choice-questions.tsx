/* eslint-disable prettier/prettier */
const MultiChoiceQuestions = ({
  title,
  options,
  selectOption,
  isFinish,
  isShowExplain,
  explain,
  validateClassName,
  handleAnswer
}) => {

  return (
    <>
      <h1 className="dark:text-gray-300">{title}</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {options.map((option, index) => (
          <button
            key={index}
            disabled={selectOption !== '' || isFinish}
            value={option}
            className={`option ${validateClassName(option, index)}`}
            onClick={(e) => {
              handleAnswer(e, index);
            }}
          >
            {option}
          </button>
        ))}
      </div>
      {isShowExplain && (
        <div className="bg-gray-600 text-gray-900 rounded-lg p-4 mt-4 w-[50vw] fade-in">
          {explain}
        </div>
      )}
    </>
  );
};

export default MultiChoiceQuestions;
