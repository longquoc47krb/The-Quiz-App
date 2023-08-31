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
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        try {
          const result = readerEvent.target?.result;
          if (result) {
            const parsedData = JSON.parse(result as string);
            const validatedData = validateAndParseQuestions(parsedData);
            onDataUpload(validatedData);
            console.error('Data:', parsedData);
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
        accept=".json"
        id="fileInput"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <button
        className="bg-primary-500 text-white rounded-md w-fit dark:bg-primary-500 w-fit"
        onClick={() => fileInputRef.current?.click()}
      >
        Import question file from your device
      </button>
    </div>
  );
};

export default UploadFile;
