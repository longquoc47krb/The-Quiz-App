import { ScoreMax, ScoreMin, ScorePenalty, Tmax } from "src/configs/constants";

export const handleScorePerQuestion = (time: number, isCorrect: boolean) => {
    if (isCorrect) {
        if (time <= Tmax) {
            const Score = ScoreMax - ScorePenalty * time
            return Score
        }
        const Score = ScoreMin;
        return Score

    }
    return 0;
}