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
export * from './validate/index';
