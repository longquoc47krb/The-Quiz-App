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
export function getStartOfWeek(currentDate: Date) {
    const currentDay = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
    const diff = currentDay - 1; // Calculate the difference from Sunday (assuming Sunday is 0 and Monday is 1)

    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - diff); // Set to Monday

    return startOfWeek;
}
export function replaceComma(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].replace(/,/g, '&#44;');
    }
    return arr;
}