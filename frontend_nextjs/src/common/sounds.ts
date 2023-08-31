import { getRandomItemFromArray } from '@/utils';

// initalize sounds

export const congratSound =
  'https://www.chosic.com/wp-content/uploads/2021/12/fm-freemusic-cheerful-whistling.mp3';
export const backgroundSound = [
  'https://www.chosic.com/wp-content/uploads/2021/08/FastFeelBananaPeel-320bit.mp3',
  'https://www.chosic.com/wp-content/uploads/2022/06/Pixel-Peeker-Polka-faster.mp3',
  'https://www.chosic.com/wp-content/uploads/2022/06/Sneaky-Snitch.mp3',
  'https://www.chosic.com/wp-content/uploads/2021/02/Monkeys-Spinning-Monkeys.mp3',
  'https://www.chosic.com/wp-content/uploads/2021/08/ByeByeBrain320bit.mp3',
  'https://www.chosic.com/wp-content/uploads/2021/02/Fluffing-a-Duck.mp3',
];
export const correctPaths = [
  'https://www.myinstants.com/media/sounds/10-diem.mp3',
  'https://www.myinstants.com/media/sounds/suiiiiiiiiiii.mp3',
  'https://www.myinstants.com/media/sounds/tada1.mp3',
  'https://www.myinstants.com/media/sounds/yes_JGNOYIF.mp3',
  'https://www.myinstants.com/media/sounds/anime-wow-sound-effect.mp3',
  'https://www.myinstants.com/media/sounds/kha-banh-ao-that-day.mp3',
  'https://www.myinstants.com/media/sounds/ben-says-ez-sound-effect_6dB1ZIf.mp3',
];
export const incorrectPaths = [
  'https://www.myinstants.com/media/sounds/cai-gi-do-ba-noi.mp3',
  'https://www.myinstants.com/media/sounds/ua-j-zo.mp3',
  'https://www.myinstants.com/media/sounds/y2mate-mp3cut_d1tt0z9.mp3',
  'https://www.myinstants.com/media/sounds/ngu-cho-nay.mp3',
  'https://www.myinstants.com/media/sounds/huh_37bAoRo.mp3',
  'https://www.myinstants.com/media/sounds/wrong_5.mp3',
];
export const playRandomSound = (ref: any, array: string[]) => {
  const random = getRandomItemFromArray(array);
  if (ref.current) {
    ref.current.src = random;
    ref.current.play();
  }
};
export const playMusic = (
  ref: any,
  audioUrl: string,
  volume?: number = 1,
  loop?: boolean = false,
) => {
  if (ref.current) {
    ref.current.src = audioUrl;
    ref.current.play();
    ref.current.volume = volume;
    ref.current.loop = loop;
  }
};
export const stopMusic = (ref: any) => {
  if (ref.current) {
    ref.current.pause();
    ref.current.currentTime = 0; // Reset the playback position
  }
};
