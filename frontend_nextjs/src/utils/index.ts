export function getRandomItemFromArray(array: string[]) {
  // Generate a random index within the range of the array length
  const randomIndex = Math.floor(Math.random() * array.length);

  // Return the random item from the array
  return array[randomIndex];
}
export function convertSecondsToMinutesAndSeconds(seconds: any) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}
export function convertToThousandsFormat(number) {
  const numberStr = String(number);
  const { length } = numberStr;
  let formattedStr = '';

  for (let i = length - 1, count = 0; i >= 0; i--, count++) {
    formattedStr = numberStr[i] + formattedStr;
    if (count !== 0 && count % 3 === 0 && i !== 0) {
      formattedStr = ` ${formattedStr}`;
    }
  }

  return formattedStr;
}
export const checkCorrectAnswer = (
  options: string[],
  correctAnswer: string,
) => {
  const isCorrect: boolean[] = [];

  options.forEach((option) => {
    isCorrect.push(option === correctAnswer);
  });

  return isCorrect;
};
export const checkOptionIsCorrectOrNot = (
  option: string,
  correctAnswer: string,
) => {
  return option === correctAnswer;
};
export function updateAnswers(yourAnswers: any[], questions: any[]) {
  if (!yourAnswers || !questions) {
    return;
  }

  const updatedOptions = [...yourAnswers]; // Copy existing answers

  if (yourAnswers.length !== questions.length) {
    for (let i = yourAnswers.length; i < questions.length; i++) {
      updatedOptions.push({
        yourChoice: '',
        correct: checkOptionIsCorrectOrNot('', questions[i]?.correctOption),
        answer: questions[i]?.correctOption,
        time: 0,
      });
    }
  }

  return updatedOptions;
}
export const renderCorrectRatio = (value: number) => {
  if (value < 50 && value > 10) {
    return 'text-red-500';
  }
  if (value >= 50 && value < 60) {
    return 'text-orange-500';
  }
  if (value >= 60 && value < 80) {
    return 'text-lime-500';
  }
  if (value >= 80) {
    return 'text-green-500';
  }
  return 'text-gray-500';
};
export function formatDateToCustomFormat(dateString, timeZone) {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  };

  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat('en', options);

  if (timeZone) {
    options.timeZone = timeZone;
    formatter.timeZone = timeZone;
  }

  return formatter.format(date);
}
export function calculateTimeDifference(dateString1, dateString2) {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  const timeDifferenceInSeconds = (date1 - date2) / 1000;

  return timeDifferenceInSeconds;
}
export function shuffleArray(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
export const validateOptionClassName = (
  selectOption: string,
  option: string,
  correctAnswer: string,
) => {
  if (selectOption === option) {
    return checkOptionIsCorrectOrNot(option, correctAnswer)
      ? 'correct-choice flicker'
      : 'incorrect-choice';
  }
  return checkOptionIsCorrectOrNot(option, correctAnswer)
    ? 'correct-choice flicker'
    : '';
};
export function replaceHtmlComma(sentence: string) {
  // Replace all occurrences of "&#44;" with ","
  const correctedSentence = sentence.replace(/&#44;/g, ',');

  return correctedSentence;
}
export * from './validate/index';
