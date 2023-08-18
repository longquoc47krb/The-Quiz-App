/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRef } from 'react';

import { validateQuestion } from '@/utils';

interface UploadFileProps {
  onDataUpload: (jsonData: any) => void;
}
const validateAndParseQuestions = (data: any) => {
  if (Array.isArray(data.questions) && data.questions.every(validateQuestion)) {
    return data?.questions;
  }
  throw new Error('Invalid questions format');
};
const UploadFile: React.FC<UploadFileProps> = ({ onDataUpload }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleFileChange = () => {
    const selectedFile = fileInputRef.current.files?.[0];
    const jsonData = {
      questions: [],
    };
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        try {
          const result = readerEvent.target?.result;
          if (result) {
            const questions = result.split(';');
            for (let i = 0; i < questions.length; i += 7) {
              const question = {
                text: questions[i],
                options: questions.slice(i + 1, i + 5),
                correctOption: questions[i + 5],
                explain: questions[i + 6],
              };
              jsonData.questions.push(question);
            }
            const validatedData = validateAndParseQuestions(jsonData);
            onDataUpload(validatedData);
            console.error('Data:', jsonData);
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };

      reader.readAsText(selectedFile);
    }
  };
  return (
    <div>
      <input
        type="file"
        accept=".txt"
        id="fileInput"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <button
        className="bg-blue-400 text-white rounded-md w-fit dark:bg-blue-700 w-fit"
        onClick={() => fileInputRef.current?.click()}
      >
        Import question file from your device
      </button>
    </div>
  );
};

export default UploadFile;
