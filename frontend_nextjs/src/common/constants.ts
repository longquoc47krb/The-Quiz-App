/* eslint-disable prettier/prettier */
import { QuizCategory } from "@/interfaces";

export const EXPIRATION_DATE = new Date();
EXPIRATION_DATE.setDate(EXPIRATION_DATE.getDate() + 7);

export const RANDOM_AVATAR = [
    "Angel", "Scooter", "Misty", "Boo", "Loki", "Oliver", "Princess", "Chester", "Patches", "Mimi", "Milo", "Missy", "Sadie", "Snuggles", "George", "Bailey", "Dusty", "Jasper", "Cuddles", "Gracie"
]
export const CategoryLogo: Map<string, string> = new Map();
CategoryLogo.set(QuizCategory.SCIENCE, "https://ouch-cdn2.icons8.com/DhaVvYVsmJPcF_vGSUgrXMH7irDQ62KJA1-1W35MXVI/rs:fit:256:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMzIx/L2Y1NTk1MDJmLTNh/NTgtNDliNS04NDM5/LTgyNTQxYjlmNmVh/Zi5zdmc.png");
export const JWT_SECRET = "QuocLong123456";
export const QuizCategoryList = [
    'Sports',
    'Science and Technology',
    'History',
     'Geography',
     'Mathematics',
    'Art and Artists',
    'Nature and Environment',
    'General Knowledge',
    'Movies and TV Shows',
    'Literature and Books',
    'Famous Personalities'

]
export const CorrectMessage = [
  "Well done! That's absolutely correct.",
"You're right! Great job!",
"Excellent! You've got it right.",
"That's the correct answer. Keep up the good work!",
"You nailed it! Correct!"
]
export const IncorrectMessage = [
  "Oops, that's not quite right. Try again!",
"Not quite there. Give it another shot!",
"Close, but not the correct answer. Keep trying!",
"Unfortunately, that's incorrect. Keep practicing!",
"Hmm, that's not the right answer. Keep going!"
]
export const NoAnswerProvidedMessage = [
  "It looks like you didn't provide an answer. Please give it a try.",
"Don't worry if you're unsure. Take your time and give it your best shot.",
"Feel free to guess if you're not sure about the answer.",
"Take a moment to think, and when you're ready, go ahead and answer."
]