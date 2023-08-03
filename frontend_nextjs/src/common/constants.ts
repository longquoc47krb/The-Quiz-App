/* eslint-disable prettier/prettier */
import { QuizCategory } from "@/interfaces";

export const EXPIRATION_DATE = new Date();
EXPIRATION_DATE.setDate(EXPIRATION_DATE.getDate() + 7);

export const RANDOM_AVATAR = [
    "Angel", "Scooter", "Misty", "Boo", "Loki", "Oliver", "Princess", "Chester", "Patches", "Mimi", "Milo", "Missy", "Sadie", "Snuggles", "George", "Bailey", "Dusty", "Jasper", "Cuddles", "Gracie"
]
export const CategoryLogo: Map<string, string> = new Map();
CategoryLogo.set(QuizCategory.SCIENCE, "https://ouch-cdn2.icons8.com/DhaVvYVsmJPcF_vGSUgrXMH7irDQ62KJA1-1W35MXVI/rs:fit:256:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMzIx/L2Y1NTk1MDJmLTNh/NTgtNDliNS04NDM5/LTgyNTQxYjlmNmVh/Zi5zdmc.png")