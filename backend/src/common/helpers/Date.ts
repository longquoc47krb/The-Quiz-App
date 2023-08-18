
import { DateTime } from 'luxon';

export function getDateInGMTPlus7() {
    const currentDateTime = new Date();
    const utcOffset = 7 * 60; // 7 hours offset in minutes
    const gmtPlus7DateTime = new Date(currentDateTime.getTime() + utcOffset * 60 * 1000);

    return gmtPlus7DateTime;
}