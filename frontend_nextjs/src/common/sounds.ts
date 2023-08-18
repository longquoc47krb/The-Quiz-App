import { Howl } from 'howler';

// initalize sounds
export const congratSound = new Howl({
  src: [
    'https://www.myinstants.com/media/sounds/kids-saying-yay-sound-effect_3.mp3',
  ],
  autoplay: false,
});
const correctPaths = [
  'https://www.myinstants.com/media/sounds/10-diem.mp3',
  'https://www.myinstants.com/media/sounds/suiiiiiiiiiii.mp3',
  'https://www.myinstants.com/media/sounds/tada1.mp3',
  'https://www.myinstants.com/media/sounds/yes_JGNOYIF.mp3',
  'https://www.myinstants.com/media/sounds/anime-wow-sound-effect.mp3',
  'https://www.myinstants.com/media/sounds/kha-banh-ao-that-day.mp3',
  'https://www.myinstants.com/media/sounds/ben-says-ez-sound-effect_6dB1ZIf.mp3',
];
const incorrectPaths = [
  'https://www.myinstants.com/media/sounds/cai-gi-do-ba-noi.mp3',
  'https://www.myinstants.com/media/sounds/ua-j-zo.mp3',
  'https://www.myinstants.com/media/sounds/y2mate-mp3cut_d1tt0z9.mp3',
  'https://www.myinstants.com/media/sounds/ngu-cho-nay.mp3',
  'https://www.myinstants.com/media/sounds/huh_37bAoRo.mp3',
  'https://www.myinstants.com/media/sounds/wrong_5.mp3',
];
export const correctSound = correctPaths.map(
  (path) =>
    new Howl({
      src: [path],
    }),
);
export const incorrectSound = incorrectPaths.map(
  (path) =>
    new Howl({
      src: [path],
    }),
);
