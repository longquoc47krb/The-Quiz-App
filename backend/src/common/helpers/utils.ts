import { ScoreMax, ScoreMin, ScorePenalty, Tmax } from "src/configs/constants";

export const handleScorePerQuestion = (streak: number, time: number, isCorrect: boolean) => {
    let bonus = 0;
    bonus = streak % 5 === 0 && streak > 0 ? bonus + 1000 : 0;
    if (isCorrect) {
        if (time <= Tmax) {
            const Score = ScoreMax - ScorePenalty * (time - 2) + bonus;
            return Score
        }
        const Score = ScoreMin + bonus;
        return Score

    }
    return 0;
}
export function filterNonNullEmpty(arr) {
    const result = arr.filter(item => item !== null && item !== "");
    return result;
}