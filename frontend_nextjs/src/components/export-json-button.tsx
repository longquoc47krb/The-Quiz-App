import React from 'react';

const ExportJSONButton = ({ data }) => {
  const updatedQuestions = data.questions.map((question) => {
    const updatedQuestion = {};

    for (const key in question) {
      updatedQuestion[key] = question[key] === null ? '' : question[key];
    }

    return updatedQuestion;
  });
  const handleExport = () => {
    const questions = {
      questions: updatedQuestions,
    };
    const jsonData = JSON.stringify(questions, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quiz.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      className="bg-green-400 text-white rounded-md w-fit dark:bg-green-700 w-fit"
      onClick={handleExport}
    >
      Export JSON
    </button>
  );
};

export default ExportJSONButton;
